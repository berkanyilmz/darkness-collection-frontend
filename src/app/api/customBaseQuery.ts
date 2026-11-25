import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError
} from "@reduxjs/toolkit/query";
import { RootState } from "@/store/store";
import { setCredentials, logOut } from '@/features/auth/slices/authSlices';
import { AuthResponse } from "@/features/auth/types/authTypes";
import { BackendErrorResponse, NormalizedError } from "@/utils/error/errorType";
import { getErrorMessageByCode } from "@/utils/error/errorMessages";

const PUBLIC_AUTH_URLS = [
    '/auth/login',
    '/auth/refresh',
    '/auth/register',
    '/auth/verify',
    '/auth/resend-code',
];

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const accessToken = (getState() as RootState).auth.accessToken;

        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`);
        }
        return headers;
    }
});

const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error?.status === 401) {
        const url = typeof args === 'string' ? args : args.url;

        if (PUBLIC_AUTH_URLS.includes(url)) {
            // api.dispatch(logOut());
            return result;
        }

        // Yeni bir access token almak için refresh token ile istek at
        const refreshResult = await baseQuery(
            {
                url: '/auth/refresh',
                method: 'POST',
            }, api, extraOptions);

        if (refreshResult.data) {
            const { accessToken } = refreshResult.data as AuthResponse;
            // Yeni access token'ı store'a kaydet
            api.dispatch(setCredentials({ accessToken }));

            // Orijinal isteği tekrar dene
            result = await baseQuery(args, api, extraOptions);
        } else {
            // Refresh token geçersiz veya süresi dolmuş, kullanıcıyı çıkış yaptır
            api.dispatch(logOut());
            if (typeof window !== 'undefined') {
                window.location.href = '/auth/login';
            }
        }
    }

    //Backend tarafından gelen hataları yakalamak için
    if (result.error) {
        const err = result.error as FetchBaseQueryError;
        let normalizedMessage = "Beklenmeyen bir hata oluştu.";
        let errorCode: string | undefined;

        if (typeof err.data === "string") {
            normalizedMessage = err.data;
        } else if (typeof err.data === "object" && err.data !== null) {
            const data = err.data as Partial<BackendErrorResponse> & {
                Message?: string;
                code?: string;
            };

            if (data.exception) {
                errorCode = data.exception.code;
                const rawMessage = typeof data.exception.message === "string"
                    ? data.exception.message
                    : Object.values(data.exception.message).join(", ");
                normalizedMessage = getErrorMessageByCode(
                    data.exception.code,
                    rawMessage
                );
            } else {
                normalizedMessage = (err.data as any).Message ?? JSON.stringify(err.data);
            }
        }

        result.error = {
            ...err,
            data: {
                ...(typeof err.data === "object" ? err.data : {}),
                code: errorCode,
                Message: normalizedMessage,
            }
        } as NormalizedError;
    }

    // Dev modunda hata var ise konsola yazdırma
    if (process.env.NODE_ENV === 'development' && result.error && typeof result.error === 'object') {
        try {
            const errorObj = result.error as any;
            console.log("API Hatası", {
                status: errorObj.status || "Unknown",
                data: errorObj.data || "No data",
            });
        } catch (error) {
            // Loglama hatası olursa sessizce geç
        }
    }
    return result;

}

export default customBaseQuery;
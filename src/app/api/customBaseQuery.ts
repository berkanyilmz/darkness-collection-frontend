import { AppState } from "@/src/store/rootReducer";
import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { RefreshTokenResponse } from "./type";
import { logout, setAccessToken, setAccessTokenExpiration } from "@/src/features/auth/slices/authSlices";
import type { NormalizedError } from "@/src/utils/error/errorType";

const rawBaseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as AppState).auth.accessToken;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        headers.set("Accept", "application/json");
        headers.set("X-Correlation-ID", typeof window !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);
        return headers;
    }
});

const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await rawBaseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
        const refreshResult = await rawBaseQuery(
            {
                url: '/auth/refresh',
                method: 'POST',
            }, api, extraOptions);

            if (!refreshResult.error) {
                const data = refreshResult.data as RefreshTokenResponse;

                if (data?.data?.accessToken) {
                    api.dispatch(setAccessToken(data.data.accessToken));
                }

                if (data?.data?.accessTokenExpiration) {
                    api.dispatch(setAccessTokenExpiration(data.data.accessTokenExpiration));
                }

                result = await rawBaseQuery(args, api, extraOptions);
            } else {
                api.dispatch(logout());
            }
    }

    //Backend tarafından gelen hataları yakalamak için
    if (result.error) {
        const err = result.error as FetchBaseQueryError;
        let normalizedMessage = "Beklenmeyen bir hata oluştu.";

        if (typeof err.data === "string") {
            normalizedMessage = err.data;
        } else if (typeof err.data === "object" && err.data !== null) {
            normalizedMessage = (err.data as any).Message ?? JSON.stringify(err.data);
        }

        result.error = {
            ...err,
            data: {
                ...(typeof err.data === "object" ? err.data : {}),
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
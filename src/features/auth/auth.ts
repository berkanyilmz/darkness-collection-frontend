import apiSlice from "@/features/apiSlice";
import { AuthRegister, AuthRequest, AuthResponse, VerifyRequest, ResendCodeRequest } from "@/features/auth/types/authTypes";
import { UserDto } from "../Users/types/users";
import { ApiResponse } from "@/app/api/type";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // User Register Endpoint
        register: builder.mutation<ApiResponse<{ message: string }>, AuthRegister>({
            invalidatesTags: () => [{ type: 'User', id: 'LIST' }],
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
        }),
        // User Verify Endpoint
        verify: builder.mutation<ApiResponse<string>, VerifyRequest>({
            query: (verifydata) => ({
                url: '/auth/verify',
                method: 'POST',
                body: verifydata,
            })
        }),
        resendCode: builder.mutation<ApiResponse<string>, ResendCodeRequest>({
            query: (resendData) => ({
                url: '/auth/resend-code',
                method: 'POST',
                body: resendData,
            })
        }),
        // User Login Endpoint
        login: builder.mutation<AuthResponse, AuthRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        refresh: builder.mutation<AuthResponse, void>({
            query: () => ({
                url: '/auth/refresh',
                method: 'POST',
            })
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),
        me: builder.query<UserDto, void>({
            query: () => 'users/me',
        }),

    }),
    overrideExisting: false,
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useRefreshMutation,
    useLogoutMutation,
    useMeQuery,
    useLazyMeQuery,
    useVerifyMutation,
    useResendCodeMutation
} = authApi;
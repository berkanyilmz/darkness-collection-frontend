import {User} from "@/features/Users/types/users";
import apiSlice from "@/features/apiSlice";
import { AuthRegister, AuthRequest, AuthResponse } from "@/features/auth/types/authTypes";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // User Register Endpoint
        register: builder.mutation<{success: boolean, Message: string}, AuthRegister>({
            invalidatesTags: () => [{type: 'User', id: 'LIST'}],
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
        }),
        // User Login Endpoint
        login: builder.mutation<AuthResponse, AuthRequest>({
            query: (query) => ({
                url: '/auth/login',
                method: 'POST',
                body: query
            })
        })
    })
})
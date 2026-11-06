import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../types/authTypes";
import { UserDto } from "@/features/Users/types/users";

const initialState: AuthState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{accessToken: string; user?: UserDto}>
        ) => {
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
            if (action.payload.user) {
                state.user = action.payload.user;
            }
        },
        setUser: (state, action: PayloadAction<UserDto | null>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logOut: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
        },
    },
});

export const {
    setCredentials,
    setUser,
    logOut,
} = authSlice.actions;
export default authSlice.reducer;
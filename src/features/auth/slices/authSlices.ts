import { User } from "@/features/Users/types/users";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    accessToken: string | null;
    accessTokenExpiration: string | null;
    claimIds: number[];
    user: User | null;
}

const initialState: AuthState = {
    accessToken: null,
    claimIds: [],
    user: null,
    accessTokenExpiration: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<AuthState>) {
            return action.payload;
        },
        setAccessToken(state, action: PayloadAction<string>) {
            state.accessToken = action.payload;
        },
        setAccessTokenExpiration(state, action: PayloadAction<string>) {
            state.accessTokenExpiration = action.payload;
        },
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },
        setClaimIds(state, action: PayloadAction<number[]>) {
            state.claimIds = action.payload;
        },
        logout() {
            return initialState;
        },
    },
});

export const {
    setAuth,
    setAccessToken,
    setAccessTokenExpiration,
    setUser,
    setClaimIds,
    logout,
} = authSlice.actions;
export default authSlice.reducer;
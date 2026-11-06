import { combineReducers } from "@reduxjs/toolkit";

import authReducer from '@/features/auth/slices/authSlices';
import apiSlice from "@/features/apiSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
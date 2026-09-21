import { combineReducers } from "@reduxjs/toolkit";

import CustomizerReducer from '@/features/customizer/CustomizerSlice';
import authReducer from '@/features/auth/slices/authSlice';
import apiSlice from "@/features/apiSlice";

const rootReducer = combineReducers({
    customizer: CustomizerReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
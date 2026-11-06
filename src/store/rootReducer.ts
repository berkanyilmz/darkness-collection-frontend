import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import authReducer from '@/features/auth/slices/authSlices';
import apiSlice from "@/features/apiSlice";
import authPersistConfig from "./authPersistConfig";

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;

// export type AppState = ReturnType<typeof rootReducer>;
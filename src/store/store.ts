import { configureStore } from "@reduxjs/toolkit";
import { PersistConfig, persistStore } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";
import { authApi } from "@/features/auth/api";
import apiSlice from "@/features/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query/react";

export type RootState = ReturnType<typeof rootReducer>;
const persistCongig: PersistConfig<RootState> = {
  key: "root",
  storage,
  whitelist: ["customizer", "auth"],
  blacklist: ["api", "liveLessonApi", "messagesApi"],
};

const persistedReducer = persistReducer(persistCongig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["auth.refreshToken"], // Encrypted token'ı ignore et
      },
      immutableCheck: false,
    }).concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useConfirmEmailMutation,
  useResendCodeMutation,
  useSoftDeleteMutation,
} = authApi;

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
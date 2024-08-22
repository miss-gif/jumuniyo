import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage/session";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import couponReducer from "./couponSlice";

// RootState 타입 정의
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch 타입 정의
export type AppDispatch = typeof store.dispatch;

// persistConfig 정의
const persistConfig = {
  key: "root",
  storage,
};

// persistedReducer 정의
const persistedUserReducer = persistReducer(persistConfig, userReducer);

// 스토어 생성
const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    cart: cartReducer,
    coupon: couponReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// persistor 생성
export const persistor = persistStore(store);
export default store;

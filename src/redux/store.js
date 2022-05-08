import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartSlice from "./features/cartItems";
import categorySlice from "./features/categorySlice";
import currencySlice from "./features/currencySlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedCartSlice = persistReducer(persistConfig, cartSlice);
const persistedcurrencySlice = persistReducer(persistConfig, currencySlice);
const persistedcategorySlice = persistReducer(persistConfig, categorySlice);

export const store = configureStore({
  reducer: {
    currency: persistedcurrencySlice,
    category: persistedcategorySlice,
    cartItems: persistedCartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

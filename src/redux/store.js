import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./features/categorySlice";
import currencySlice from "./features/currencySlice";

export const store = configureStore({
  reducer: {
    currency: currencySlice,
    category: categorySlice,
  },
});

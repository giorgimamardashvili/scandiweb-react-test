import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  label: "$",
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    changeCurrency: (state, action) => {
      console.log(action.payload);
      state.label = action.payload;
    },
  },
});

export const { changeCurrency } = currencySlice.actions;

export default currencySlice.reducer;

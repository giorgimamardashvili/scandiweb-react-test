import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "all",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      console.log(action.payload);
      state.category = action.payload;
    },
  },
});

export const { changeCategory } = categorySlice.actions;

export default categorySlice.reducer;

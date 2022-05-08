import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotalQty: 0,
  cartTotalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) =>
          item.id === action.payload.id &&
          JSON.stringify(item.selectedAttr) ===
            JSON.stringify(action.payload.selectedAttr)
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQty += 1;
      } else {
        const tempProduct = { ...action.payload, cartQty: 1 };
        state.cartItems.push(tempProduct);
      }
    },
    removeItem: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) =>
          cartItem.id === action.payload.id &&
          JSON.stringify(cartItem.selectedAttr) ===
            JSON.stringify(action.payload.selectedAttr)
      );

      if (state.cartItems[itemIndex].cartQty === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) =>
            cartItem.id !== action.payload.id &&
            JSON.stringify(cartItem.selectedAttr) !==
              JSON.stringify(action.payload.selectedAttr)
        );
        state.cartItems = nextCartItems;
        return;
      }
      if (state.cartItems[itemIndex].cartQty > 1) {
        state.cartItems[itemIndex].cartQty -= 1;
      }
    },
    decreaseCart(state, action) {},
    getTotals(state, action) {},
  },
});

export const { addItem, removeItem, decreaseCart, getTotals } =
  cartSlice.actions;

export default cartSlice.reducer;

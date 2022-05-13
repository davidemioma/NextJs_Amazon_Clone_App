import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;

      const existingItem = state.cart.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.cart.unshift(newItem);
      } else {
        existingItem.quantity++;
      }
    },

    removeFromCart(state, action) {
      const id = action.payload;

      const existingItem = state.cart.find((item) => item.id === id);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.cart = state.cart.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
        }
      }
    },
  },
});

export const totalAmount = (state) =>
  state.cart.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export default CartSlice;

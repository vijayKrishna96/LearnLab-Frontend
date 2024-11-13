import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../Utils/cart";

const initialState = localStorage.getItem("cart") 
  ? JSON.parse(localStorage.getItem("cart")) 
  : {
      cartItems: [], 
      shippingAddress: {}, 
      paymentMethod: "Card",
      itemsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0
    };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existItem = state.cartItems.find((x) => x._id === newItem._id);
      
      if (existItem) {
        // If item exists,update its quantity or other properties
        state.cartItems = state.cartItems.map((x) => 
          x._id === existItem._id ? newItem : x
        );
      } else {
        // If item doesn't exist, add it with qty property
        state.cartItems.push({
          ...newItem,
          qty: 1 // Add default quantity
        });
      }
      
      // Update cart totals
      updateCart(state);
    },
    
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        item => item._id !== action.payload
      );
      updateCart(state);
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.itemsPrice = 0;
      state.shippingPrice = 0;
      state.taxPrice = 0;
      state.totalPrice = 0;
      updateCart(state);
    }
  },
});

export const { addItemToCart, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
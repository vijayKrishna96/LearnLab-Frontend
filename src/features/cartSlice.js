import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItemToCart: (state, action) => {
      const duplicates = state.items.filter(
        (item) => item._id === action.payload._id
      );
      if (duplicates.length === 0) {
        const cartItem = {
          ...action.payload,
          quantity: 1,
        };
        state.items.push(cartItem);
      } else {
        state.items = state.items.map((item) => {
          if (item._id === action.payload._id) {
            const itemWithUpdatedQty = {
              ...item,
              quantity: item.quantity + 1,
            };
            return itemWithUpdatedQty;
          } else {
            return item;
          }
        });
      }
    },
    removeItem:(state , action) =>{
        state.items = state.items.filter(item => item._id !== action.payload);
    }
  },
});

export const {addItemToCart , removeItem} = cartSlice.actions

export default cartSlice.reducer

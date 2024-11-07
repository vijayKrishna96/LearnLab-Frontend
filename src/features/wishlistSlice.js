import { createSlice } from "@reduxjs/toolkit";

// Helper function to save to localStorage
const saveToLocalStorage = (items) => {
  try {
    localStorage.setItem("wishlist", JSON.stringify({ wishlistItems: items }));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

// Get initial state from localStorage
const initialState = {
  wishlistItems: [],
  loading: false,
  error: null,
  ...JSON.parse(localStorage.getItem("wishlist") || '{"wishlistItems": []}')
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItemToWishlist: (state, action) => {
      const existItem = state.wishlistItems.find(
        (x) => x._id === action.payload._id
      );
      
      if (existItem) {
        state.wishlistItems = state.wishlistItems.map((x) =>
          x._id === existItem._id ? action.payload : x
        );
      } else {
        state.wishlistItems.push(action.payload);
      }
      
      // Save to localStorage after updating state
      saveToLocalStorage(state.wishlistItems);
    },
    
    removeWishlistItem: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item._id !== action.payload.courseId
      );
      
      // Save to localStorage after updating state
      saveToLocalStorage(state.wishlistItems);
    },
    
    // Optional: Add these actions if you want loading states
    setWishlistLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    setWishlistError: (state, action) => {
      state.error = action.payload;
    }
  },
});

export const {
  addItemToWishlist,
  removeWishlistItem,
  setWishlistLoading,
  setWishlistError
} = wishlistSlice.actions;

// Selectors
export const selectWishlistItems = (state) => state.wishlist.wishlistItems;
export const selectWishlistLoading = (state) => state.wishlist.loading;
export const selectWishlistError = (state) => state.wishlist.error;

export default wishlistSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import userSlice from '../features/userSlice';
import { wishlistSlice } from "../features/wishlistSlice"; // Import slice

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userSlice);
const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedWishlistReducer = persistReducer(persistConfig, wishlistSlice.reducer); // Access reducer

const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    wishlist: persistedWishlistReducer,
    user: persistedUserReducer,
  },
});

export const persistor = persistStore(store);
export default store;

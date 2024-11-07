export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(0);
}

export const updateWishlist = (wishlistItems) => {
    localStorage.setItem("wishlist", JSON.stringify({ wishlistItems }));
  };
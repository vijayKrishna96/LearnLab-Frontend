export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(0);
};

export const updateCart = (state) => {
    // Calculate itemsPrice
    state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + Number(item.price) * (item.qty || 1), 0)
    );
    
    // Calculate shipping
    state.shippingPrice = addDecimals(state.itemsPrice >= 500 ? 0 : 50);
    
    // Calculate tax
    state.taxPrice = addDecimals(Number((0.01 * state.itemsPrice).toFixed(0)));
    
    // Calculate total
    state.totalPrice = addDecimals(
        Number(state.itemsPrice) + 
        Number(state.shippingPrice) + 
        Number(state.taxPrice)
    );

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(state));
    
    return state;
};
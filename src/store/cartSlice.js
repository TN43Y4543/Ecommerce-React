import { createSlice } from "@reduxjs/toolkit";

let dataFromWeb = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: dataFromWeb,
  reducers: {
    addItem(state, action) {
      const existingProduct = state.find(item => item.id === action.payload.id);
      if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if product exists
      } else {
        state.push({ ...action.payload, quantity: 1 }); // Add new product with quantity 1
      }
      localStorage.setItem("cart", JSON.stringify(state)); // Save updated state
    },

    removeItem(state, action) {
      const newProducts = state.filter(cartProduct => cartProduct.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(newProducts)); // Save updated state
      return newProducts; // Return the updated state
    },

    decreaseQuantity(state, action) {
      const product = state.find(item => item.id === action.payload);
      if (product) {
        
          product.quantity -= 1; // Decrease quantity
       
      }
      localStorage.setItem("cart", JSON.stringify(state)); // Save updated state
    },
    clearCart: (state) => {
      localStorage.setItem("cart", JSON.stringify([])); // Clear cart in localStorage
      return []; 
    },
  },
});

export default cartSlice.reducer;
export const { addItem, removeItem, decreaseQuantity,clearCart } = cartSlice.actions;

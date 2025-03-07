import { createSlice } from "@reduxjs/toolkit";
const storedAddress = JSON.parse(localStorage.getItem("deliveryAddress")) || null;

const initialState = {
  deliveryAddress: storedAddress, // Stores delivery details
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    // Set or update the delivery address (replacing the old one)
    setDeliveryAddress: (state, action) => {
      state.deliveryAddress = action.payload; // Update Redux state
      localStorage.setItem("deliveryAddress", JSON.stringify(action.payload)); // Store in localStorage
    },
  },
});

export const { setDeliveryAddress } = addressSlice.actions;
export default addressSlice.reducer;

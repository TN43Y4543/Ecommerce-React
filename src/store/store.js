import {configureStore} from '@reduxjs/toolkit'
import cartSliceReducer from "./cartSlice"
import addressReducer from "./addressSlice"; // New address slice

export const store = configureStore( {
    reducer : {
        cart : cartSliceReducer,
        address: addressReducer, // Manages delivery address
    }
} )

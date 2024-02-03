import {configureStore, createReducer} from "@reduxjs/toolkit"
import productReducer from "./Slice/productSlice"
import cartReducer from "./Slice/cartSlice"




export const store = configureStore({
    reducer:{
        product : productReducer,
        cart : cartReducer

    }
})
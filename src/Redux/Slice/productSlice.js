import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'


export const fetchProducts = createAsyncThunk('fetchProducts', async() =>{
    const res = await axios.get('https://fakestoreapi.com/products')
    console.log("res---",res);
    return res.data;

})

const productSlice = createSlice({
    name: 'product',
    initialState:{
        isLoading: false,
        data: null,
        isError: false
    },
    extraReducers:(builder) =>{
        builder.addCase(fetchProducts.pending, (state, action)=>{
            state.isLoading = true
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.data = action.payload
        })
        builder.addCase(fetchProducts.rejected, (state, action)=>{
            state.isError = true
            console.error("err---",action.payload)
        })
    }
})

export default productSlice.reducer;
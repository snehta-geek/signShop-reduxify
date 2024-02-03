import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState:{
        cartItems: []
    },
    reducers:{
        addToCart : (state,action) => {

            let itemInd = state.cartItems.findIndex(val => val.id === action.payload)
            // console.log("itemInd--",itemInd);
            if(itemInd !== -1){
                state.cartItems[itemInd].count +=1;
            }
            else{
                state.cartItems=[...state.cartItems,{id: action.payload, count: 1}]
            }  
        },
        removeFromCart : (state,action) => {
            
            let itemInd = state.cartItems.findIndex(val => val.id === action.payload)
            if(itemInd !== -1){
                state.cartItems[itemInd].count = state.cartItems[itemInd].count > 1 ? state.cartItems[itemInd].count - 1 : -1;
            }        
          
        }
    }
})

export const {addToCart,removeFromCart} = cartSlice.actions;

export default cartSlice.reducer;
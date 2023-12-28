import { createSlice } from "@reduxjs/toolkit";
import {updateCart} from  '../utils/cartUtils';

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cartItems : [], shippingAddress : {}, paymentMethod : 'PayPal'};



const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        addToCart: (state , action) => {
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x._id === item._id);

            if(existItem){
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x);
            }
            else{
                state.cartItems = [...state.cartItems, item];   //we cant use .push here since state are immutable
            }

            return updateCart(state);
        },

        removeFromCart: (state, action) =>{
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            return updateCart(state);
        },
        saveShippingAddress: (state, action) =>{
            state.shippingAddress = action.payload;
            return updateCart(state);
        },
    }
});


//Export any fucntion as a action
export const { addToCart, removeFromCart, saveShippingAddress } = cartSlice.actions;

//Export the reducer
export default cartSlice.reducer;
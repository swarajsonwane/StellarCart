import { createSlice } from "@reduxjs/toolkit";
import {updateCart} from '../actions/cartActions.js';

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cartItems : []};



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
    }
});


//Export any fucntion as a action
export const { addToCart } = cartSlice.actions;

//Export the reducer
export default cartSlice.reducer;
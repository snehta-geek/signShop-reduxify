import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../Redux/Slice/cartSlice';



const Counter = ({itemId}) => {
    const dispatch = useDispatch();

    const state = useSelector(data => data.cart)
    // console.log("state---", state);

    const cartCount = state.cartItems.find(val => val.id === itemId)
    // console.log("cartCount--",cartCount);
  return (
    <div>
        <button onClick={(e) => dispatch(removeFromCart(itemId))} style={{border: "unset",padding: "9px 15px",borderRadius: 5,margin : 10 }}>-</button>       
        {cartCount && cartCount.count > -1 ? cartCount.count : 'Add to Cart' }
        <button onClick={(e) => dispatch(addToCart(itemId))} style={{border: "unset",padding: "9px 15px",borderRadius: 5,margin : 10 }}>+</button>
    </div>

  )
}

export default Counter
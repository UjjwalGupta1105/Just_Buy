import React from 'react'
import { Link } from 'react-router-dom'
import {removeFromCart} from "../actions/cartAction"
import {useDispatch,useSelector} from 'react-redux'

const CartItems=({item})=>{
    const dispatch=useDispatch()
    const removeItem=(id)=>{
        dispatch(removeFromCart(id))
    }
    return(
        <div className='cart-item'>
            <img src={item.image} alt="Image" />
            <div className="cart-item-details">
                <Link to="" className='cart-product-name'>{item.name}</Link>
                <p>₹{item.price}</p>
                <button onClick={()=>removeItem(item._id)} className='cart-product-remove'>Remove</button>
            </div>
        </div>
    )
}
export default CartItems
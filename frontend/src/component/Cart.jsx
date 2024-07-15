import React,{useState} from 'react'
import CartItems from "./CartItems"
import Header from './Header'
import Footer from './Footer'
import {useAlert} from 'react-alert'
import {useDispatch,useSelector} from 'react-redux'
import {addItemsToCart} from "../actions/cartAction"
import EmptyCartImg from "../images/empty-cart.png"
import {useNavigate} from 'react-router-dom'

const Cart=()=>{
    const navigate=useNavigate()
    const {isAuthenticated}=useSelector((state)=>state.user)
    const {cartItems}=useSelector((state)=>state.cart)
        const alert=useAlert()
        const dispatch=useDispatch()

    const increaseQuantity=(id,quantity,stock)=>{
        if(stock<=quantity){
            alert.success("Stock Limit Reached")
            return
        }
        let x=quantity+1
        dispatch(addItemsToCart(id,x))
    }
    const decreaseQuantity=(id,quantity)=>{
            if(quantity<=1){
                alert.error("Minimmum Quantity 1")
                return
            }
            let x=quantity-1
            dispatch(addItemsToCart(id,x))
    }
    let totalAmount=0
    cartItems.forEach((item)=>{
        totalAmount+=item.price*item.quantity
    })

    const checkoutHandler=()=>{
        if(isAuthenticated){navigate("/shipping")}
        else{
            navigate("/login")}

    }
    return(
        <>
        <Header/>
    <div className="cart-Page">
            <div className="cart-header">
                <h3>Product</h3>
                <h3>Quantity</h3>
                <h3>Subtotal</h3>
            </div>

        {!(cartItems.length) && <img src={EmptyCartImg} className='empty-img'/>}

        {cartItems && cartItems.map((item)=>{
        return<>
            <div className="cart-container" key={item._id}>
               <div className="cart-product">
                <CartItems item={item}/>
               </div>
            <div className="product-quantity-block">
                <button onClick={()=>decreaseQuantity(item._id,item.quantity)}>-</button>
                <input readOnly value ={item.quantity} type="number" />
                <button onClick={()=>increaseQuantity(item._id,item.quantity,item.stock)}>+</button>
            </div>
            <div className="cart-subtotal">
                <p>₹{`${item.price*item.quantity}`}</p>
            </div>
        </div>
    </>
        })}

        <div className="gross-total">
            <button></button>
            <div className='gross-data'>
               <h6>Gross Total</h6>
               <p>₹{totalAmount}</p>
            </div>
        </div>
        <div className="chcekout-button">
            <button onClick={checkoutHandler}>Checkout</button>
        </div>
     </div>
        <Footer/>
        </>
    )
}
export default Cart
import React,{useState} from 'react'
import Header from './Header'
import Footer from './Footer'
import {useAlert} from 'react-alert'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import {Country,State} from 'country-state-city'
import MetaData from '../layout/MetaData'

import Stepper from "./Stepper(Shipping)"

import {shipping} from "../actions/cartAction"
import {Link} from 'react-router-dom'

const OrderConfirmation=()=>{
    const navigate=useNavigate()

        const {shippingInfo,cartItems}=useSelector((state)=>state.cart)
        const {user}=useSelector((state)=>state.user)

        let subtotal=0
        cartItems.forEach((item)=>{
            subtotal+=item.price*item.quantity
        })

        const shippingCharges= subtotal > 1000 ? 0 : 50
        const tax=Number(subtotal*0.18).toFixed(2);
        const totalPrice=Number(subtotal)+Number(shippingCharges)+Number(tax)

        const address=` ${shippingInfo.address} , ${shippingInfo.city} , ${shippingInfo.state} , ${shippingInfo.pincode} , ${shippingInfo.country} , `

        const proceedToPayment=()=>{
            const data={
                subtotal,
                shippingCharges,
                tax,
                totalPrice
            }
            sessionStorage.setItem("orderInfo",JSON.stringify(data))
            navigate("/payment/process")
        }

    return(
        <>
         <MetaData title="Order Confirmation" />
            <div className="stepper">
                <Stepper activePage={1}/> 
           </div>
           
            <div className="order-confirmation-page">
           <div className="order-confirmation-page-left">
                <div className="confirm-shipping-areabox">
                 <h2>Shipping Info:</h2>
                    <div>
                        <p>Name:</p><span>{user.name}</span>
                    </div>
                    <div>
                        <p>Phone:</p><span>{shippingInfo.phone}</span>
                    </div>
                    <div>
                        <p>Address:</p><span>{address}</span>
                    </div>
                </div>

                <div className="confirm-cart-items-section">
                    <h2>Your Cart Items:</h2>
                    <div className="confirm-cart-items-container">
                        {cartItems && cartItems.map((item)=>{
                           return <div key={item._id} className='confirm-cart-items'>
                                <img src={item.image}  alt="Product" />
                                <Link to={`/product/${item._id}`}>{item.name}</Link>
                                <div>
                                    {item.quantity} X ₹{item.price} = {" "}<span> ₹{item.quantity * item.price}</span>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>

            <div className="order-confirmation-page-right">
           
                <div className="order-summary">
                    <h2>Order Summary</h2>
                    <div>
                        <p>Subtotal:</p><span>₹{subtotal}</span>
                    </div>
                    <div>
                        <p>Shipping Charges:</p><span>₹{shippingCharges}</span>
                    </div>
                    <div>
                        <p>GST:</p><span>₹{tax}</span>
                    </div>
                </div>

                <div className="order-summary-total">
                    <div>
                        <p>Total:</p><span>₹{totalPrice}</span>
                    </div>
                </div>
                <button onClick={proceedToPayment}>Proceed To Payment</button>
            </div>

            </div>
        </>
    )
}

export default OrderConfirmation
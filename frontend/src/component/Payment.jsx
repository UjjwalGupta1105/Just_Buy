import React,{useState,useRef, useEffect} from 'react'
import Stepper from "./Stepper(Shipping)"
import {useAlert} from 'react-alert'
// import {useDispatch,useSelector} from 'react-redux'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {Elements} from '@stripe/react-stripe-js';
import { createOrder ,clearErrors} from '../actions/orderAction'


import {
   CardNumberElement,
 CardCvcElement,
   CardExpiryElement,
    useStripe,
    useElements,
  } from '@stripe/react-stripe-js';

  import VpnKeyIcon from '@mui/icons-material/VpnKey';
  import CreditCardIcon from '@mui/icons-material/CreditCard';
  import EventIcon from '@mui/icons-material/Event';
   


const Payment=()=>{
    const navigate=useNavigate()
    const dispatch=useDispatch()
  const alert=useAlert()
const stripe=useStripe()
const elements=useElements()

   const {shippingInfo,cartItems}=useSelector((state)=>state.cart)
   const {error}=useSelector((state)=>state.order)

   const {user}=useSelector((state)=>state.user)
const orderInfo=JSON.parse(sessionStorage.getItem("orderInfo"))

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
    },[error,alert])

    const order={
           shippingInfo,
            orderItems:cartItems,
            itemsPrice:orderInfo.subtotal,
            taxPrice:orderInfo.tax,
            shippingPrice:orderInfo.shippingCharges,
            totalPrice:orderInfo.totalPrice
    }

    const paymentData={
        amount:Math.round(orderInfo.totalPrice *100)
    }

    const submitHandler=async(e)=>{
        e.preventDefault()
        alert.success("Please wait while Processing !!")
        payBtn.current.disabled="true"

        try {
            const config={
                headers:{
                    "Content-Type":"application/json"
                }
            }

            const {data}=await axios.post(
                "/payment/process",
                paymentData,
                config
            )
            const client_secret=data.client_secret

            if(!stripe||!elements)return

            const result=await stripe.confirmCardPayment(client_secret,{
                payment_method:{
                    card:elements.getElement(CardNumberElement),
                    billing_details:{
                        name:user.name,
                        email:user.email,
                        address:{
                            line1:shippingInfo.address,
                            city:shippingInfo.city,
                            state:shippingInfo.state,
                            country:shippingInfo.country,
                            postal_code:shippingInfo.pincode,
                        },
                    }
                }
            })

            if(result.error){
                payBtn.current.disabled="false"
                alert.error(result.errormessage)
            }
            else{
                if(result.paymentIntent.status==="succeeded"){
                    alert.success("Payment Successfull")

                    order.paymentInfo={
                        id:result.paymentIntent.id,
                        status:result.paymentIntent.status
                    }

                    dispatch(createOrder(order))
                    navigate("/success")
                }
                else{
                    alert.error("There's some error while processing payment")
                }
            }


        } catch (error) {
            payBtn.current.disabled="false"
            alert.error(error.response.data.message)
        }
    }

    const payBtn=useRef(null)

    
    return(
        <>
        <div className="stepper">
                <Stepper activePage={2}/> 
           </div>
            <div className="payment-page">
                <div className="payment-container">
                    <form onSubmit={(e)=>submitHandler(e)} className='payment-form'>
                        <h2>Card Info</h2>

                        <div className='payments-divs'>
                            <div className='payment-divs-icon'><CreditCardIcon/></div>  
                            <CardNumberElement className='payment-form-inputs'/>
                        </div>
                        <div className='payments-divs'>
                          <div className='payment-divs-icon'><EventIcon/></div>  
                            <CardExpiryElement className='payment-form-inputs'/>
                        </div>
                        <div className='payments-divs'>
                          <div className='payment-divs-icon'><VpnKeyIcon/></div>  
                            <CardCvcElement className='payment-form-inputs'/>
                        </div>

                        <input type="submit" value={`Pay-${orderInfo && orderInfo.totalPrice}`} ref={payBtn} className='payment-button' disabled={false} />
                    </form>
                </div>
            </div>
        </>
    )
}




  export default Payment
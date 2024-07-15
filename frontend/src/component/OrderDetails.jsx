import React,{useEffect} from 'react'
import {useAlert} from 'react-alert'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { getOrderDetails ,clearErrors} from '../actions/orderAction'
import { useParams } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import {Link} from 'react-router-dom'
import Loading from '../layout/Loading'

const OrderDetails=()=>{
    const {order,error,loading}=useSelector((state)=>state.orderDetails)
    const {user}=useSelector((state)=>state.user)

    // const navigate=useNavigate()
    const dispatch=useDispatch()
  const alert=useAlert()

  const {id}=useParams()
  console.log(id)

useEffect(()=>{
    console.log("go goa gone....")
    dispatch(getOrderDetails(id))

    if(error){
        dispatch(clearErrors())
    }
},[dispatch,error,id,alert])

    return(
        <>
             <MetaData title="Order Details" />
             {loading ? <Loading/> : (<>
             <h4 className='order-details-id'>Order #{order && order._id}</h4>
            
            <div className="order-details-page">
                <div className="order-details-container-box">
                 <h2>Shipping Info:</h2>
                    <div>
                        <p>Name:</p><span>{user.name}</span>
                    </div>
                    <div>
                        <p>Phone:</p><span>{order.shippingInfo && order.shippingInfo.phone}</span>
                    </div>
                    <div>
                        <p>Address:</p><span>{order.shippingInfo && 
                                ` ${order.shippingInfo.address},${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.pincode},${order.shippingInfo.country} `
                        }</span>
                    </div>
                </div>

                <h2>Payment Info:</h2>

            <div className="order-details-container-box">
                <div>
                <p className={order.paymentInfo && order.paymentInfo.status === "succeeded" ? "greencolor" : "redcolor"}
                    >
                     {order.paymentInfo && order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"}
                    </p>
                </div>
                <div> <p>Amount:</p><span>{order.totalPrice}</span></div>
             </div>

                <h2>Delivery Info:</h2>

                <div className="order-details-container-box">
                    <div>
                        <p className={order.paymentInfo && order.paymentInfo.status === "succeeded" ? "greencolor" : "redcolor"}
                        > {order.orderStatus && order.orderStatus}</p>
                    </div>
                </div>

                 <div className="order-details-container-box">
                    <h2>Your Order:</h2>
                    <div className="confirm-cart-items-container">
                        {order.orderItems && order.orderItems.map((item)=>{
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
             </>)}
        </>
    )
}

export default OrderDetails
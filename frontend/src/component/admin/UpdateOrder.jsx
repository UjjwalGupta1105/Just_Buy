import React,{useState,useEffect} from 'react'
import Header from '../../component/Header'
import Footer from '../../component/Footer'
import {useAlert} from 'react-alert'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Loader from "../../layout/Loading"
import {Country,State} from 'country-state-city'
import MetaData from '../../layout/MetaData'
import Loading from '../../layout/Loading'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Slidebar from "./Slidebar"
import { useParams } from 'react-router-dom'
import {getOrderDetails,clearErrors,updateOrder} from "../../actions/orderAction"
import {Link} from 'react-router-dom'
import Button from '@mui/material/Button';

const UpdateOrder=()=>{
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const alert=useAlert()

        const {order,error,loading}=useSelector((state)=>state.orderDetails)
        const {isUpdated,error:updateError}=useSelector((state)=>state.renewedOrder)

        const {id}=useParams()

        const [status,setStatus]=useState("")

        useEffect(()=>{
            if(error){
                alert.error(error)
                dispatch(clearErrors())
            }
            if(updateError){
                alert.error(error)
                dispatch(clearErrors())
            }
            if(isUpdated){
                alert.success("Order Updated Successfully")
                navigate("/admin/orders")
                dispatch({type:"UPDATE_ORDER_RESET"})
            }
            
             dispatch(getOrderDetails(id))
    
        },[dispatch,alert,updateError,error,navigate,id,isUpdated])

        // let subtotal=0
        // {order.orderItems && order.orderItems.forEach((item)=>{
        //     subtotal+=item.price*item.quantity
        // })}

        const proceedToPayment=()=>{
        }

        const ProcessOrder=(e)=>{
            e.preventDefault()
            
            dispatch(updateOrder(id,status))
        }

    return(
        <>
<div className="dashboard-page-new">
    <Slidebar/>
    <div className="new-product-container">
        {loading ? <Loading/> : <>
            <div className="order-confirmation-page">
        <div className="order-confirmation-page-left">
            <div className="order-details-page">
                <div className="order-details-container-box">
                 <h2>Shipping Info:</h2>
                    <div>
                        <p>Name:</p><span></span>
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

                <div className="confirm-cart-items-section">
                    <h2>Your Cart Items:</h2>
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
        </div>
        <div className="order-confirmation-page-right-new" style={{
            display:order.orderStatus==="Delivered" ? "block" : "block"
        }}>
           
        <form encType='multipart/form-data' onSubmit={ProcessOrder}>
                        <h1>Process Order</h1>
                        <div>
                            <div><AccountTreeIcon/></div>
                           <select onChange={(e)=>setStatus(e.target.value)} className='form-inputs' value={status}>
                         
                                <option value="">Choose Category</option>
                                <option value="Processing">Processing</option>
                                { order.orderStatus && order.orderStatus==="Processing" &&  <option value="Shipped">Shipped</option> }
                                { order.orderStatus && order.orderStatus==="Shipped" &&  <option value="Delivered">Delivered</option>}
                                
                           </select>
                        </div>
                        
                        <Button className='create-product-button' type='submit' disabled={loading ? true :false || status==="" ? true :false} style={{color:"black"}}>Update</Button>
                    </form>
            </div>

        </div>
        </>}
     </div>
            
</div>

     </>
      )
     }


export default UpdateOrder
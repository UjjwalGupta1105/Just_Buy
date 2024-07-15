import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Header from "./Header"
import {Link} from 'react-router-dom'

const OrderSuccess=()=>{
    
    return(
        <>
        <Header/>
        <div className="order-success-page">
            <CheckCircleIcon sx={{ fontSize: 120,color:"rgb(195, 49, 49)" }}/>
            <h2>Your Order Confirmed Successfully</h2>
            <Link to="/orders">My Orders</Link>
            
        </div>
        </>
    )
}


export default OrderSuccess


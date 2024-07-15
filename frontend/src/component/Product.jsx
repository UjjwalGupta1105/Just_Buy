import React from 'react'
import "../App.css"
import {Link} from "react-router-dom"
import Rating from '@mui/material/Rating';

const Product=({product})=>{
  const options={
    size:"small",
    value:product.rating,
    precesion:0.5,
    readOnly:true
  }
    return(
       <Link className='product_card' to={`/product/${product._id}`}>
         <img src={product.images[0].url} alt="img" />
         <div className="data">
         <p>{product.name}</p>
         <div className='ratings'>
         <Rating {...options}/> <span className='reviews'>({product.numberOfReviews})</span>
         </div>
         <span className='price'>₹{product.price}</span>
         </div>
       </Link>
    )
}

export default Product
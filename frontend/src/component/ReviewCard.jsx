import React from 'react'
import Rating from '@mui/material/Rating';
import img from '../images/user-img.jpeg'

const ReviewCard=({review})=>{
    const options={
        size:"medium",
        value:review.rating,
        precesion:0.5,
        readOnly:true
      }

    return(
        <>
            <div className="review-card">
                <img src={img} alt="User" />
                <p className='reviewer-name'>{review.name}</p>
                <Rating {...options} className='ratings'/>
                <p className="review-comment">{review.comment}</p>
            </div>
        </>
    )
}

export default ReviewCard
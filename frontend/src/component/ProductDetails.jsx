import {React,useEffect,useState} from 'react'
import Crousel from 'react-material-ui-carousel'
import {useDispatch,useSelector} from 'react-redux'
import {getProductDetails} from "../actions/productAction"
import {newReview} from "../actions/orderAction"
import { useParams } from 'react-router-dom'
import ReviewCard from "./ReviewCard"
import Loading from '../layout/Loading'
import {useAlert} from 'react-alert'
import {clearErrors} from "../actions/productAction"
import Header from './Header'
import Footer from './Footer'
import {addItemsToCart} from '../actions/cartAction'

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Button } from '@mui/material'
import Rating from '@mui/material/Rating';


const ProductDetails=({match})=>{

    window.scrollTo(0, 0);

    const alert=useAlert()
    
    const {product,loading,error}=useSelector((state)=>state.productDetails)
    const {success,reviewError}=useSelector((state)=>state.newReview)


    const [quantity,setQuantity]=useState(1)

    const [rating,setRating]=useState(0)
    const [comment,setComment]=useState("")
    const [open,setOpen]=useState(false)

    const submitReviewToggel=()=>{
        open ? setOpen(false):setOpen(true)
    }

    const increaseQuantity=()=>{
        if(product.stock<=quantity){
            alert.success("Stock Limit Reached")
            return
        }
        let x=quantity+1
        setQuantity(x)
    }
    const decreaseQuantity=()=>{
            if(quantity<=1){
                alert.error("Minimmum Quantity 1")
                return
            }
            let x=quantity-1
            setQuantity(x)
    }

    const options={
        size:"large",
        value:product.rating,
        precesion:0.5,
        readOnly:true
      }
    const dispatch=useDispatch()

    const {id}=useParams()

    const addtocart_=()=>{
        dispatch(addItemsToCart(id,quantity))
        alert.success("Product Added to Cart")
    }

    const reviewSubmitHandler=()=>{
        dispatch(newReview(rating,comment,id))
        setOpen(false)
    }

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        if(reviewError){
            dispatch(clearErrors())
        }
        if(success){
            dispatch({type:"NEW_REVIEW_RESET"})
            alert.success("Review Submitted Successfully")
        }
        
        dispatch(getProductDetails(id))
    },[dispatch,id,error,alert,success,alert])
    return(
        <>
      {loading ? <Loading/>  : 
    <div>
    <Header/>

    <div className="product-details-main">
            <div className='crousel-cont'>
                <Crousel>
                {product.images && product.images.map((item,i)=>{
                    return <img src={item.url} alt="Product_Image" key={i} className="crousel-img" />
                })}
                </Crousel>
            </div>

        <div className="product-details">
            <div className="product-name-block">
                <h2>{product.name}</h2>
                <p>#{product._id}</p>
            </div>

            <div className="product-rating-block">
            <Rating {...options}/> <span className='num-of-reviews'>({product.numberOfReviews}reviews)</span>
            </div>

            <div className="product-pricing-block">
                <h1>₹{product.price}</h1>
            </div>

            <div className="product-quantity-block">
                <button onClick={decreaseQuantity}>-</button>
                <input readOnly value ={quantity} type="number" />
                <button onClick={increaseQuantity}>+</button>
            </div>

            <div className="product-addtocart-block">
                <button disabled={product.stock<1 ? true:false}   onClick={addtocart_}>Add to Cart</button>
            </div>
            
            <div className="product-stock-block">
                 <p  >
                         Status:<span className={product.stock<1? "redcolor":"greencolor"}>{product.stock<1? "OutOfStock":"InStock"}</span>
                </p>
            </div>

            <div className="product-description-block">
                <p>Description:{product.description}</p>
            </div>

            <button onClick={submitReviewToggel} className="submit-review">Submit Review</button>
        </div>
     </div>
        <h3 className="reviews-heading">Reviews</h3>

        <Dialog aria-labelledby='simple-dialog-title'
        open={open}
        onClose={submitReviewToggel}
        className='dialog-container'>

        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className='submitDialog'>
            <Rating
            onChange={(e)=>setRating(e.target.value)}
            value={rating}
            size="large"
            />
            <textarea
            className='submitDialogTextArea'
            cols="30"
            rows="5"
            value={comment}
            onChange={(e)=>setComment(e.target.value)}></textarea>
        </DialogContent>
        <DialogActions>
            <Button color='primary' onClick={reviewSubmitHandler}>Submit</Button>
            <Button onClick={submitReviewToggel} color='secondary'>Cancel</Button>

        </DialogActions>

        </Dialog>

        {product.reviews && product.reviews[0] ? (
            <div className="prodcut-reviews">
                {product.reviews && product.reviews.map((review)=>{
                    return <ReviewCard review={review}/>
                })}
            </div>
        ) :(
           <p className="no-reviews">No Reviews Yet...</p> 
        )}
</div>
 }
 <Footer/>
        </>
    )
}
export default ProductDetails
import React,{useEffect, useState} from 'react'
import {useAlert} from 'react-alert'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { getAdminProducts ,clearErrors,deleteProduct, getAllReviews, deleteReviews} from '../../actions/productAction'
import { useParams } from 'react-router-dom'
import MetaData from '../../layout/MetaData'
import {Link} from 'react-router-dom'
import Loading from '../../layout/Loading'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid'
import Slidebar from "./Slidebar"
import Header from "../Header"
import Footer from "../Footer"
import StarIcon from '@mui/icons-material/Star';

const ProductReviews=()=>{

    const {loading,error,reviews}=useSelector((state)=>state.productReviews)
    const {error:deleteError,isDeleted}=useSelector((state)=>state.review)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const alert=useAlert()

    const [productId,setProductId]=useState("")

    const DeleteReview=(reviewId)=>{
        dispatch(deleteReviews(productId,reviewId))
    }

    useEffect(()=>{
        if(productId.length===24){
            dispatch(getAllReviews(productId))
        }
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        if(deleteError){
            alert.error(error)
            dispatch(clearErrors())
        }
        if(isDeleted){
            alert.success("Review Deleted Successfully")
            dispatch({type:"DELETE_REVIEW_RESET"})
        }

        

    },[dispatch,alert,error,deleteError,navigate,isDeleted,productId])

    const columns=[
        {field:"id",headerName:"User Id",midWidth:200,flex:0.5,type:"string"},
        {field:"comment",headerName:"Commment",midWidth:200,flex:0.8,type:"string"},
        {field:"rating",headerName:"Rating",midWidth:150,flex:0.4,type:"number",
            cellClassName:(params)=>{
                return params.api.getCellValue(params.id,"rating")>=3 ? "greencolor" :"redcolor"
            }
        },
        {field:"name",headerName:"Name",midWidth:150,flex:0.3,type:"string"},
        {filed:"actions",headerName:"Actions",flex:0.2,sortable:false,type:"number",
            renderCell:(params)=>{
                return(
                    <>
                    <Button 
                    onClick={()=>DeleteReview(params.api.getCellValue(params.id,"id"))}><DeleteIcon/></Button>
                    </>
                )
            }
        }
    ]


    const rows=[]

    reviews && reviews.forEach((item)=>{
        rows.push({
            id:item._id,
            rating:item.rating,
            comment:item.comment,
            name:item.name,
        })
    })

    const reviewHandler=(e)=>{
        e.preventDefault()

        dispatch(getAllReviews(productId))
    }


    return(
        <>
            <Header/>

            <div className="dashboard-page">
                <Slidebar/>
                <div className="admin-reviews-list">

                <form encType='multipart/form-data' onSubmit={reviewHandler}>
                        <h1>ALL REVIEWS</h1>

                        <div>
                            <div><StarIcon/></div>
                            <input type="text" placeholder='Product Id' className='form-inputs' required value={productId} onChange={(e)=>setProductId(e.target.value)} />
                        </div>
                                    
                        <Button className='create-product-button' type='submit' disabled={loading ? true :false || productId==="" ? true : false}>Get Reviews</Button>
                    </form>
                 

                    {reviews && reviews.length>0 ?   <DataGrid
                        rows={rows}
                        columns={columns}
                        disableSelectionOnClick
                        className='prodcutsListTable'
                        autoHeight
                        sx={{ height:"150px" }}
                        paginationAutoPageSize={true}
                    />:
                    <h1 className='no-review-heading'>No Reviews Found !!</h1>}

                </div>
            </div>




            <Footer/>
        </>
    )
}

export default ProductReviews
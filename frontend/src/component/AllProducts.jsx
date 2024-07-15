import {React , useEffect} from 'react'
import "../App.css"
import Product from './Product'
import MetaData from '../layout/MetaData'
import Loading from '../layout/Loading'
import {getProduct} from "../actions/productAction"
import {useDispatch,useSelector} from 'react-redux'
import {useAlert} from 'react-alert'
import { useParams } from 'react-router-dom'
import  {clearErrors} from "../actions/productAction"
import Header from './Header'
import Footer from './Footer'



const AllProducts=()=>{
    const alert=useAlert()
    const dispatch=useDispatch()
    const {products,loading,error}=useSelector((state)=>state.products)

    const {keyword}=useParams()
    console.log(keyword)
    
    useEffect(()=>{
        if(error){
         alert.error(error)
         dispatch(clearErrors())
        }
  
       dispatch(getProduct(keyword))
      },[dispatch,error,keyword],)
        
    return(
        <>
           {loading ? <Loading/> : 
           <>
           <Header/>
            <div className="allproducts-page">
               <h1>Products</h1>
               <div className="all-products">
                {products && products.map((product)=>{
                        return <Product product={product}/>
                    })}
               </div>

            </div>
            <Footer/>
           </>
           }
        </>
    )
}

export default AllProducts
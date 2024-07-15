import {React , useEffect} from 'react'
import "../App.css"
import Product from './Product'
import MetaData from '../layout/MetaData'
import Loading from '../layout/Loading'
import {getProduct} from "../actions/productAction"
import {useDispatch,useSelector} from 'react-redux'
import {useAlert} from 'react-alert'
import  {clearErrors} from "../actions/productAction"
import Header from './Header-Home'
import Footer from "./Footer"
import {Link} from 'react-router-dom'

const Home=()=>{
      const alert=useAlert()
      const dispatch=useDispatch()
      const {loading,error,products}=useSelector((state)=>state.products)

    useEffect(()=>{
      if(error){
       alert.error(error)
       dispatch(clearErrors())
      }

     dispatch(getProduct())
    },[dispatch,error])
      
    let cnt=4;
     return(
          <>
          {loading ?  <Loading/> : 
          <>
          <MetaData title="Just_Buy" />

          <Header/>
     
            <div className="banner">
                 <div className="text">
                     <h3>Welcome To Just_Buy</h3>
                     <h1>Find Amazing Product Below</h1>
                 </div>
                 <div className='home-get-now'>
                    <Link to="/products"><button> Get Now</button></Link>
                   
                 </div>
                 
            </div>
            <div className="product-section">
               <h2>Featured Product</h2>
               <div className="product-list">
                   {products &&
                   products.filter((item,i)=>i<=7).map((product)=>{
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

export default Home
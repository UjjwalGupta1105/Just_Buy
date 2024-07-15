import './App.css';
import React ,{useEffect,useState} from 'react'
import Header from './component/Header'
import Footer from './component/Footer'
import {BrowserRouter ,Routes,Route } from 'react-router-dom';
import Home from "./component/Home"
import ProductDetails from './component/ProductDetails'
import Loading from './layout/Loading'
import AllProducts from './component/AllProducts';
import Search  from "./component/Search";
import LoginSignup from './component/LoginSignup';
import {useDispatch,useSelector} from 'react-redux'
import {loadUser} from './actions/userAction'
import store from './store'
import MyProfile from './component/MyProfile'
import UpdateProfile from './component/UpdateProfile'
import UpdatePassword from './component/UpdatePassword'
import ForgotPassword from './component/forgotPassword';
import ResetPassword from "./component/ResetPassword"
import Cart from "./component/Cart"
import  Shipping from './component/Shipping';
import OrderConfirmation from "./component/OrderConfirmation"
import axios from 'axios'
import Payment from './component/Payment';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Stripe from "stripe"
import OrderSuccess from './component/OrderSuccess'
import MyOrders from "./component/MyOrders"
import OrderDetails from "./component/OrderDetails"
import Dashboard from "./component/admin/Dashboard"
import AdminProducts from "./component/admin/AdminProducts"
import NewProduct from "./component/admin/NewProduct"
import UpdateProduct from "./component/admin/UpdateProduct"
import OrderList from "./component/admin/OrderList"
import UpdateOrder from "./component/admin/UpdateOrder"
import UserList from "./component/admin/UserList"
import UpdateUser from "./component/admin/UpdateUser"
import ProductReviews from "./component/admin/ProductReviews"
import Contact from "./component/ContactPage"
import About from './component/About';
import NotFound from './component/NotFound';

function App() {
  const {loading,error,isAuthenticated,user}=useSelector((state)=>state.user)
  const dispatch=useDispatch()

  const [stripeApiKey,setStripeApiKey]=useState("")
  async function getStripeApiKey(){
    // const {data}=await axios.get("/stripeapikey")
    setStripeApiKey("pk_test_51PNhLnP334ckTMRPunKELsoP0yNS5z0usOXuGDD6jQK06CqCFAAAExpmjCfc60zsgUUGJFR2vAI7unNPC1nNR5ba00tPIacOA3")
  }
  useEffect(()=>{
      dispatch(loadUser())
      getStripeApiKey()
  },[])
  
  return (
    <BrowserRouter>
    <Elements stripe={loadStripe(stripeApiKey)}>
       <Routes>
         <Route exact path="/" element={<Home/>}/>
         <Route path="/product/:id" element={<ProductDetails/>}/>
         <Route exact path="/products" element={<AllProducts/>}/>
         <Route exact path="/search" element={<Search/>}/>
         <Route exact path="/contact" element={<Contact/>}/>
         <Route exact path="/about" element={<About/>}/>
         <Route path="/products/:keyword" element={<AllProducts/>}/>
         <Route path="/login" element={<LoginSignup/>}/>
         {isAuthenticated &&  <Route path="/account" element={<MyProfile/>}/>}
         {isAuthenticated &&  <Route path="/me/update" element={<UpdateProfile/>}/>}
         {isAuthenticated &&  <Route path="/me/updatePassword" element={<UpdatePassword/>}/>}
         <Route path="/password/forgot" element={<ForgotPassword/>}/>
         <Route path="/password/reset/:token" element={<ResetPassword/>}/>
         <Route path="/cart" element={<Cart/>}/>
         {isAuthenticated &&  <Route path="/shipping" element={<Shipping/>}/>}
         {isAuthenticated &&  <Route path="/order/confirm" element={<OrderConfirmation/>}/>}
         {isAuthenticated &&  <Route path="/payment/process" element={<Payment/>}/>}
         {isAuthenticated &&  <Route path="/success" element={<OrderSuccess/>}/>}
         {isAuthenticated &&  <Route path="/orders" element={<MyOrders/>}/>}
         {isAuthenticated &&  <Route path="/order/:id" element={<OrderDetails/>}/>}
         {isAuthenticated && user.role==="admin" &&  <Route path="/admin/dashboard" element={<Dashboard/>}/>}
         {isAuthenticated && user.role==="admin" &&  <Route path="/admin/products" element={<AdminProducts/>}/>}
         {isAuthenticated && user.role==="admin" &&  <Route path="/admin/product/new" element={<NewProduct/>}/>}
         {isAuthenticated && user.role==="admin" &&  <Route path="/admin/product/update/:id" element={<UpdateProduct/>}/>}
         {isAuthenticated && user.role==="admin" &&  <Route path="/admin/orders" element={<OrderList/>}/>}
         {isAuthenticated && user.role==="admin" &&  <Route path="/admin/order/update/:id" element={<UpdateOrder/>}/>}
        {isAuthenticated && user.role==="admin" &&  <Route path="/admin/users" element={<UserList/>}/>}
        {isAuthenticated && user.role==="admin" &&  <Route path="/admin/user/update/:id" element={<UpdateUser/>}/>}
        {isAuthenticated && user.role==="admin" &&  <Route path="/admin/reviews" element={<ProductReviews/>}/>}
        <Route path='*' element={<NotFound/>}/>





  
       </Routes>
       </Elements>
  </BrowserRouter>
  );
}

export default App;

import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { getProduct } from '../../actions/productAction'
import { getOrders } from '../../actions/orderAction'
import { getAllUsers, getUserDetails } from '../../actions/userAction'

import Slidebar from "./Slidebar"
import Header from "../Header"
import Footer from "../Footer"

import {Link} from 'react-router-dom'
import {Doughnut,Line} from "react-chartjs-2"
import Chart from 'chart.js/auto';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )


const Dashboard=()=>{

    const {loading,error,orders}=useSelector((state)=>state.allorders)
    const {users}=useSelector((state)=>state.allUsers)

    const {products}=useSelector((state)=>state.products)

    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(getOrders())
        dispatch(getProduct())
        dispatch(getAllUsers())

    },[dispatch,error])

    let outOfStock=0;
    let inStock=0
    {products && products.forEach((product)=>{
        if(product.stock===0){
            outOfStock+=1
        }
        else{
            inStock+=1
        }
    })}

    let TotalAmount=0
    {orders && orders.forEach((item)=>{
        TotalAmount=TotalAmount+item.totalPrice
    })}
    let nf = new Intl.NumberFormat('en-US');

    const lineData={
        labels:["Initial Amount","Amount Earned"],
        datasets:[
            {
                label:"Total Amount",
                backgroundColor:["tomato"],
                hoverBackgroundColor:["rgba(197,72,49"],
                data:[0,TotalAmount.toFixed(2)]
            }
        ]
    }
    const doughnutData={
        labels:["Out Of Stock","inStock"],
        datasets:[
            {
                backgroundColor:["#00A6B4","#6800B4"],
                hoverBackgroundColor:["#B5000","#35014F"],
                data:[outOfStock,inStock]
            }
        ]
    }


    return(
        <>
        <Header/>
        <div className="dashboard-page">
            <Slidebar/>
            <div className="dashboard-container">
                <h1>DashBoard</h1>
                <div className="dashboard-summary">
                    <div className="dashboard-summary-box0">
                        <p>Amount: <span>₹{nf.format(TotalAmount.toFixed(2))}</span></p>
                    </div>
                    <div className="dashboard-summary-circle-set">
                    <div className="dashboard-summary-box1">
                    <Link to="/admin/products">
                       <p>Product</p>
                       <p>{products && products.length}</p>
                    </Link>
                    </div>
                    <div className="dashboard-summary-box2">
                    <Link to="/admin/users">
                       <p>Users</p>
                       <p>{users && users.length}</p>
                    </Link>
                    </div>
                    <div className="dashboard-summary-box3">
                    <Link to="/admin/orders">
                       <p>Orders</p>
                       <p>{orders && orders.length}</p>
                    </Link>
                    </div>
                    </div>
                </div>

                <div className="line-chart">
                    <Line data={lineData}/>
                 </div>

                 <div className="doughnut-chart">
                    <Doughnut data={doughnutData}/>
                 </div>
            </div>

        </div>

        <Footer/>
        </>
    )
}

export default Dashboard
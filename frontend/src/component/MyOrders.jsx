import React , {useEffect} from 'react'
import {Link} from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import MetaData from '../layout/MetaData'
import Footer from "./Footer"
import Header from "./Header"
import Loading from '../layout/Loading'
import {useDispatch,useSelector} from 'react-redux'
import {useAlert} from 'react-alert'
import {useNavigate} from 'react-router-dom'
import LaunchIcon from '@mui/icons-material/Launch';
import {myOrders,clearErrors} from "../actions/orderAction"
import '../App.css'


const MyOrders=()=>{

    const dispatch=useDispatch()
    const alert=useAlert()

    const {loading,error,orders}=useSelector((state)=>state.allMyorders)
    const {user}=useSelector((state)=>state.user)

    useEffect(()=>{
        dispatch(myOrders())

        if(error){
            dispatch(clearErrors())
        }
    },[dispatch])

    const columns=[
        {field:"id",headerName:"Order Id",midWidth:200,flex:0.5,type:"string"},
        {field:"status",headerName:"Status",midWidth:150,flex:0.4,type:"string",
        cellClassName:(params)=>{
            return params.api.getCellValue(params.id,"status")==="Delivered" ? "greencolor" :"redcolor"
        }
        },
        {field:"itemsQty",headerName:"Items Qty",midWidth:150,flex:0.3,type:"number"},
        {field:"amount",headerName:"Amount",midWidth:270,flex:0.2,type:"number"},
        {filed:"actions",headerName:"Actions",flex:0.2,sortable:false,type:"number",
            renderCell:(params)=>{
                return(
                    <Link to={`/order/${ params.api.getCellValue(params.id,"id")}`}><LaunchIcon/></Link>
                )
            }
        }
    ]


    const rows=[]

    orders&&orders.forEach((item,index)=>{
        rows.push({
            itemsQty:item.orderItems.length,
            id:item._id,
            status:item.orderStatus,
            amount:item.totalPrice
        })
    })

    return(
        <>
           <MetaData title={`${user.name}-Orders`}/> 

            { loading ? <Loading/> : 
            <> 
                <Header/>
                <div className="myorders-page">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        autoPageSize
                        disableSelectionOnClick
                        className='myorders-table'
                        autoHeight
                        sx={{ height:"110px" }}
                    />
                </div>
                <h2 className='my-orders-h2'>{user.name}'s Order's</h2> 
             </>
                } 
        </>
    )
}

export default MyOrders
import React,{useEffect} from 'react'
import {useAlert} from 'react-alert'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
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
import { getOrders,clearErrors,deleteOrder } from '../../actions/orderAction'
import LaunchIcon from '@mui/icons-material/Launch';

const OrderList=()=>{

    const {loading,error,orders}=useSelector((state)=>state.allorders)
    const {error:deleteError,isDeleted}=useSelector((state)=>state.renewedOrder)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const alert=useAlert()

    const DeleteOrder=(id)=>{
        dispatch(deleteOrder(id))
    }

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        if(deleteError){
            alert.error(error)
            dispatch(clearErrors())
        }
        if(isDeleted){
            alert.success("Order Deleted Successfully")
            dispatch({type:"DELETE_ORDER_RESET"})
        }

        dispatch(getOrders())

    },[dispatch,alert,error,deleteError,navigate,isDeleted])

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
                    <>
                    <Link to={`/admin/order/update/${ params.api.getCellValue(params.id,"id")}`}><EditIcon/></Link>
                      
                      <Button 
                    onClick={()=>DeleteOrder(params.api.getCellValue(params.id,"id"))}><DeleteIcon/></Button>

   </>
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
            <Header/>

            <div className="dashboard-page">
                <Slidebar/>
                <div className="admit-products-list">
                    <h1>All Products</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        disableSelectionOnClick
                        className='prodcutsListTable'
                        autoHeight
                        sx={{ height:"150px" }}
                        paginationAutoPageSize={true}
                    />
                </div>
            </div>




            <Footer/>
        </>
    )
}

export default OrderList
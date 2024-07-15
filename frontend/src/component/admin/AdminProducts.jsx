import React,{useEffect} from 'react'
import {useAlert} from 'react-alert'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { getAdminProducts ,clearErrors,deleteProduct} from '../../actions/productAction'
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

const AdminProducts=()=>{

    const {loading,error,products}=useSelector((state)=>state.products)
    const {error:deleteError,isDeleted}=useSelector((state)=>state.leftProduct)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const alert=useAlert()

    const DeleteProduct=(id)=>{
        dispatch(deleteProduct(id))
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
            alert.success("Product Deleted Successfully")
            dispatch({type:"DELETE_PRODUCT_REST"})
        }

        dispatch(getAdminProducts())

    },[dispatch,alert,error,deleteError,navigate,isDeleted])

    const columns=[
        {field:"id",headerName:"Product Id",midWidth:200,flex:0.5,type:"string"},
        {field:"name",headerName:"Name",midWidth:200,flex:0.5,type:"string"},
        {field:"stock",headerName:"Stock",midWidth:150,flex:0.4,type:"number"},
        {field:"price",headerName:"Items Qty",midWidth:150,flex:0.3,type:"number"},
        {filed:"actions",headerName:"Actions",flex:0.2,sortable:false,type:"number",
            renderCell:(params)=>{
                return(
                    <>
                    <Link to={`/admin/product/update/${ params.api.getCellValue(params.id,"id")}`} style={{margin:"20px"}}><EditIcon sx={{paddingTop:"50px"}}/></Link>

                    <Button 
                    onClick={()=>DeleteProduct(params.api.getCellValue(params.id,"id"))}><DeleteIcon/></Button>
                    </>
                )
            }
        }
    ]


    const rows=[]

    products&&products.forEach((item)=>{
        rows.push({
            id:item._id,
            name:item.name,
            stock:item.stock,
            price:item.price,
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

export default AdminProducts
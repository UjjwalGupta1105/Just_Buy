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
import { deleteProfile, getAllUsers,clearErrors } from '../../actions/userAction'

const AdminProducts=()=>{

    const {loading,error,users}=useSelector((state)=>state.allUsers)
    const {error:deleteError,isDeleted}=useSelector((state)=>state.profile)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const alert=useAlert()

    const DeleteUser=(id)=>{
        dispatch(deleteProfile(id))
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
            alert.success("User Deleted Successfully")
            dispatch({type:"DELETE_PROFILE_RESET"})
        }

        dispatch(getAllUsers())

    },[dispatch,alert,error,deleteError,navigate,isDeleted])

    const columns=[
        {field:"id",headerName:"User Id",midWidth:200,flex:0.5,type:"string"},
        {field:"email",headerName:"Email",midWidth:200,flex:0.5,type:"string"},
        {field:"name",headerName:"Name",midWidth:150,flex:0.4,type:"string"},
        {field:"role",headerName:"Role",midWidth:150,flex:0.3,type:"string",
            cellClassName:(params)=>{
                return params.api.getCellValue(params.id,"role")==="admin" ? "greencolor" :"redcolor"
            }
        },
        {filed:"actions",headerName:"Actions",flex:0.2,sortable:false,type:"number",
            renderCell:(params)=>{
                return(
                    <>
                    <Link to={`/admin/user/update/${ params.api.getCellValue(params.id,"id")}`}><EditIcon/></Link>

                    <Button 
                    onClick={()=>DeleteUser(params.api.getCellValue(params.id,"id"))}><DeleteIcon/></Button>
                    </>
                )
            }
        }
    ]


    const rows=[]

    users&&users.forEach((item)=>{
        rows.push({
            id:item._id,
            email:item.email,
            name:item.name,
            role:item.role,
        })
    })


    return(
        <>
            <Header/>

            <div className="dashboard-page">
                <Slidebar/>
                <div className="admin-products-list">
                    <h1>All Users</h1>

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
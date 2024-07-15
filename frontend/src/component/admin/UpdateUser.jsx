import React,{useEffect,useState} from 'react'
import {useAlert} from 'react-alert'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { createProduct ,clearErrors} from '../../actions/productAction'
import { useParams } from 'react-router-dom'
import MetaData from '../../layout/MetaData'
import {Link} from 'react-router-dom'
import Loading from '../../layout/Loading'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';


import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid'
import Slidebar from "./Slidebar"
import Header from "../Header"
import Footer from "../Footer"
import { getUserDetails, updateProfile } from '../../actions/userAction'

const UpdateUser=()=>{

    const {loading,error,user}=useSelector((state)=>state.userDetails)
    const {error:updateError,isUpdated}=useSelector((state)=>state.profile)

    const dispatch=useDispatch()
    const alert=useAlert()
    const navigate=useNavigate()
    const {id}=useParams()

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [role,setRole]=useState("")


    useEffect(()=>{
        if(user && user._id!==id){
            dispatch(getUserDetails(id))
        }
        else{
            setName(user.name)
            setEmail(user.email)
            setRole(user.role)
            console.log(user.name + user.email)
        }
        
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        if(updateError){
            alert.error(updateError)
            dispatch(clearErrors())
        }
        if(isUpdated){
            alert.success("User Updated Successfully")
            navigate("/admin/users")
            dispatch({type:"UPDATE_PROFILE_RESET"})
        }

    },[dispatch,alert,error,isUpdated,id,updateError,user])


    const createProductSubmitHandler=(e)=>{
        e.preventDefault()

        dispatch(updateProfile(id,name,email,role))
    }



    return(
        <>
        {loading ? <Loading/> : 
            <>
            <div className="dashboard-page">
                <Slidebar/>
                <div className="new-product-container">
                    <form encType='multipart/form-data' onSubmit={createProductSubmitHandler}>
                        <h1>Update User</h1>

                        <div>
                            <div><PersonIcon/></div>
                            <input type="text" placeholder='Name' className='form-inputs' required value={name} onChange={(e)=>setName(e.target.value)} />
                        </div>
                        <div>
                            <div><MailOutlineIcon/></div>
                            <input type="email" placeholder='Email' className='form-inputs' required value={email} onChange={(e)=>setEmail(e.target.value)} />
                        </div>
                        <div>
                            <div><VerifiedUserIcon/></div>
                           <select onChange={(e)=>setRole(e.target.value)} className='form-inputs' value={role}>
                                <option value="">Choose Role</option>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                               
                           </select>
                        </div>
                        
                      
                        
                        <Button className='create-product-button' type='submit' disabled={loading ? true :false || role==="" ? true : false}> Update User</Button>
                    </form>
                </div>
            </div>
        </>
        }
    </>
    )

}

export default UpdateUser
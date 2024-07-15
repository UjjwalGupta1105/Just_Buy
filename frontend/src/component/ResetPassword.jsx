import React , {useState,useRef, useEffect} from 'react'
import {Link} from 'react-router-dom'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Footer from "./Footer"
import Header from "./Header"
import Loading from '../layout/Loading'
import {useDispatch,useSelector} from 'react-redux'
import {useAlert} from 'react-alert'
import {useNavigate} from 'react-router-dom'
import  {clearErrors, resetPassword} from "../actions/userAction"
import { useParams } from 'react-router-dom'


const ResetPassword=()=>{
    const {loading,error,success}=useSelector((state)=>state.forgotPassword)

    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")

   const {token}=useParams()

    const alert=useAlert()
    const navigate=useNavigate()
    const dispatch=useDispatch()

    useEffect(()=>{
   
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        if(success){
            alert.success("Password Updated Successfully")
            navigate("/login")
        }
    },[dispatch,error,alert,success])

    const updateSubmit=(e)=>{
        e.preventDefault()
 
        dispatch(resetPassword(token,password,confirmPassword))
     }

    return(
        <>
             {loading ? <Loading/> :
            <>
            <Header/>
        <div className="reset-password-page">

            <div className="reset-password-container">
                <h2>Update Password</h2>

                <form  className="reset-password-form" onSubmit={updateSubmit}>
                    <div className="reset-password">
                    <div><LockOpenIcon/></div>
                        <input type="password" placeholder='New Password' className='form-inputs' required value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <div className="reset-confirm-password">
                    <div><LockOpenIcon/></div>
                        <input type="password" placeholder='Confirm New Password' className='form-inputs' required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                    </div>
                    <input type="submit" value="Update Password" className='reset-password-button'/>
                </form>

            </div>
        </div>    
        <Footer/>

            </>
        }  
        </>
    )
}

export default ResetPassword
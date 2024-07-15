import React , {useState,useRef, useEffect} from 'react'
import {Link} from 'react-router-dom'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Footer from "./Footer"
import Header from "./Header"
import Loading from '../layout/Loading'
import {useDispatch,useSelector} from 'react-redux'
import {useAlert} from 'react-alert'
import {useNavigate} from 'react-router-dom'
import  {clearErrors,forgotPassword} from "../actions/userAction"

const ForgotPassword=()=>{
    const {loading,error,message}=useSelector((state)=>state.forgotPassword)

    const [email,setEmail]=useState("")

    const alert=useAlert()
    const navigate=useNavigate()
    const dispatch=useDispatch()

    useEffect(()=>{
   
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        if(message){
            alert.success(message)
        }
    },[dispatch,error,alert,message])

    const updateSubmit=(e)=>{
        e.preventDefault()
 
        dispatch(forgotPassword(email))
     }

    return(
        <>
             {loading ? <Loading/> :
            <>
            <Header/>
        <div className="forgot-password-page">

            <div className="forgot-password-container">
                <h2>Update Password</h2>

                <form  className="forgot-password-form" onSubmit={updateSubmit}>
                    <div className="forgot-password-email">
                    <div><MailOutlineIcon/></div>
                        <input type="email" placeholder='Email' className='form-inputs' required value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <input type="submit" value="Send Email" className='forgot-password-button'/>
                </form>

            </div>
        </div>    
        <Footer/>

            </>
        }  
        </>
    )
}

export default ForgotPassword
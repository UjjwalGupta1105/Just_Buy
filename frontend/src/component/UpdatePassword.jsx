import React , {useState,useRef, useEffect} from 'react'
import {Link} from 'react-router-dom'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonIcon from '@mui/icons-material/Person';
import Footer from "./Footer"
import Header from "./Header"
import Loading from '../layout/Loading'
import img from "../images/user-img.jpeg"
import {useDispatch,useSelector} from 'react-redux'
import {useAlert} from 'react-alert'
import {useNavigate} from 'react-router-dom'
import { updatePassword} from "../actions/userAction"
import  {clearErrors,updateUser,loadUser} from "../actions/userAction"
import HttpsIcon from '@mui/icons-material/Https';

const UpdatePassword=()=>{
    const {loading,error,isUpdated}=useSelector((state)=>state.profile)

    const [password,setPassword]=useState("");
    const [newPassword,setNewPassword]=useState("")
    const [confirmNewPassword,setConfirmNewPassword]=useState("")

    const alert=useAlert()
    const dispatch=useDispatch()
    const navigate=useNavigate()

    useEffect(()=>{
        if(isUpdated){
            alert.success("Password Updated Successfully")
            dispatch(loadUser())
            navigate("/account")
            dispatch({
                type:"UPDATE_Password_RESET"
            })
        }
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
    },[dispatch,error,alert,isUpdated])

    const updateSubmit=(e)=>{
        e.preventDefault() 
        dispatch(updatePassword(password,newPassword,confirmNewPassword))
     }

    return(
        <>
             {loading ? <Loading/> :
            <>
            <Header/>
        <div className="updatePassword-user-page">

            <div className="updatePassword-user-container">
                <h2>Update_Password</h2>

                <form  className="updatePassword-form" onSubmit={updateSubmit}>
                    <div className="oldpass">
                        <div><HttpsIcon/></div>
                            <input type="password" placeholder='Old Password' className='form-inputs' required value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <div className="newpass">
                        <div><LockOpenIcon/></div>
                            <input type="password" placeholder='New Password' className='form-inputs' required value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
                    </div>
                    <div className="confirmnewpass">
                        <div><HttpsIcon/></div>
                            <input type="password" placeholder='Confirm New Password' className='form-inputs' required value={confirmNewPassword} onChange={(e)=>setConfirmNewPassword(e.target.value)} />
                    </div>
                    

                    {/* One Input Field for Avatar */}


                    <input type="submit" value="Update Profile" className='update-button'/>
                </form>

            </div>
        </div>    
        <Footer/>

            </>
        }  
        </>
    )
}

export default UpdatePassword
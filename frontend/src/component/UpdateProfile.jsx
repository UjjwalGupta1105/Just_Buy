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
import {login,signup} from "../actions/userAction"
import  {clearErrors,updateUser,loadUser} from "../actions/userAction"

const UpdateProfile=()=>{
    const {loading,error,isUpdated}=useSelector((state)=>state.profile)
    const {user}=useSelector((state)=>state.user)

    const [name,setName]=useState("");
    const [email,setEmail]=useState("")
    // const [avatar,setAvatar]=useState(user.avatar) 

    const alert=useAlert()
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const [profile,setProfiler]=useState(user)
    // const [avatarPreview,setAvatarPreview]=useState({img})
    // const [avatar,setAvatar]=useState()

    const registerDataChange=(e)=>{
        //     const reader=new FileReader()

        //     reader.onload=()=>{
        //         if(reader.readyState===2){
        //             setAvatarPreview(reader.result)
        //             setAvatar(reader.result)
        //         }
        //     }
        //     reader.readAsDataURL(e.target.files[0])
        // 
    }

    useEffect(()=>{
    if(user){
        setName(user.name)
        setEmail(user.email)
    }
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        if(isUpdated){
            alert.success("Profile Updated Successfully")
            dispatch(loadUser())
            navigate("/account")

            dispatch({
                type:"UPDATE_PROFILE_RESET"
            })
        }
    },[dispatch,error,alert,isUpdated])

    const updateSubmit=(e)=>{
        e.preventDefault()
 
     //    const myform=new FormData()
 
     //    myform.set("name",user.name)
     //    myform.set("email",user.email)
     //    myform.set("password",user.password)
     // //    myform.set("avatar",avatar)
 
        dispatch(updateUser(name,email))
     }

    return(
        <>
             {loading ? <Loading/> :
            <>
            <Header/>
        <div className="update-user-page">

            <div className="update-user-container">
                <h2>Update_Profile</h2>

                <form  className="update-form" onSubmit={updateSubmit}>
                    <div className="update-name">
                    <div><PersonIcon/></div>
                        <input type="text" placeholder='Name' className='form-inputs' required value={name} onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div className="update-email">
                    <div><MailOutlineIcon/></div>
                        <input type="email" placeholder='Email' className='form-inputs' required value={email} onChange={(e)=>setEmail(e.target.value)} />
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

export default UpdateProfile
import React , {useState,useRef, useEffect} from 'react'
import {Link} from 'react-router-dom'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Footer from "./Footer"
import Header from "./Header"
import Loading from '../layout/Loading'
import img from "../images/user-img.jpeg"
import {useDispatch,useSelector} from 'react-redux'
import {useAlert} from 'react-alert'
import {useNavigate} from 'react-router-dom'
import {login,signup} from "../actions/userAction"
import  {clearErrors} from "../actions/productAction"


const LoginSignup=()=>{
    const {loading,error,isAuthenticated}=useSelector((state)=>state.user)
    const alert=useAlert()
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const [loginEmail,setLoginEmail]=useState(" ");
    const [loginPass,setLoginPass]=useState("")

    const loginTab=useRef(null)
    const signupTab=useRef(null)
    const switcherTab=useRef(null)

    // const [loginEmail,setLoginEmail]=useState("");
    // const [loginPass,setLoginPass]=useState("")

    const [user,setUser]=useState({
        name:"",
        email:"",
        password:""
    })
    // const [avatarPreview,setAvatarPreview]=useState({img})
    // const [avatar,setAvatar]=useState()

    const loginSubmit=()=>{
        dispatch(login(loginEmail,loginPass))
    }
    const signupSubmit=(e)=>{
       e.preventDefault()

    //    const myform=new FormData()

    //    myform.set("name",user.name)
    //    myform.set("email",user.email)
    //    myform.set("password",user.password)
    // //    myform.set("avatar",avatar)

       dispatch(signup(user.name,user.email,user.password))
    }

    const registerDataChange=(e)=>{
        // if(e.target.name=="avatar"){
        //     const reader=new FileReader()

        //     reader.onload=()=>{
        //         if(reader.readyState===2){
        //             setAvatarPreview(reader.result)
        //             setAvatar(reader.result)
        //         }
        //     }
        //     reader.readAsDataURL(e.target.files[0])
        // }
        // else{
            setUser({...user,[e.target.name]:e.target.value})
        // }
    }

    useEffect(()=>{
        if(error){
            alert.error(error)
            console.log("Karradone")
            dispatch(clearErrors())
        }
        if(!isAuthenticated){
            navigate("/login")
        }
        if(isAuthenticated){
            navigate("/")
        }

    },[dispatch,error,alert,isAuthenticated])

    const switchTabs=(e,tab)=>{
        if(tab==="login"){
            switcherTab.current.classList.add("shiftToNeutral")
            switcherTab.current.classList.remove("shiftToRight")

            signupTab.current.classList.remove("shiftToNeutral")
            loginTab.current.classList.remove("shiftToLeft")
        }
        if(tab==="signup"){
            switcherTab.current.classList.add("shiftToRight")
            switcherTab.current.classList.remove("shiftToNeutral")

            signupTab.current.classList.add("shiftToNeutral")
            loginTab.current.classList.add("shiftToLeft")
        }
    }

    return(
        <>
        {loading ? <Loading/> :
            <>
            <Header/>
        <div className="login-signup-page">

            <div className="login-signup-container">
                <div className="login-signup-box">
                    <div className="login-signup-switch">
                        <p onClick={(e)=>switchTabs(e,"login")}>Login</p>
                        <p onClick={(e)=>switchTabs(e,"signup")}>Signup</p>
                    </div>
                    <button  className='shiftToNeutral' ref={switcherTab}></button>
                </div>

                <form  className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                    <div className="login-Email">
                    <div><MailOutlineIcon/></div>
                        <input type="email" placeholder='Email' className='form-inputs' required value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)} />
                    </div>
                    <div className="login-Pass">
                        <div><LockOpenIcon/></div>
                        <input type="password" placeholder='Password'  className='form-inputs' required value={loginPass} onChange={(e)=>setLoginPass(e.target.value)} />
                    </div>
                    <div className='Forgot-Pass'><Link to="/password/forgot">Forgot Password ?</Link></div>
                    
                    <input type="submit" value="Login" className='login-Button'/>
                </form>

            <form action="" className="signinForm"  ref={signupTab} encType="multipart/form-data" onSubmit={signupSubmit} >
                <div className="signup-name">
                    <div><MailOutlineIcon/></div>
                    <input type="text" placeholder='Name'  className='form-inputs' name="name" required value={user.name} onChange={(e)=>registerDataChange(e)} />
                </div>
                <div className="signup-email">
                    <div><MailOutlineIcon/></div>
                        <input type="email" placeholder='Email' className='form-inputs' name="email" required value={user.email} onChange={(e)=>registerDataChange(e)} />
                </div>
                <div className="signup-pass">
                        <div><LockOpenIcon/></div>
                        <input type="password" placeholder='Password'  className='form-inputs' name="password" required value={user.password} onChange={(e)=>registerDataChange(e)}/>
                </div>
                {/* <div className="signup-image">
                
                    <img src={avatarPreview} alt="avatarPreview" />
                    <input type="file" name='avatar' accept='image/*'onChange={(e)=>registerDataChange(e)}/>
                </div> */}
                <input type="submit" value="Signup" className='signup-Button' />
                {/* disabled={loading ? true :false} */}
                </form>
            </div>
        </div>    
        <Footer/>

            </>
        }
        </>
    )
}
export default LoginSignup 
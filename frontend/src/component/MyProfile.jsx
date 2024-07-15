import React, { useEffect } from 'react'
import {Link} from "react-router-dom"
import Header from "./Header"
import Loading from '../layout/Loading'
import img from "../images/user-img.jpeg"
import {useDispatch,useSelector} from 'react-redux'
import {useAlert} from 'react-alert'
import {useNavigate} from 'react-router-dom'

const MyProfile=()=>{
    const {loading,error,isAuthenticated,user}=useSelector((state)=>state.user)

    useEffect(()=>{

    },[loading,isAuthenticated,user])
    return(
        <>
        {loading ? <Loading/> : (
            <>
            <Header/>
            <div className="myprofile-container">
                    <div className="myprofile-left">
                        <h2>My Profile</h2>
                        <img src={img} alt="user_img" />
                        <Link to="/me/update">Edit Profile</Link>
                    </div>
                    <div className="myprofile-right">
                        <div className="myprofile-name">
                            <h4>Full Name</h4>
                            <p>{user.name}</p>
                        </div>
                        <div className="myprofile-email">
                            <h4>Email</h4>
                            <p>{user.email}</p>
                        </div>
                        <div className="myprofile-joined">
                            <h4>Joined On</h4>
                            <p>{user.createdAt.substring(0,10)}</p>
                        </div>
                        <div className="myprofile-myorder-button">
                            <Link to="/me/updatePassword">Update Password</Link>
                        </div>
                        <div className="myprofile-changepass-button">
                            <Link to="/orders">My Orders</Link>
                            <img src="" alt="" />
                        </div>

                        
                    </div>
                </div>
            </>
        )}
        </>
    )
}

export default MyProfile
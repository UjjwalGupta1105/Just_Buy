import React , {useState} from 'react'
import "../App.css"
import {useSelector} from 'react-redux'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction';
import img from "../images/user-img.jpeg"
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ListAltIcon from '@mui/icons-material/ListAlt';
import {useAlert} from 'react-alert'
import {useNavigate} from 'react-router-dom'
import {logout} from '../actions/userAction'
import {useDispatch} from 'react-redux'
import Backdrop from '@mui/material/Backdrop';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import { useSelector } from 'react-redux';

const useOptions=()=>{
    const {cartItems}=useSelector((state)=>state.cart)
    const {user}=useSelector((state)=>state.user)

    const dispatch=useDispatch()
    const alert=useAlert()
    const [open,setOpen]=useState(false)
    const navigate=useNavigate()

    const actions=[
        {icon :<ListAltIcon/> , name:"Orders",func:orders},
        {icon :<PersonIcon/> , name:"Profile",func:account},
        {icon :<ShoppingCartIcon/> , name:`Cart(${cartItems.length})`,func:cart},
        {icon :<LogoutIcon/> , name:"Logout",func:logoutUser}

    ]
    if(user.role==="admin"){
        actions.unshift( {icon :<DashboardIcon/> , name:"Dashboard",func:dashboard},)
    }
    function orders(){
        navigate("/orders")
    }
    function account(){
        navigate("/account")
    }
    function logoutUser(){
        dispatch(logout())
        navigate("/login")
        alert.success("LoggedOut Successfully...")
    }
    function dashboard(){
        navigate("/admin/dashboard")
    }
    function cart(){
        navigate("/cart")
    }

    return(
        <>
        <Backdrop open={open}/>
        <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={()=>setOpen(false)}
        onOpen={()=>setOpen(true)}
        open={open}
        icon={<PersonIcon/>}
        direction="down"
        className='speedDial'
>
         {actions.map((action) => (
             <SpeedDialAction
             key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen={window.innerWidth<=600?true:false}
              onClick={action.func}
            />
))}
</SpeedDial>
        </>
    )
}

export default useOptions
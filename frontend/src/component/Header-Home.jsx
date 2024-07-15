import React , {useState} from 'react'
import "../App.css"
import {useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import UseOptions from "./useOptions"
import store from "../store"


const Header=()=>{
    const {loading,isAuthenticated}=useSelector((state)=>state.user)

    return(
    <>
         <header className='header-home'>
        <div className="left-name">
            <h2>Just_Buy</h2>
        </div>
        <div className="middle">
                    <NavLink className="navitems"   to="/">Home</NavLink>
                    <NavLink className="navitems" to="/products">Product</NavLink>
                    <NavLink className="navitems" to="/contact">Contact</NavLink>
                    <NavLink className="navitems"  to="/about">About</NavLink>
        </div>
        <div className="right">
        <NavLink to="/search"><SearchIcon style={{color:"white"}}/></NavLink>  
        {!isAuthenticated && <NavLink to="/login"><PersonIcon style={{color:"white"}}/></NavLink>}
        <NavLink to="/cart"><ShoppingCartIcon style={{color:"white"}}/></NavLink> 
        </div>

       {isAuthenticated && <UseOptions/>}

       </header>
    </>
    )

    
    }
export default Header
import React from 'react'
import ErrorIcon from '@mui/icons-material/Error';
import Header from './Header'
import Footer from './Footer'
import {Link} from 'react-router-dom'

const NotFound=()=>{
    return(
        <>
        <Header/>
            <div className="not-found-page">
                <div  className="not-found-page-container">
                    <ErrorIcon sx={{color:"tomato", height:"130px",width:"130px",display:"block",margin:"auto"}}/>
                    <h2>Page Not Found</h2>
                    <Link to="/"><button>Home</button></Link>
                </div>
            </div>
        <Footer/>
        
        </>
    )
}

export default NotFound
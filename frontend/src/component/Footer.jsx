import React from 'react'
import linkdin from '../images/linkdin-img.png' 
import github from '../images/github-img.png' 
import instagram from '../images/instagram-img.png' 
import download_img from '../images/download-img.png' 
import "../App.css"

const Footer=()=>{
    return(
        <>
         <div className="footer">
          
         <div className="left-footer">
            <h3>Follow_Us</h3>
            <div className="links">
                        <a href="https://www.linkedin.com/in/ujjwal-gupta-b05130289?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target='blank'><img className='sociallinks' src={linkdin} alt="" /></a>
                        <a href="https://github.com/UjjwalGupta1105" target='blank'><img className='sociallinks' src={github} alt="" /></a>
                        <a href="https://github.com/UjjwalGupta1105" target='blank'><img className='sociallinks' src={instagram} alt="" /></a>
                    </div>
         </div>
         <div className="mid-footer">
            <h1>Just_Buy</h1>
            <p className='line'>One Place to Buy Everything at Affordable Prices .</p>
            <p>Just_Buy is One of the Leading Ecommerse Platform which serves Best Quality , Affordability & Home Delivery .<br/> So What to Think Now , Just Buy...</p>
         </div>
         <div className="right-footer">
            <h3>Get Our App Now</h3>
            <a href="https://play.google.com/store/games?device=windows" target='blank'><img className='downlinks' src={download_img} alt="Download Now" /></a>
         </div>

         </div>
        </>
    )
}
export default Footer
import React from 'react'
import linkdin from '../images/linkdin-img.png' 
import github from '../images/github-img.png' 
import instagram from '../images/instagram-img.png' 
import "../App.css"
import Header from './Header'
import Footer from './Footer'

const Contact=()=>{
    return(
        <>
         <Header/>
         <h2 className='contact-page-heading'>Contact_us</h2>
            <div className="contact-page">
             
            <div className='contact-page-box'>
            <div>
                    <h2>ujjwalgupta0506@gmail.com</h2>
                </div>
                <div className="links">
                        <a href="https://www.linkedin.com/in/ujjwal-gupta-b05130289?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target='blank'><img className='sociallinks' src={linkdin} alt="" /></a>
                        <a href="https://github.com/UjjwalGupta1105" target='blank'><img className='sociallinks' src={github} alt="" /></a>
                        <a href="https://github.com/UjjwalGupta1105" target='blank'><img className='sociallinks' src={instagram} alt="" /></a>
                    </div>
            </div>
            </div>
            <Footer/>
        </>
    )
}

export default Contact
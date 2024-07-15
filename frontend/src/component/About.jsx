
import React from 'react'
import linkdin from '../images/linkdin-img.png' 
import github from '../images/github-img.png' 
import instagram from '../images/instagram-img.png' 
import "../App.css"
import Header from './Header'
import Footer from './Footer'
import img from '../images/myphoto.jpg'
import gfg from '../images/gfg.png'
import { NavLink } from 'react-router-dom'

const About=()=>{
    const position ="Full Stack Developer"
    
     return(
        <>
        <Header/>
            <div className="firstsection">
                <div className='photo'>
                    <img src={img} alt="img" />
                </div>
                <div className="firstsectionright">
                    <h1 >Hi, I'm <span>Ujjwal Gupta</span></h1>
                    <div className="animateabout">
                        <h5> A <span> "  {position} "</span></h5>
                    </div>
                    <p className="data">
                    A passionate Full Stack Software Developer 🚀 & Programmer who always thrives to work on end to end products which develop sustainable and scalable social and technical systems to create impact.

</p>
                    <div className="links">
                        <a href="https://www.linkedin.com/in/ujjwal-gupta-b05130289?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target='blank'><img src={linkdin} alt="" /></a>
                        <a href="https://github.com/UjjwalGupta0506" target='blank'><img src={github} alt="" /></a>
                        <a href="https://auth.geeksforgeeks.org/user/ujjwalgupta0506" target='blank'><img src={gfg} alt="" /></a>
                    </div>
                <div className="buttons">
               <NavLink to="/contact"> <button className="contact">Contact_Me</button></NavLink>
                <button className="resume">My_Resume</button>
                </div>
                
                </div>
            </div>
            <Footer/>
        </>
     )
}
export default About;
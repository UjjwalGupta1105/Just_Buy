import React,{useState} from 'react'
import Header from './Header'
import Footer from './Footer'
import {useAlert} from 'react-alert'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import PinDropIcon from '@mui/icons-material/PinDrop';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIcon from '@mui/icons-material/Phone';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import {Country,State} from 'country-state-city'
import MetaData from '../layout/MetaData'

import Stepper from "./Stepper(Shipping)"

import {shipping} from "../actions/cartAction"

import CountryData from "./CountriesData"

const Shipping=()=>{

    const dispatch=useDispatch()
    const alert=useAlert()
    const navigate=useNavigate()
    const {shippingInfo} =useSelector((state)=>state.cart)

        const [address,setAddress]=useState(shippingInfo.address)
        const [city,setCity]=useState(shippingInfo.city)
        const [state,setState]=useState(shippingInfo.state)
        const [country,setCountry]=useState(shippingInfo.country)
        const [pincode,setPincode]=useState(shippingInfo.pincode)
        const [phone,setPhone]=useState(shippingInfo.phone)
        
        const handelShippingSubmit=(e)=>{
           e.preventDefault()

           if(phone.length<10||phone.length>10){
            alert.error("Phone Number should be of 10 Digits")
            return
           }
        //    setCountry("IN")
           dispatch(shipping({address,city,state,country,pincode,phone}))
           navigate("/order/confirm")
        }
    //   let temp=""
    //     const setCountryCode=(name)=>{
    //        let currentCountry = CountryData.forEach(country=>{ if(country.name===name){ return country.code}})
    //         if(currentCountry===undefined){
    //             temp="IN"
                
    //         }
    //         else{
    //             temp="IN"
    //         }
    //     }

        // "https://restfulcountries.com/api/v1/countries/Nigeria"
    return(
        <>
        <MetaData title="Shippping Details"/>
        <div className="stepper">
            <Stepper activePage={0}/> 
        </div>
         
            <div className="shipping-page">
                <h2>Shipping Details</h2>
                <div className="shipping-form">
                    <form onSubmit={handelShippingSubmit}>
                    <div className='shipping-form-div' >
                        <div><HomeIcon/></div>
                        <input type="text" placeholder='Address'  className='form-input' required value={address} onChange={(e)=>setAddress(e.target.value)} />
                    </div>
                    <div  className='shipping-form-div'>
                        <div><LocationCityIcon/></div>
                        <input type="text" placeholder='City'  className='form-input'  required value={city} onChange={(e)=>setCity(e.target.value)} />
                    </div>
                    <div  className='shipping-form-div'>
                        <div><PinDropIcon/></div>
                        <input type="number" placeholder='Pincode'  className='form-input' required value={pincode} onChange={(e)=>setPincode(e.target.value)} />
                    </div>
                    <div  className='shipping-form-div'>
                        <div><PhoneIcon/></div>
                        <input type="number" placeholder='Phone Number'  className='form-input'  required value={phone} onChange={(e)=>setPhone(e.target.value)} />
                    </div>

                    <div className='shipping-form-div'>
                        <div><PublicIcon/></div>
                        <input type="text" placeholder='Country Code (IN)'  className='form-input'  required value={country} onChange={(e)=>setCountry(e.target.value)} />
                        </div>

                        <div className='shipping-form-div'>
                        <div><TransferWithinAStationIcon/></div>
                        <input type="text" placeholder='State'  className='form-input'  required value={state} onChange={(e)=>setState(e.target.value)} />
                         </div>
                    
                    <input type="submit" value="Continue" className='shipping-button' disabled={state?false:true}></input>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Shipping
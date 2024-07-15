import React,{useEffect,useState} from 'react'
import {useAlert} from 'react-alert'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { createProduct ,clearErrors} from '../../actions/productAction'
import { useParams } from 'react-router-dom'
import MetaData from '../../layout/MetaData'
import {Link} from 'react-router-dom'
import Loading from '../../layout/Loading'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid'
import Slidebar from "./Slidebar"
import Header from "../Header"
import Footer from "../Footer"

const NewProduct=()=>{

    const {loading,error,success}=useSelector((state)=>state.newProduct)

    const dispatch=useDispatch()
    const alert=useAlert()
    const navigate=useNavigate()

    const [name,setName]=useState("")
    const [price,setPrice]=useState("")
    const [description,setDescription]=useState("")
    const [category,setCategory]=useState("")
    const [stock,setStock]=useState("")
    const [URL,setURL]=useState({
        url1:"",
        url2:"",
        url3:"",
    })
    const [images,setImages]=useState([])
    // const [imagesPreview,setImagesPreview]=useState([])

    const categories=[
        "Laptop",
        "FootWear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",

    ]

    useEffect(()=>{
        
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        if(success){
            alert.success("Product Created Successfully")
            navigate("/admin/dashboard")
            dispatch({type:"NEW_PRODUCT_RESET"})
        }

    },[dispatch,alert,error,success])

    const i=1

    const createProductSubmitHandler=(e)=>{
        e.preventDefault()

                images.push({
                         public_id:"ffui242637875368jk",
                         url:URL.url1
                })
                images.push({
                    public_id:"ffui242637875368jk",
                    url:URL.url2
                 })
                images.push({
                    public_id:"ffui242637875368jk",
                    url:URL.url3
             })

        

        dispatch(createProduct(name,price,description,category,stock,images))
    }

    // const createProductImageChange=(e)=>{
        
    //     const files=Array.from(e.target.files)

    //     setImages([])
    //     setImagesPreview([])

    //     files.forEach((file)=>{

    //     const reader=new FileReader()

    //         reader.onload=()=>{
    //             if(reader.readyState===2){
    //                 setImagesPreview((old)=>[...old,reader.result])
    //                 setImages((old)=>[...old,reader.result])
    //             }
    //         }
    //         reader.readAsDataURL(files)
    //     })
    // }

    const manageChange=(e)=>{
        setURL({...URL,[e.target.name]:e.target.value})
    }

    return(
        <>
            <div className="dashboard-page">
                <Slidebar/>
                <div className="new-product-container">
                    <form encType='multipart/form-data' onSubmit={createProductSubmitHandler}>
                        <h1>Create Product</h1>

                        <div>
                            <div><SpellcheckIcon/></div>
                            <input type="text" placeholder='Product Name' className='form-inputs' required value={name} onChange={(e)=>setName(e.target.value)} />
                        </div>
                        <div>
                            <div><AttachMoneyIcon/></div>
                            <input type="number" placeholder='Price' className='form-inputs' required value={price} onChange={(e)=>setPrice(e.target.value)} />
                        </div>
                        <div>
                            <div><DescriptionIcon/></div>
                            <textarea  placeholder='Product Description' className='form-inputs-textarea' required value={description} onChange={(e)=>setDescription(e.target.value)} />
                        </div>
                        <div>
                            <div><AccountTreeIcon/></div>
                           <select onChange={(e)=>setCategory(e.target.value)} className='form-inputs'>
                                <option value="">Choose Category</option>
                                {categories.map((cat)=>{
                                    return <option value={cat}  key={cat}>{cat}</option>
                                })}
                           </select>
                        </div>
                        <div>
                            <div><StorageIcon/></div>
                            <input type="number" placeholder='Stock' className='form-inputs' required value={stock} onChange={(e)=>setStock(e.target.value)} />
                        </div>
                      
                        {/* <div id='createProductFormFile'>
                            <input type='file' name='avatar' accept='image/*' className='form-inputs' multiple onChange={createProductImageChange}></input>
                        </div>
                        <div id='createProductFormImage'>
                            {imagesPreview.map((image,index)=>{
                                <img key={index} src={image} alt="Avatar Preview" />
                            })}
                        </div> */}
                        <div>
                            <div><SpellcheckIcon/></div>
                            <input type="text" placeholder='Product Image URL:1' className='form-inputs' required name='url1' value={URL.url1} onChange={(e)=>manageChange(e)} />
                        </div>
                        <div>
                            <div><SpellcheckIcon/></div>
                            <input type="text" placeholder='Product Image URL:2' className='form-inputs' required name='url2' value={URL.url2} onChange={(e)=>manageChange(e)} />
                        </div>
                        <div>
                            <div><SpellcheckIcon/></div>
                            <input type="text" placeholder='Product Image URL:3' className='form-inputs' required name='url3' value={URL.url3} onChange={(e)=>manageChange(e)} />
                        </div>
                        
                        <Button className='create-product-button' type='submit' disabled={loading ? true :false}> Create</Button>
                    </form>
                </div>
            </div>
        </>
    )

}

export default NewProduct
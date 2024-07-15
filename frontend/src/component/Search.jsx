import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import '../App.css'

const Search=()=>{
    const [keyword,setKeyword]=useState("")
    const navigate=useNavigate()

    const searchSubmitHandler=(e)=>{
        e.preventDefault()
        if(keyword){
            navigate(`/products/${keyword}`)
        }
        else{
            navigate("/products")
        }
    }

    return(
        <>
            <form className="search-Box" onSubmit={searchSubmitHandler}>
                <input className='search-Box-input' type="text" placeholder='Search a Product...' onChange={(e)=>setKeyword(e.target.value)} />
                <input  className='search-Box-submit'  type="submit" value="search" />
            </form>
        </>
    )
}
export default Search
import axios from 'axios'

export const addItemsToCart=(id,quantity)=>async(dispatch,getState)=>{
        const {data}=await axios.get(`/admin/product/${id}`)

        dispatch({
            type:"ADD_TO_CART",
            payload:{
                _id:data._id,
                name:data.name,
                price:data.price,
                image:data.images[0].url,
                stock:data.stock,
                quantity
            }
        })

        localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart=(id)=>async(dispatch,getState)=>{
   
    dispatch({
        type:"REMOVE_FROM_CART",
        payload:id
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}
export const shipping=(data)=>async(dispatch)=>{
   
    dispatch({
        type:"SAVE_SHIPPING_INFO",
        payload:data
    })

    localStorage.setItem('shippingInfo',JSON.stringify(data))
}

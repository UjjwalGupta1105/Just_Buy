import axios from 'axios'

export const createOrder=(order)=>async(dispatch)=>{
      try {
        dispatch({type:"CREATE_ORDER_REQUEST"})

        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        console.log("CAMO")
        const {data}=await axios.post(
            "/order/new",
            order,
            config
        )

        dispatch({
            type:"CREATE_ORDER_SUCCESS",
            payload:data
        })
      } catch (error) {
        dispatch({
            type:"CREATE_ORDER_Fail",
            payload:error.response.data.message
        })
      }
}
export const myOrders=()=>async(dispatch)=>{
    try {
      dispatch({type:"MY_ORDERS_REQUEST"})
      
      const {data}=await axios.get("/order/me")

      dispatch({
          type:"MY_ORDERS_SUCCESS",
          payload:data
      })
    } catch (error) {
      dispatch({
          type:"MY_ORDERS_Fail",
          payload:error.response.data.message
      })
    }
}

export const getOrderDetails=(id)=>async(dispatch)=>{
  try {
    console.log("KimiPuion")
    
    dispatch({type:"ORDER_DETAILS_REQUEST"})
    
    const {data}=await axios.get(`/order/${id}`)

    dispatch({
        type:"ORDER_DETAILS_SUCCESS",
        payload:data
    })
  } catch (error) {
    dispatch({
        type:"ORDER_DETAILS_FAIL",
        payload:error.response.data.message
    })
  }
}

  
  export const newReview=(rating,comment,id)=>async(dispatch)=>{
    try {
      console.log("KimiPuion")
      
      dispatch({type:"NEW_REVIEW_REQUEST"})
      
      const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const {data}=await axios.post(
        `/product/reviews/${id}`,
        {rating,comment,id},
        config
    )
      dispatch({
          type:"NEW_REVIEW_SUCCESS",
          payload:data.success
      })
    } catch (error) {
      dispatch({
          type:"NEW_REVIEW_FAIL",
          payload:error.response.data.message
      })
    }
  }
  export const clearErrors=()=>async (dispatch)=>{
      dispatch({type:"CLEAR_ERRORS"})
   }
  

export const getOrders=()=>async(dispatch)=>{
      try {
        dispatch({type:"ALL_ORDERS_REQUEST"})
        
        const {data}=await axios.get("/order")
  
        dispatch({
            type:"ALL_ORDERS_SUCCESS",
            payload:data
        })
      } catch (error) {
        dispatch({
            type:"ALL_ORDERS_Fail",
            payload:error.response.data.message
        })
      }
  }
  export const deleteOrder=(id)=>async(dispatch)=>{
    try {
      dispatch({type:"DELETE_ORDER_REQUEST"})
  
      const {data}=await axios.delete(`/admin/order/${id}`)
  
      dispatch({
          type:"DELETE_ORDER_SUCCESS",
          payload:data.isDeleted
      })
    } catch (error) {
      dispatch({
          type:"DELETE_ORDER_Fail",
          payload:error.response.data.message
      })
    }
  }
  export const updateOrder=(id,status)=>async(dispatch)=>{
    try {
      dispatch({type:"UPDATE_ORDER_REQUEST"})
  
      const config={headers:{"Content-Type":"application/json"}}
  
      const {data}=await axios.patch(
          `/order/${id}`,
          {status},
          config
      )
  
      dispatch({
          type:"UPDATE_ORDER_SUCCESS",
          payload:data.isUpdated
      })
    } catch (error) {
      dispatch({
          type:"UPDATE_ORDER_Fail",
          payload:error.response.data.message
      })
    }
  }
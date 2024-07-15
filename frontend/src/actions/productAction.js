import axios from 'axios'

export const getProduct=(keyword)=>async(dispatch)=>{
      try {
        dispatch({type:"ALL_PRODUCT_REQUEST"})

        const {data}=await axios.get(`/admin/product`)

        dispatch({
            type:"ALL_PRODUCT_SUCCESS",
            payload:data
        })
      } catch (error) {
        dispatch({
            type:"ALL_PRODUCT_Fail",
            payload:error.response.message
        })
      }
}
export const getAdminProducts=()=>async(dispatch)=>{
  try {
    dispatch({type:"ADMIN_PRODUCT_SUCCESS"})

    const {data}=await axios.get(`/admin/product`)

    dispatch({
        type:"ADMIN_PRODUCT_SUCCESS",
        payload:data
    })
  } catch (error) {
    dispatch({
        type:"ADMIN_PRODUCT_Fail",
        payload:error.response.message
    })
  }
}

export const clearErrors=()=>async (dispatch)=>{
  dispatch({type:"CLEAR_ERRORS"})
}

export const getProductDetails=(id)=>async(dispatch)=>{
  try {
    dispatch({type:"PRODUCT_DETAILS_REQUEST"})

    const {data}=await axios.get(`/admin/product/${id}`)

    dispatch({
        type:"PRODUCT_DETAILS_SUCCESS",
        payload:data
    })
  } catch (error) {
    dispatch({
        type:"PRODUCT_DETAILS_Fail",
        payload:error.response.data.message
    })
  }
}

export const createProduct=(name,price,description,category,stock,images)=>async(dispatch)=>{
  try {
    dispatch({type:"NEW_PRODUCT_REQUEST"})

    const config={headers:{"Content-Type":"application/json"}}

    const {data}=await axios.post(
        "/product/new",
        {name,price,description,category,stock,images},
        config
    )

    dispatch({
        type:"NEW_PRODUCT_SUCCESS",
        payload:data
    })
  } catch (error) {
    dispatch({
        type:"NEW_PRODUCT_Fail",
        payload:error.response.data.message
    })
  }
}
export const deleteProduct=(id)=>async(dispatch)=>{
  try {
    dispatch({type:"DELETE_PRODUCT_REQUEST"})

    const {data}=await axios.delete(`/admin/product/${id}`)

    dispatch({
        type:"DELETE_PRODUCT_SUCCESS",
        payload:data.isDeleted
    })
  } catch (error) {
    dispatch({
        type:"DELETE_PRODUCT_Fail",
        payload:error.response.data.message
    })
  }
}
export const updateProduct=(id,name,price,description,category,stock,images)=>async(dispatch)=>{
  try {
    dispatch({type:"UPDATE_PRODUCT_REQUEST"})

    const config={headers:{"Content-Type":"application/json"}}

    const {data}=await axios.patch(
        `/admin/product/${id}`,
        {name,price,description,category,stock,images},
        config
    )

    dispatch({
        type:"UPDATE_PRODUCT_SUCCESS",
        payload:data.isUpdated
    })
  } catch (error) {
    dispatch({
        type:"UPDATE_PRODUCT_Fail",
        payload:error.response.data.message
    })
  }
}
export const getAllReviews=(productId)=>async(dispatch)=>{
  try {
    
    dispatch({type:"ALL_REVIEW_REQUEST"})
  const {data}=await axios.get(`/admin/reviews/${productId}`)
    dispatch({
        type:"ALL_REVIEW_SUCCESS",
        payload:data
    })
  } catch (error) {
    dispatch({
        type:"ALL_REVIEW_FAIL",
        payload:error.response.data.message
    })
  }
}
export const deleteReviews=(productId,reviewId)=>async(dispatch)=>{
  try {
    
    dispatch({type:"DELETE_REVIEW_REQUEST"})
  const {data}=await axios.delete(`/admin/reviews/${productId}/${reviewId}`)
    dispatch({
        type:"DELETE_REVIEW_SUCCESS",
        payload:data.success
    })
  } catch (error) {
    dispatch({
        type:"DELETE_REVIEW_FAIL",
        payload:error.response.data.message
    })
  }
}
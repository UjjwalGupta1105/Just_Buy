import axios from 'axios'

export const login=(email,password)=>async(dispatch)=>{
      try {
        dispatch({type:"LOGIN_REQUEST"})

        const config={headers:{"Content-Type":"application/json"}}

        const {data}=await axios.post(
            `/login`,
            {email,password},
            config
        )

        dispatch({
            type:"LOGIN_SUCCESS",
            payload:data
        })
      } catch (error) {
        dispatch({
            type:"LOGIN_FAIL",
            payload:"Please Enter Valid Email & Password"
        })
      }
}
export const logout=()=>async(dispatch)=>{
  try {
       await axios.get(`/logout`)

    dispatch({type:"LOGOUT_SUCCESS"})
  } catch (error) {
    dispatch({
        type:"LOGOUT_FAIL",
        payload:error.response.data.message
    })
  }
}
export const signup=(name,email,password)=>async(dispatch)=>{
  try {
    dispatch({type:"SIGNUP_REQUEST"})

    // const config={headers:{"Content-Type":"multipart/form-data"}}
    const config={headers:{"Content-Type":"application/json"}}

    const {data}=await axios.post(
        `/register`,
        {name,email,password},
        config
    )

    dispatch({
        type:"SIGNUP_SUCCESS",
        payload:data
    })
  } catch (error) {
    dispatch({
        type:"SIGNUP_FAIL",
        payload:error
    })
  }
}
export const loadUser=()=>async(dispatch)=>{
  try {
    dispatch({type:"LOADUSER_REQUEST"})

    const {data}=await axios.get("/me")

    dispatch({
        type:"LOADUSER_SUCCESS",
        payload:data
    })
  } catch (error) {
    dispatch({
        type:"LOADUSER_FAIL",
        payload:error
    })
  }
}
export const updateUser=(name,email)=>async(dispatch)=>{
  try {
    dispatch({type:"UPDATE_USER_REQUEST"})

    const config={headers:{"Content-Type":"application/json"}}

    const {data}=await axios.patch(
        `/me/update`,
        {name,email},
        config
    )

    dispatch({
        type:"UPDATE_USER_SUCCESS",
        payload:data.success
    })
  } catch (error) {
    dispatch({
        type:"UPDATE_USER_FAIL",
        payload:error.response.data.message
    })
  }
}
export const updatePassword=(password,newPassword,confimNewPassword)=>async(dispatch)=>{
  try {
    dispatch({type:"UPDATE_PASSWORD_REQUEST"})

    const config={headers:{"Content-Type":"application/json"}}

    const {data}=await axios.post(
        `/me/updatePassword`,
        {password,newPassword,confimNewPassword},
        config
    )

    dispatch({
        type:"UPDATE_PASSWORD_SUCCESS",
        payload:data.success
    })
  } catch (error) {
    dispatch({
        type:"UPDATE_PASSWORD_FAIL",
        payload:error.response.data.message
    })
  }
}
export const forgotPassword=(email)=>async(dispatch)=>{
  try {
    dispatch({type:"FORGOT_PASSWORD_REQUEST"})

    const config={headers:{"Content-Type":"application/json"}}

    const {data}=await axios.post(
        `/password/forgot`,
        {email},
        config
    )

    dispatch({
        type:"FORGOT_PASSWORD_SUCCESS",
        payload:data.message
    })
  } catch (error) {
    dispatch({
        type:"FORGOT_PASSWORD_FAIL",
        payload:"Your ResetPassword Request Could Not Be Processed at this moment...."
    })
  }
}
export const resetPassword=(token,password,confirmPassword)=>async(dispatch)=>{
  try {
    dispatch({type:"RESET_PASSWORD_REQUEST"})

    const config={headers:{"Content-Type":"application/json"}}

    const {data}=await axios.patch(
        `/password/reset/${token}`,
        {password,confirmPassword},
        config
    )

    dispatch({
        type:"RESET_PASSWORD_SUCCESS",
        payload:data.success
    })
  } catch (error) {
    dispatch({
        type:"RESET_PASSWORD_FAIL",
        payload:error.response.data.message
    })
  }
}
export const getAllUsers=()=>async(dispatch)=>{
  try {
    dispatch({type:"ALL_USERS_REQUEST"})
     const {data}=await axios.get(`/admin/users`)

    dispatch({type:"ALL_USERS_SUCCESS",payload:data})
  } catch (error) {
    dispatch({
        type:"ALL_USERS_FAIL",
        payload:error.response.data.message
    })
  }
}

export const getUserDetails=(id)=>async(dispatch)=>{
  try {
    dispatch({type:"USER_DETAILS_REQUEST"})
     const {data}=await axios.get(`/admin/user/${id}`)

    dispatch({type:"USER_DETAILS_SUCCESS",payload:data})
  } catch (error) {
    dispatch({
        type:"USER_DETAILS_FAIL",
        payload:error.response.data.message
    })
  }
}
export const updateProfile=(id,name,email,role)=>async(dispatch)=>{
  try {
    dispatch({type:"UPDATE_PROFILE_REQUEST"})

    const config={headers:{"Content-Type":"application/json"}}

    const {data}=await axios.patch(
        `/admin/user/update/${id}`,
        {name,email,role},
        config
    )

    dispatch({
        type:"UPDATE_PROFILE_SUCCESS",
        payload:data.success
    })
  } catch (error) {
    dispatch({
        type:"UPDATE_PROFILE_FAIL",
        payload:error.response.data.message
    })
  }
}
export const deleteProfile=(id)=>async(dispatch)=>{
  try {
    dispatch({type:"DELETE_PROFILE_REQUEST"})

    const {data}=await axios.delete(`/admin/user/delete/${id}`)

    dispatch({
        type:"DELETE_PROFILE_SUCCESS",
        payload:data.success
    })
  } catch (error) {
    dispatch({
        type:"DELETE_PROFILE_FAIL",
        payload:error.response.data.message
    })
  }
}


export const clearErrors=()=>async (dispatch)=>{
    dispatch({type:"CLEAR_ERRORS"})
  }

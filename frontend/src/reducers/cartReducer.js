// import {initialState} from "../store"

export const cartReducer=(state={cartItems:localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')):[],
                                shippingInfo:localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')):{} },action)=>{
    switch (action.type){
        case "ADD_TO_CART":
            const item=action.payload

            const isExist=state.cartItems.find(
                (i)=> i._id===item._id
            )

            if(isExist){
                return{
                    ...state,
                    cartItems:state.cartItems.map((i)=>{
                      return  i._id===item._id ? item : i
                    })
                }
            }
            else{
                return{
                    ...state,
                    cartItems:[...state.cartItems,item]
                }
            } 

            default:
               return state;

           case "REMOVE_FROM_CART":  
                return{
                    ...state,
                    cartItems:state.cartItems.filter((item)=> item._id !== action.payload)
                }  
                case "SAVE_SHIPPING_INFO":  
                return{
                    ...state,
                    shippingInfo:action.payload
                }  
    }

    

}
export const orderReducer=(state={},action)=>{
    switch (action.type){
       case "CREATE_ORDER_REQUEST":
           return{
            ...state,
               loading:true,
           };
           case "CREATE_ORDER_SUCCESS":
               return{
                   loading:false,
                   order:action.payload
           };
           case "CREATE_ORDER_Fail":
                   return{
                       loading:false,
                       error:action.payload
           };
           case "CLEAR_ERRORS":
               return{
                   ...state,
                   error:null
           };
           default:
               return state;
    }
}
export const myOrderReducer=(state={orders:[]},action)=>{
    switch (action.type){
       case "MY_ORDERS_REQUEST":
           return{
               loading:true,
           };
           case "MY_ORDERS_SUCCESS":
               return{
                   loading:false,
                   orders:action.payload
           };
           case "MY_ORDERS_Fail":
                   return{
                       loading:false,
                       error:action.payload
           };
           case "CLEAR_ERRORS":
               return{
                   ...state,
                   error:null
           };
           default:
               return state;
    }
}
export const orderDetailsReducer=(state={order:{}},action)=>{
    switch (action.type){
       case "ORDER_DETAILS_REQUEST":
           return{
               loading:true,
           };
           case "ORDER_DETAILS_SUCCESS":
               return{
                   loading:false,
                   order:action.payload
           };
           case "ORDER_DETAILS_Fail":
                   return{
                       loading:false,
                       error:action.payload
           };
           case "CLEAR_ERRORS":
               return{
                   ...state,
                   error:null
           };
           default:
               return state;
    }
}

export const newReviewReducer=(state={},action)=>{
    switch (action.type){
       case "NEW_REVIEW_REQUEST":
           return{
            ...state,
               loading:true,
           };
           case "NEW_REVIEW_SUCCESS":
               return{
                   loading:false,
                   success:action.payload
           };
           case "NEW_REVIEW_Fail":
                   return{
                    ...state,
                       loading:false,
                       reviewError:action.payload
           };
           case "NEW_REVIEW_RESET":
            return{
                ...state,
                loading:false,
                success:false
    };
           case "CLEAR_ERRORS":
               return{
                   ...state,
                   reviewError:null
           };
           default:
               return state;
    }
}
export const allOrdeReducer=(state={orders:[]},action)=>{
    switch (action.type){
       case "ALL_ORDERS_REQUEST":
           return{
               loading:true,
           };
           case "ALL_ORDERS_SUCCESS":
               return{
                   loading:false,
                   orders:action.payload
           };
           case "ALL_ORDERS_Fail":
                   return{
                       loading:false,
                       error:action.payload
           };
           case "CLEAR_ERRORS":
               return{
                   ...state,
                   error:null
           };
           default:
               return state;
    }
}
export const adminOrderReducer=(state={},action)=>{
    switch (action.type){
       case "DELETE_ORDER_REQUEST":
        case "UPDATE_ORDER_REQUEST":
           return{
            ...state,
               loading:true 
           };
           case "DELETE_ORDER_SUCCESS":
               return{
                ...state,
                   loading:false,
                   isDeleted:action.payload
           };

            case "UPDATE_ORDER_SUCCESS":
                return{
                    ...state,
                    loading:false,
                    isUpdated:action.payload
                }
           case "DELETE_ORDER_Fail":
            case "UPDATE_ORDER_Fail":
                   return{
                    ...state,
                       loading:false,
                       error:action.payload,
           };
           case "CLEAR_ERRORS":
               return{
                   ...state,
                   error:null
           };

           case "DELETE_ORDER_RESET":
           return{
            ...state,
            isDeleted:false
           }
           case "UPDATE_ORDER_RESET":
            return{
             ...state,
             isUpdated:false
            }
           default:
               return state;
    }
}
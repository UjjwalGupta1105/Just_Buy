export const productReducer=(state={products:[]},action)=>{
     switch (action.type){
        case "ALL_PRODUCT_REQUEST":
            case "ADMIN_PRODUCT_REQUEST" :
            return{
                loading:true,
                products:[]
            };
            case "ALL_PRODUCT_SUCCESS":
                case "ADMIN_PRODUCT_SUCCESS" :
                return{
                    loading:false,
                    products:action.payload,
                    // productsCount:action.payload.productsCount,
            };
            case "ALL_PRODUCT_Fail":
                case "ADMIN_PRODUCT_FAIL" :
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

export const productDetailsReducer=(state={product:{}},action)=>{
    switch (action.type){
       case "PRODUCT_DETAILS_REQUEST":
           return{
               loading:true,
               ...state
           };
           case "PRODUCT_DETAILS_SUCCESS":
               return{
                   loading:false,
                   product:action.payload,
                   // productsCount:action.payload.productsCount,
           };
           case "PRODUCT_DETAILS_Fail":
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

export const newProductReducer=(state={product:{}},action)=>{
    switch (action.type){
       case "NEW_PRODUCT_REQUEST":
           return{
            ...state,
               loading:true 
           };
           case "NEW_PRODUCT_SUCCESS":
               return{
                   loading:false,
                   product:action.payload.product,
                   success:action.payload.product
           };
           case "NEW_PRODUCT_Fail":
                   return{
                    ...state,
                       loading:false,
                       error:action.payload
           };
           case "CLEAR_ERRORS":
               return{
                   ...state,
                   error:null
           };

           case "NEW_PRODUCT_RESET":
           return{
            ...state,
            success:false
           }
           default:
               return state;
    }
}
export const renewedProductReducer=(state={},action)=>{
    switch (action.type){
       case "DELETE_PRODUCT_REQUEST":
        case "UPDATE_PRODUCT_REQUEST":
           return{
            ...state,
               loading:true 
           };
           case "DELETE_PRODUCT_SUCCESS":
               return{
                ...state,
                   loading:false,
                   isDeleted:action.payload
           };

            case "UPDATE_PRODUCT_SUCCESS":
                return{
                    ...state,
                    loading:false,
                    isUpdated:action.payload
                }
           case "DELETE_PRODUCT_Fail":
            case "UPDATE_PRODUCT_Fail":
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

           case "DELETE_PRODUCT_RESET":
           return{
            ...state,
            isDeleted:false
           }
           case "UPDATE_PRODUCT_RESET":
            return{
             ...state,
             isUpdated:false
            }
           default:
               return state;
    }
}
export const productReviewsReducer=(state={reviews:[]},action)=>{
    switch (action.type){
       case "ALL_REVIEW_REQUEST":
           return{
               ...state,
               loading:true,
           };
           case "ALL_REVIEW_SUCCESS":
               return{
                   loading:false,
                   reviews:action.payload,
           };
           case "ALL_REVIEW_Fail":
                   return{
                       ...state,
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
export const reviewReducer=(state={},action)=>{
    switch (action.type){
       case "DELETE_REVIEW_REQUEST":
           return{
            ...state,
               loading:true,
           };
           case "DELETE_REVIEW_SUCCESS":
               return{
                   loading:false,
                   isDeleted:action.payload
           };
           case "DELETE_REVIEW_Fail":
                   return{
                    ...state,
                       loading:false,
                       error:action.payload
           };
           case "DELETE_REVIEW_RESET":
            return{
                ...state,
                loading:false,
                isDeleted:false
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

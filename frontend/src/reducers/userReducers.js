export const userReducer=(state={user:{}},action)=>{
    switch (action.type){
       case "LOGIN_REQUEST":
        case "SIGNUP_REQUEST":
        case "LOADUSER_REQUEST":

           return{
               loading:true,
               isAuthenticated:false,
           };
           case "LOGIN_SUCCESS":
            case "SIGNUP_SUCCESS":
               case "LOADUSER_SUCCESS":
               return{
                ...state,
                   loading:false,
                   isAuthenticated:true,
                   user:action.payload,
                   // productsCount:action.payload.productsCount,
           };
           case "LOGOUT_SUCCESS":
            return{
               ...state,
               loading:false,
               user:null,
               isAuthenticated:false,
            };
           case "LOGIN_FAIL":
            case "SIGNUP_FAIL":
                   return{
                    ...state,
                       loading:false,
                       isAuthenticated:false,
                       user:null,
                       error:action.payload,
           };
           case "LOADUSER_FAIL":
            return{
               ...state,
                       loading:false,
                       isAuthenticated:false,
                       user:null,
            }
           case "LOGOUT_FAIL":
            return{
               ...state,
               loading:false,
               error:action.payload
            };
           case "CLEAR_ERRORS":
               return{
                loading:false,
                   ...state,
                   error:null
           };
           default:
            return state;
    }
}
export const updateUserReducer=(state={user:{}},action)=>{
   switch (action.type){
      case "UPDATE_USER_REQUEST":
         case "UPDATE_PASSWORD_REQUEST":
            case "UPDATE_PROFILE_REQUEST":
            case "DELETE_PROFILE_REQUEST":
          return{
            ...state,
              loading:true,
          };
          case "UPDATE_USER_SUCCESS":
            case "UPDATE_PASSWORD_SUCCESS":
               case "UPDATE_PROFILE_SUCCESS":
              return{
               ...state,
               loading:false,
                  isUpdated:action.payload,
          };

          case "DELETE_PROFILE_SUCCESS":
            return{
               ...state,
               loading:false,
               isDeleted:action.payload
            }

          case "UPDATE_USER_FAIL":
            case "UPDATE_PASSWORD_FAIL":
               case "UPDATE_PROFILE_FAIL":
            case "DELETE_PROFILE_FAIL":

                  return{
                     loading: false,
                   ...state,
                      error:action.payload,
          };
          case "UPDATE_USER_RESET":
            case "UPDATE_PASSWORD_RESET":
               case "UPDATE_PROFILE_RESET":

           return{
                     ...state,
                      isUpdated:false,
           }
           case "DELETE_PROFILE_RESET":
              return{
              ...state,
              isDeleted:false,
           }

          case "CLEAR_ERRORS":
              return{
               loading:false,
                  ...state,
                  error:null
          };
          default:
           return state;
   }
}

export const forgotPasswordReducer=(state={},action)=>{
   switch (action.type){
         case "FORGOT_PASSWORD_REQUEST":
         case "RESET_PASSWORD_REQUEST":

          return{
            ...state,
              loading:true,
              error:null
          };

            case "FORGOT_PASSWORD_SUCCESS":
              return{
               ...state,
               loading:false,
               message:action.payload,
          };
          case "RESET_PASSWORD_SUCCESS":
            return{
             ...state,
             loading:false,
             success:action.payload,
        };
            case "FORGOT_PASSWORD_FAIL":
               case "RESET_PASSWORD_FAIL":
                  return{
                     ...state,
                     loading: false,
                      error:action.payload,
          };
          case "CLEAR_ERRORS":
              return{
               loading:false,
                  ...state,
                  error:null
          };
          default:
           return state;
   }
}


export const allUsersReducer=(state={users:[]},action)=>{
   switch (action.type){
         case "ALL_USERS_REQUEST":
          return{
            ...state,
              loading:true,
          };

            case "ALL_USERS_SUCCESS":
              return{
               ...state,
               loading:false,
               users:action.payload,
          };
               case "ALL_USERS_FAIL":
                  return{
                     ...state,
                     loading: false,
                      error:action.payload,
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
export const userDetailsReducer=(state={user:{}},action)=>{
   switch (action.type){
         case "USER_DETAILS_REQUEST":
          return{
            ...state,
              loading:true,
          };

            case "USER_DETAILS_SUCCESS":
              return{
               ...state,
               loading:false,
               user:action.payload,
          };
               case "USER_DETAILS_FAIL":
                  return{
                     ...state,
                     loading: false,
                      error:action.payload,
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

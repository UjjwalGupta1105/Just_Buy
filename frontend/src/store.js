import {combineReducers,applyMiddleware,compose} from 'redux'
import { configureStore} from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension"
import { productReducer,productDetailsReducer,newProductReducer,renewedProductReducer, productReviewsReducer, reviewReducer } from './reducers/productreducers';
import {userReducer,updateUserReducer,forgotPasswordReducer, userDetailsReducer, allUsersReducer} from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducer';
import {orderReducer,myOrderReducer,orderDetailsReducer,newReviewReducer, allOrdeReducer, adminOrderReducer} from "./reducers/orderReducer"

const reducer=combineReducers({
    products:productReducer,
    productDetails:productDetailsReducer,
    user:userReducer,
    profile:updateUserReducer,
    forgotPassword:forgotPasswordReducer ,
    cart:cartReducer,
    order:orderReducer,
    allMyorders:myOrderReducer,
    orderDetails:orderDetailsReducer,
    newReview:newReviewReducer,
    newProduct:newProductReducer,
    leftProduct:renewedProductReducer,
    allorders:allOrdeReducer,
    renewedOrder:adminOrderReducer,
    allUsers:allUsersReducer,
    userDetails:userDetailsReducer,
    productReviews:productReviewsReducer,
    review:reviewReducer,
});

const initialState={
//     cart:{
//         // cartItems:localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartitems")) :[]
//         cartItems:localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')):[] 
//     },
// }
}

const middleware=[require('redux-immutable-state-invariant').default(), thunk]
const store=configureStore(
    {reducer},
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
   {initialState},
    compose(applyMiddleware(...middleware)),
)

export default store
export {initialState}
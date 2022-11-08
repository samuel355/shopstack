import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productDetailsReducer, productListReducer } from './Reducers/ProductReducers';
import { cartReducer } from './Reducers/CartReducers';
import { registerUserReducer, userDetailsReducer, userLoginReducer, userUpdateProfileReducer } from './Reducers/UserReducers';
import { createOrderReducer, orderDetailsReducer } from './Reducers/OrderReducers';

const reducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer,
    cart : cartReducer,
    userLogin : userLoginReducer,
    registerUser : registerUserReducer,
    userDetails : userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    createOrder: createOrderReducer,
    orderDetails: orderDetailsReducer
});

//Get Cart Items in Local Storage
const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

//Get Cart Items in Local Storage
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

//Shipping Details
const shippingAddressInfoFromLocalStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const userDetailsFromLocalStorage = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : null

const initialState = {
    cart : {
        cartItems : cartItemsFromLocalStorage,
        shippingAddress : shippingAddressInfoFromLocalStorage
    },
    userLogin: {
        userInfo : userInfoFromLocalStorage 
    },
    userDetails: {
        userInfo : userDetailsFromLocalStorage
    },
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
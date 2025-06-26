import { configureStore } from "@reduxjs/toolkit";
import submissionReducer from '../Redux/submission'
import userReducer from '../Redux/user'
import contactReducer from '../Redux/contact'
import productReducer from '../Redux/product'
const store = configureStore({
    reducer:{
        user :userReducer,
        submmission :submissionReducer,
        contact: contactReducer,
         product: productReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;
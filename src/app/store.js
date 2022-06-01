import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice'
import userReducer from './userSlice'

const rootReducer = {
    auth: authReducer,
    user: userReducer
}

const store = configureStore({
    reducer: rootReducer
})

export default store
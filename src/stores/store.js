import {configureStore} from '@reduxjs/toolkit'
import authReducer from 'src/stores/authSlice'
import userReducer from 'src/stores/userSlice'

const rootReducer = {
    auth: authReducer,
    user: userReducer
}

const store = configureStore({
    reducer: rootReducer
})

export default store
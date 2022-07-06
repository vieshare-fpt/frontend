import {configureStore} from '@reduxjs/toolkit'
import authReducer from 'src/stores/authSlice'
import userReducer from 'src/stores/userSlice'
import packageReducer from 'src/stores/packageSlice'

const rootReducer = {
    auth: authReducer,
    user: userReducer,
    package: packageReducer,
}

const store = configureStore({
    reducer: rootReducer
})

export default store
import axios from 'axios';
import { loginFailure, loginStart, loginSuccess, registerFailure, registerSuccess } from './authSlice';
import { getUserInfoStart, getUserInfoFalse, getUserInfoSuccess } from './userSlice';

const instance = axios.create({
    baseURL: 'https://backend-vieshare-stg.vi-vu.vn/api'
});

export const getUserInfo = async (accessToken, dispatch) => {
    dispatch(getUserInfoStart());
    try {
        const response = await instance.get('/users/info', {
            headers:
            {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        dispatch(getUserInfoSuccess(response.data))
    } catch (error) {
        dispatch(getUserInfoFalse)
    }
}


export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await instance.post('/auth/login', user)
        dispatch(loginSuccess(res.data))
        getUserInfo(res.data.data.token, dispatch)
        navigate.push('/')
    } catch (err) {
        dispatch(loginFailure(err));
    }
}

export const registerUser = async (user, dispatch, navigate) => {
    try {
        await instance.post('/users/register', user)
        dispatch(registerSuccess())
        navigate.push('/login')
    } catch (err) {
        dispatch(registerFailure(err));
    }
}


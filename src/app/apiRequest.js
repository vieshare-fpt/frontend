import axios from 'axios';
import { loginFailure, loginStart, loginSuccess, registerFailure, registerSuccess } from './authSlice';
import { getCookieData, setCookie, setCookieData } from './cookies';
import {
    getUserInfoStart,
    getUserInfoFalse,
    getUserInfoSuccess,
    getUserInfoLimitStart,
    getUserInfoLimitSuccess,
    getUserInfoLimitFalse,
} from './userSlice';

const instance = axios.create({
    baseURL: 'https://backend-vieshare-stg.vi-vu.vn/api'
});

export const getUserInfo = async (config) => {

    const response = await instance.get('/users/info', config)
    dispatch(getUserInfoSuccess(response.data))

}


export const getUserInfoLimit = async (accessToken, dispatch) => {
    dispatch(getUserInfoLimitStart());
    try {
        const response = await instance.post('/auth/validate', {
            token: accessToken
        })

        dispatch(getUserInfoLimitSuccess(response.data))
    } catch (error) {
        dispatch(getUserInfoLimitFalse())
    }
}


export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await instance.post('/auth/login', user)
        const token = res.data.data.token
        const refreshToken = res.data.data.refreshToken

        if (typeof token === 'string' && typeof refreshToken === 'string') {
            setCookieData('token', token)
            setCookieData('refreshToken', refreshToken)
        }

        getUserInfoLimit(token, dispatch)
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

export const renewAccessToken = async (refreshToken) => {

    const response = await instance.post('/auth/token', {
        refreshToken: refreshToken
    })
    return response.data.data.token
}

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status === 401) {
            const refreshToken = getCookieData('refreshToken')
            if (refreshToken) {
                refreshTokenRequest =
                    refreshTokenRequest || renewAccessToken(refreshToken)
                const newToken = await refreshTokenRequest
                refreshTokenRequest = null

                const { config } = error
                config.headers.Authorization = `Bearer ${newToken}`
                setCookieData('token', newToken)

                return getUserInfo(config)
            }
        }

        return Promise.reject(error)
    },
)
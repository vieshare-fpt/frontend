import axios from 'axios';
import { loginFailure, loginStart, loginSuccess, registerFailure, registerSuccess } from 'src/stores/authSlice';
import { getCookieData, setCookie, setCookieData } from 'src/services/cookies';
import {
    getUserInfoStart,
    getUserInfoFalse,
    getUserInfoSuccess,
    getUserInfoLimitStart,
    getUserInfoLimitSuccess,
    getUserInfoLimitFalse,
} from 'src/stores/userSlice';

const instance = axios.create({
    baseURL: 'https://backend-vieshare-stg.vi-vu.vn/api'
});

export const loginUser = async (user, navigate) => {

    try {
        const res = await instance.post('/auth/login', user)
        const token = res.data.data.token
        const refreshToken = res.data.data.refreshToken

        if (typeof token === 'string' && typeof refreshToken === 'string') {
            setCookieData('token', token)
            setCookieData('refreshToken', refreshToken)
        }
        navigate.push('/')
    } catch (err) {
        console.log(err);
    }
}

export const googleUser = async (credential, navigate) => {
    try {
        const res = await instance.post('/auth/google', credential)
        const token = res.data.data.token
        const refreshToken = res.data.data.refreshToken

        if (typeof token === 'string' && typeof refreshToken === 'string') {
            setCookieData('token', token)
            setCookieData('refreshToken', refreshToken)
        }
        if (navigate) navigate.push('/')
        else {
            window.location.reload()
        }
    } catch (err) {
        console.log(err);
    }
}

export const userLogout = async (refreshToken, token) => {
    try {
        console.log(token);
        console.log(refreshToken);
        const webApiUrl = '/auth/logout'
        await instance.post(webApiUrl ,{refreshToken}, 
            { headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `} 
            }).then((res) => {
                console.log(res.data)
              })
              .catch((error) => {
                console.error(error)
              })
        
        window.location.reload()
    } catch (err) {
        console.log(err);
    }
}

export const requestUserInfoLimit = async (accessToken, dispatch) => {
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


export const registerUser = async (user, navigate) => {
    await instance.post('/users/register', user)
    navigate.push('/login')
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
import axios from 'axios';
import { getCookieData, setCookieData } from './cookies';

const axiosClient = axios.create({
    baseURL: 'https://backend-vieshare-stg.vi-vu.vn/api',
    "Content-Type": "application/json"
});

const renewAccessToken = async (refreshToken) => {
    const response = await axiosClient.post('/auth/token', {
        refreshToken: refreshToken
    })
    return response.data.token
}


axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config;
})


axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    console.log(response);
    return response;
}, (error) => {
    // Handle errors
    throw error;
});

// axiosClient.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         if (error.response.status === 401) {
//             const refreshToken = getCookieData('refreshToken')
//             if (refreshToken) {
//                 refreshTokenRequest =
//                     refreshTokenRequest || renewAccessToken(refreshToken)
//                 const newToken = await refreshTokenRequest
//                 refreshTokenRequest = null
                
//                 const { config } = error
//                 config.headers.Authorization = `Bearer ${newToken}`
//                 setCookieData('token', newToken)
//                 return getUserInfo(config)
//             }
//         }
//         return Promise.reject(error)
//     },
// )

export default axiosClient;


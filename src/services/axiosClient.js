import axios from 'axios';
import { getCookieData } from "src/services/cookies";

const axiosClient = axios.create({
    baseURL: 'https://backend-vieshare-stg.vi-vu.vn/api',
    "Content-Type": "application/json"
});




axiosClient.interceptors.request.use(async (config) => {
    const token = getCookieData("token");
    if (token) {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})


const refreshAccessToken = async () => {
    getCookieData('refreshToken')
    const response = await axiosClient.post('/auth/token', {
        refreshToken: refreshToken
    })
    return response.data.token
}

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    console.log(response);
    return response;
  }, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = await refreshAccessToken();            
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  });
export default axiosClient;


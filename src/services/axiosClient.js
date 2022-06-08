import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://backend-vieshare-stg.vi-vu.vn/api',
    headers: {
        'content-type': 'application/json',
    },
    // paramsSerializer: params => queryString.stringify(params),
});

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
export default axiosClient;
import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";

export const packageApi = {
    getAllPackages: () => {
        const url = '/packages/all'
        const token = getCookieData('token');
        console.log(token);
        if (!token) {
            return axiosClient.get(url)
        } 
        return axiosClient.get(url, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
    },
    getPackages: (params) => {
        const url = '/packages' 

        return axiosClient.get(url, {params});
    }
   
}
import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";

export const packageApi = {
    getAllPackages: () => {
        const url = '/packages/all'
        const token = getCookieData('token');

        console.log(token);


        if (!token) {
            return axiosClient().get(url)
        } 
        return axiosClient(token, refreshToken).get(url, {})
    },
    getPackages: (params) => {
        const url = '/packages' 
        const token = getCookieData('token');

        console.log(token);

        
        return axiosClient().get(url, params);
    }
   
}
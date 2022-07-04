import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";

export const postApi = {
 
    getPosts: (params) => {
     
        const url = '/posts'
        return axiosClient.get(url, {params})
    },
    getPostDetail: (id) => {
        const url = '/posts/' + id;
        const token = getCookieData('token')
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
   
}


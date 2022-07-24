import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";



export const adminApi = {
    getUsers(token, refreshToken) {
        try{
            return axiosClient(token, refreshToken).get("/users");
        }
        catch(err){
            console.log("error");
        };
    },

    userManage(id, params) {
        const token = getCookieData('token');
        const refreshToken = getCookieData('refreshToken');
        const url = "/users/" + id;
        return axiosClient(token, refreshToken).patch( url, params )  
    }
};

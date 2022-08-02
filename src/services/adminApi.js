import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";

export const adminApi = {
    getUsers(token, refreshToken) {
        try{
            const tokenT = token || getCookieData("token");
            const refreshTokenT = refreshToken || getCookieData("refreshToken");
            return axiosClient(tokenT, refreshTokenT).get("/users");
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

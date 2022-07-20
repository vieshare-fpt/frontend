import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";

const token = getCookieData('token');
const refreshToken = getCookieData('refreshToken');

export const adminApi = {
    getUsers() {
        return axiosClient(token, refreshToken).get("/users");
    },

    userManage(id, params) {
        const url = "/users/" + id;
        return axiosClient(token, refreshToken).patch( url, params )  
    }
};

import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";

export const subscriptionApi = {
    getSubscriptions: (params) => {
        const url = '/subscriptions';
        const token = getCookieData("token");
        const refreshToken = getCookieData("refreshToken");
        return axiosClient(token, refreshToken).get(url, { params });
    },
    
    createSubsciptions: (packageId) => {
        const url = '/subscriptions';
        const token = getCookieData("token");
        const refreshToken = getCookieData("refreshToken");
        return axiosClient(token).post(url, { packageId });
    }
};
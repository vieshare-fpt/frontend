import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";
import { infoUserApi } from "./infoUserApi";

export const subscriptionApi = {
    getSubscriptions: (params) => {
        const url = '/subscriptions';
        const token = getCookieData("token");
        const refreshToken = getCookieData("refreshToken");
        infoUserApi.infoDynamic(token,refreshToken)

        return axiosClient(token, refreshToken).get(url, { params });
    },
    
    createSubsciptions: (packageId) => {
        const url = '/subscriptions';
        const token = getCookieData("token");
        const refreshToken = getCookieData("refreshToken");
        infoUserApi.infoDynamic(token,refreshToken)

        return axiosClient(token, refreshToken).post(url, { packageId });
    }
};
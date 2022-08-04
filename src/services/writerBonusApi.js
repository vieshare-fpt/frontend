import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";

export const writerBonusApi = {
    getBonus: (token, refreshToken) => {
        const tokenT = token || getCookieData("token");
        const refreshTokenT = refreshToken || getCookieData("refreshToken");
        const url = "/bonus-statistics?order_by=from&sort=DESC&per_page=999999&page=1";
        return axiosClient(tokenT, refreshTokenT).get(url);
    },
    postBonus: (id, token, refreshToken) => {
        const tokenT = token || getCookieData("token");
        const refreshTokenT = refreshToken || getCookieData("refreshToken");
        const url = "/bonus-statistics/withdraw/" + id;
        return axiosClient(tokenT, refreshTokenT).post(url);
    }
};
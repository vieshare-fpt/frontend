import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";

// const token = getCookieData("token");
// const refreshToken = getCookieData("refreshToken");

export const writerBonusApi = {
    getBonus: (token, refreshToken) => {
        const tokenT = token || getCookieData("token");
        const refreshTokenT = refreshToken || getCookieData("refreshToken");
        const url = "/bonus-statistics";
        return axiosClient(tokenT, refreshTokenT).get(url);
    },
    postBonus: (id, token, refreshToken) => {
        const tokenT = token || getCookieData("token");
        const refreshTokenT = refreshToken || getCookieData("refreshToken");
        const url = "/bonus-statistics/withdraw/" + id;
        return axiosClient(tokenT, refreshTokenT).get(url);
    }
};
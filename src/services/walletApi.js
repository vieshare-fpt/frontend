import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";


export const walletApi = {
    getWallet: () => {
        const url = "/wallet/info";
        const token = getCookieData('token');
        const refreshToken = getCookieData('refreshToken');

        return axiosClient(token, refreshToken).get(url)
    },
    updateWallet: (params) => {
        const url = "/wallet/info";
        const token = getCookieData('token');
        const refreshToken = getCookieData('refreshToken');

        return axiosClient(token, refreshToken).patch(url, { params })

    }
}
import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";


export const transactionApi = {
    getTransaction: (params) => {
        const url = "/transaction";
        const token = getCookieData('token');
        const refreshToken = getCookieData('refreshToken');

        return axiosClient(token, refreshToken).get(url, {params});
    },
}
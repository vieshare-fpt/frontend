import { getUserInfoLimitFalse, getUserInfoLimitStart, getUserInfoLimitSuccess } from "src/stores/userSlice";
import axiosClient from "./axiosClient";
import { getCookieData, removeCookieData } from "src/services/cookies";
import axios from "axios";


export const infoUserApi = {
    validate(accessToken) {
        return axiosClient.post('/auth/validate', {
            token: accessToken
        })
    },
    info() {
        const token = getCookieData('token')
        return axiosClient.get('/users/info', {
            headers: {
                "Authorization": "Bearer " + token,
            },
        })
    }
}

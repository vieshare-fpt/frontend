import { getUserInfoLimitFalse, getUserInfoLimitStart, getUserInfoLimitSuccess } from "src/stores/userSlice";
import axiosClient from "./axiosClient";



export const infoUserApi = {
    validate(accessToken) {
        return axiosClient.post('/auth/validate', {
            token: accessToken
        })
    },
    info(accessToken) {
        return axiosClient.get('users/info', {
            headers: { 'Authorization': 'Bearer ' + accessToken }
        })
    }
}

import { getUserInfoLimitFalse, getUserInfoLimitStart, getUserInfoLimitSuccess } from "src/stores/userSlice";
import axiosClient from "./axiosClient";



export const infoUserApi = {
    validate(accessToken) {
        return axiosClient(accessToken).post('/auth/validate')
    },

    info(token,refreshToken) {
        return axiosClient(token, refreshToken).get('users/info')
    }
}

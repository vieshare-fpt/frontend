import { getCookieData } from "./cookies";
import axiosClient from "./axiosClient";

export const profileAPI = {
    updateUserInfo: (newInfoRequest) => {
        const token = getCookieData('token')
        return axiosClient.patch('/users/info', newInfoRequest,
            {
                headers:
                {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + token
                }
            }
        )
    },
    updatePassword: (newPasswordRequest) => {
        const token = getCookieData('token')
        return axiosClient.patch('/users/password', newPasswordRequest,
            {
                headers:
                {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + token
                }
            }
        )
    }
};


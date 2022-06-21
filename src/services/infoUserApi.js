import { getUserInfoLimitFalse, getUserInfoLimitStart, getUserInfoLimitSuccess } from "src/stores/userSlice";
import axiosClient from "./axiosClient";

export const requestUserInfoLimit = async (accessToken, dispatch) => {
    
    dispatch(getUserInfoLimitStart());
    try {
        const response = await axiosClient.post('/auth/validate', {
            token: accessToken
        })
        dispatch(getUserInfoLimitSuccess(response.data))
    } catch (error) {
        dispatch(getUserInfoLimitFalse())
    }
}

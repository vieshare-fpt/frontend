import store from "src/stores/store";
import { setUserInfoFailed, setUserInfoSuccess } from "src/stores/userSlice";
import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";

export const infoUserApi = {
  validate() {
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    return axiosClient(token, refreshToken).post("/auth/validate");
  },

  info() {
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    if (token && refreshToken) return axiosClient(token, refreshToken).get("/users/info");
    else return {data: null}
  },
  infoDynamic(token, refreshToken) {
    const { dispatch } = store;
    if (token && refreshToken) axiosClient(token, refreshToken)
    .get("/users/info")
    .then((response) => {
      dispatch(setUserInfoSuccess(response.data));
    })
    .catch((error) => {
      dispatch(setUserInfoFailed());
    });
    else dispatch(setUserInfoFailed());
  },
  infoId(id) {
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    return axiosClient(token, refreshToken).get(`/users/info/${id}`);
  },
};

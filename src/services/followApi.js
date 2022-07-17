import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";

export const followApi = {
  follow: (params) => {
    const url = "/follows";
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    return axiosClient(token,refreshToken).post(url, params);
  },
  unFollow: (params) => {
    const url = "/follows";
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    return axiosClient(token,refreshToken).delete(url, params);
  },
};

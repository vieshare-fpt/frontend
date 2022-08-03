import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";
import { infoUserApi } from "./infoUserApi";

export const followApi = {
  follow: (params) => {
    const url = "/follows";
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    infoUserApi.infoDynamic(token,refreshToken)

    return axiosClient(token, refreshToken).post(url, params);
  },
  unFollow: (params) => {
    const url = "/follows/" + params;
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    infoUserApi.infoDynamic(token,refreshToken)
    return axiosClient(token, refreshToken).delete(url);
  },
};

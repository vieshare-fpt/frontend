import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";
import { infoUserApi } from "./infoUserApi";

export const historyApi = {
  getHistory: () => {
    const url = "/history";
    const token = getCookieData('token');
    const refreshToken = getCookieData('refreshToken');
    infoUserApi.infoDynamic(token,refreshToken)

    return axiosClient(token, refreshToken).get(url);
  },
};


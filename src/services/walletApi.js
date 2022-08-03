import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";
import { infoUserApi } from "./infoUserApi";

export const walletApi = {
  getWallet: () => {
    const url = "/wallet/info";
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    infoUserApi.infoDynamic(token, refreshToken);

    return axiosClient(token, refreshToken).get(url);
  },
  updateWallet: (params) => {
    const url = "/wallet";
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    infoUserApi.infoDynamic(token, refreshToken);

    return axiosClient(token, refreshToken).patch(url, params);
  },
};

import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";

export const chartApi = {
  getTotal: () => {
    const url = "/charts/total";
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    return axiosClient(token, refreshToken).get(url);
  },
  getData: (params) => {
    console.log(params);
    const url = "/charts";
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    return axiosClient(token, refreshToken).get(url, {params});
  },
};

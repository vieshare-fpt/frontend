import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";

export const historyApi = {
  getHistory: () => {
    const url = "/history";
    const token = getCookieData('token');
    const refreshToken = getCookieData('refreshToken');
    return axiosClient(token, refreshToken).get(url);
  },
};


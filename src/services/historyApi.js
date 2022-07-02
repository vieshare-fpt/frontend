import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";

export const historyApi = {
  getHistory: () => {
    const token = getCookieData('token')
    const url = "/history";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token} `,
      },
    });
  },
};


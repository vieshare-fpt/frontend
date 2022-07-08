import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";

export const historyApi = {
  getHistory: () => {
    const url = "/history";
    return axiosClient().get(url);
  },
};


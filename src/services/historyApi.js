import axiosClient from "./axiosClient";

export const historyApi = {
  getHistory: (token, refreshToken) => {
    const url = "/history";
    return axiosClient(token, refreshToken).get(url);
  },
};


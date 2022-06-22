import axiosClient from "./axiosClient";

export const historyApi = {
  getHistory: (token) => {
    const url = "/history";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token} `,
      },
    });
  },
};


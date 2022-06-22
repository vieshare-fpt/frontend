import axiosClient from "./axiosClient";

const historyApi = {
  getHistory: (token) => {
    const url = "/history";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token} `,
      },
    });
  },
};

export default historyApi;

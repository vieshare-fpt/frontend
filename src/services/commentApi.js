import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";

export const commentApi = {
  //Comment Api
  postComments: (params) => {
    const url = "/comments";
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    return axiosClient(token, refreshToken).post(url, params);
  },
  getComments: (id, params) => {
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    const url = "/comments/post/" + id;
    return axiosClient(token, refreshToken).get(url, { params });
  },
  removeComments: (id) => {
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    const url = "/comments/" + id;
    return axiosClient(token, refreshToken).delete(url, id);
  },
};

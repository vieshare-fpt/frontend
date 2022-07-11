import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";

export const creatorApi = {
  createPost: (params) => {
    const url = "/posts";
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    return axiosClient(token,refreshToken).post(url, params);
  },
  editPost: (params) => {
    const url = "/posts";
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    return axiosClient(token,refreshToken).patch(url, params);
  },
};

import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";
const token = getCookieData('token');
const refreshToken = getCookieData('refreshToken');

export const creatorApi = {
  createPost: (params) => {
    const url = "/posts";
    return axiosClient(token, refreshToken).post(url, params);
  },
  editPost: (params) => {
    const url = "/posts";
    return axiosClient(token, refreshToken).patch(url, params);
  },
};

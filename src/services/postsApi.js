import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";

export const postApi = {
  getPosts: (params) => {
    const url = "/posts";
    return axiosClient.get(url, { params });
  },
  getPostDetail: (id) => {
    const url = "/posts/" + id;
    return axiosClient.get(url);
  },
  removePost: (id) => {
    const url = "/posts/" + id;
    return axiosClient.delete(url, { params })
  }
};

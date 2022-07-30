import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";
// const token = getCookieData("token");
// const refreshToken = getCookieData("refreshToken");
// console.log(token);
export const postApi = {
  getPosts: (params) => {
    const url = "/posts";
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    return axiosClient(token, refreshToken).get(url, { params });
  },
  getPostDetail: (id, token, refreshToken) => {
    const tokenT = token || getCookieData("token");
    const refreshTokenT = refreshToken || getCookieData("refreshToken");
    console.log(tokenT);
    const url = "/posts/" + id;
    return axiosClient(tokenT, refreshTokenT).get(url);
  },
  getPostsRelated: (id, params) => {
    const url = "/posts/related/" + id;
    return axiosClient().get(url, { params });
  },
  searchPosts: (params) => {
    const url = `/posts/search`;

    return axiosClient().get(url, {params});
  },
  removePost: (id) => {
    const url = "/posts/" + id;
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    return axiosClient(token, refreshToken).delete(url, { id });
  },
  getAvgRating: (id) => {
    const url = "/votes/average/post/" + id;
    return axiosClient().get(url);
  },
  postRatingScore: (params) => {
    const url = "/votes";
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    return axiosClient(token, refreshToken).post(url, params);
  },
  getRating: (id) => {
    const url = "/votes/post/" + id;
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    return axiosClient(token, refreshToken).get(url);
  },
};

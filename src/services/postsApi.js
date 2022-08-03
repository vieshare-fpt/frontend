import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";
// const token = getCookieData("token");
// const refreshToken = getCookieData("refreshToken");
// console.log(token);
export const postApi = {
  getPosts: (params, token, refreshToken) => {
    const tokenT = token || getCookieData("token");
    const refreshTokenT = refreshToken || getCookieData("refreshToken");
    const url = "/posts";
    return axiosClient(tokenT, refreshTokenT).get(url, { params });
  },
  getPostDetail: (id, token, refreshToken) => {
    const tokenT = token || getCookieData("token");
    const refreshTokenT = refreshToken || getCookieData("refreshToken");
    const url = "/posts/" + id;
    return axiosClient(tokenT, refreshTokenT).get(url, {});
  },
  getPostsRelated: (id, params, token, refreshToken) => {
    const tokenT = token || getCookieData("token");
    const refreshTokenT = refreshToken || getCookieData("refreshToken");
    const url = "/posts/related/" + id;
    return axiosClient(tokenT, refreshTokenT).get(url, { params });
  },
  searchPosts: (params, token, refreshToken) => {
    const tokenT = token || getCookieData("token");
    const refreshTokenT = refreshToken || getCookieData("refreshToken");
    const url = `/posts/search`;

    return axiosClient(tokenT, refreshTokenT).get(url, {params});
  },
  removePost: (id, token, refreshToken) => {
    const tokenT = token || getCookieData("token");
    const refreshTokenT = refreshToken || getCookieData("refreshToken");
    const url = "/posts/" + id;
    return axiosClient(tokenT, refreshTokenT).delete(url, { id });
  },
  getAvgRating: (id, token, refreshToken) => {
    const tokenT = token || getCookieData("token");
    const refreshTokenT = refreshToken || getCookieData("refreshToken");
    const url = "/votes/average/post/" + id;
    return axiosClient(tokenT, refreshTokenT).get(url);
  },
  postRatingScore: (params, token, refreshToken) => {
    const tokenT = token || getCookieData("token");
    const refreshTokenT = refreshToken || getCookieData("refreshToken");
    const url = "/votes";
    return axiosClient(tokenT, refreshTokenT).post(url, params);
  },
  getRating: (id, token, refreshToken) => {
    const tokenT = token || getCookieData("token");
    const refreshTokenT = refreshToken || getCookieData("refreshToken");
    const url = "/votes/post/" + id;
    return axiosClient(tokenT, refreshTokenT).get(url);
  },
};

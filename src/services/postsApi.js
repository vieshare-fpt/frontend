import axiosClient from "./axiosClient";

export const postApi = {
  getPosts: (params) => {
    const url = "/posts";
    return axiosClient().get(url, { params });
  },
  getPostDetail: (id, token, refreshToken) => {
    const url = "/posts/" + id;
    return axiosClient(token, refreshToken).get(url);
  },
  getPostsRelated: (id, params) => {
    const url = "/posts/related/" + id;
    return axiosClient().get(url, { params });
  },
  searchPosts: (params) => {
    const url = `/posts/search`;
    return axiosClient().get(url, params);
  },
  removePost: (id) => {
    const url = "/posts/" + id;
    return axiosClient().delete(url, { id });
  },
};

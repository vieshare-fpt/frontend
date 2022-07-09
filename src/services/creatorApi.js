import axiosClient from "./axiosClient";

export const creatorApi = {
  createPost: (params) => {
    const url = "/posts";

    return axiosClient().post(url, params);
  },
  editPost: (params) => {
    const url = "/posts";
    return axiosClient().patch(url, params);
  },
};

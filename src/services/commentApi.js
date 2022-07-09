import axiosClient from "./axiosClient";

export const commentApi = {
  //Comment Api
  postComments: (params) => {
    const url = "/comments";
    console.log(params);

    return axiosClient().post(url, params);
  },
  getComments: (id, params) => {
    const url = "/comments/post/" + id;
    return axiosClient().get(url, { params });
  },
  removeComments: (id) => {
    const url = "/comments/" + id;
    return axiosClient().delete(url, id);
  },
};

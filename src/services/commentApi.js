import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";
import { infoUserApi } from "./infoUserApi";

export const commentApi = {
  //Comment Api
  postComments: (params) => {
    const url = "/comments";
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    infoUserApi.infoDynamic(token,refreshToken)

    return axiosClient(token, refreshToken).post(url, params);
  },
  getComments: (id, params) => {
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    const url = "/comments/post/" + id;
    infoUserApi.infoDynamic(token,refreshToken)

    return axiosClient(token, refreshToken).get(url, { params });
  },
  removeComments: (id) => {
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    const url = "/comments/" + id;
    infoUserApi.infoDynamic(token,refreshToken)
    return axiosClient(token, refreshToken).delete(url, id);
  },
};

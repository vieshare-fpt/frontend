import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";
import { infoUserApi } from "./infoUserApi";

export const coverLetterApi = {
  sendCoverLetter: (params) => {
    const url = "/cover-letter";
    const token = getCookieData('token');
    const refreshToken = getCookieData('refreshToken');
    infoUserApi.infoDynamic(token,refreshToken)
    return axiosClient(token, refreshToken).post(url, params);
  },
  getAllCoverLetter: () => {
    const url = "/cover-letter/all";
    const token = getCookieData('token');
    const refreshToken = getCookieData('refreshToken');
    infoUserApi.infoDynamic(token,refreshToken)
    return axiosClient(token, refreshToken).get(url);
  },
  verifyCoverLetter: (params) => {
    console.log(params);
    const url = "/cover-letter";
    const token = getCookieData('token');
    const refreshToken = getCookieData('refreshToken');
    infoUserApi.infoDynamic(token,refreshToken)
    return axiosClient(token, refreshToken).patch(url, params);
  },
};


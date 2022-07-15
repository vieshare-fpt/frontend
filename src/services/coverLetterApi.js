import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";

export const coverLetterApi = {
  sendCoverLetter: (params) => {
    const url = "/cover-letter";
    const token = getCookieData('token');
    const refreshToken = getCookieData('refreshToken');
    return axiosClient(token, refreshToken).post(url, params);
  },
};


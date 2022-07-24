import axiosClient from "./axiosClient";
import { getCookieData } from "./cookies";

export const infoUserApi = {
  validate() {
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    return axiosClient(token, refreshToken).post("/auth/validate");
  },

  info() {
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    return axiosClient(token, refreshToken).get("/users/info");
  },
  infoId(id) {
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    return axiosClient(token,refreshToken).get(`/users/info/${id}`);
  },
};

import { getCookieData } from "./cookies";
import axiosClient from "./axiosClient";
import axios from "axios";

export const profileAPI = {
  uploadImage: (fileInput) => {
    const formData = new FormData();
    formData.append("image", fileInput);

    const url = axios
      .post(
        "https://api.imgbb.com/1/upload?key=2e169ad3ef7f3738356150019b3adfbc",
        formData
      )
      .then((res) => {
        return res.data.data.url;
      })
      .catch((error) => {
        return null;
      });
    return url;
  },
  updateAvatar: (avatar) => {
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    return axiosClient(token, refreshToken).patch("/users/avatar", { avatar });
  },
  updateUserInfo: (newInfoRequest) => {
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    return axiosClient(token,refreshToken).patch("/users/info", newInfoRequest);
  },
  updatePassword: (newPasswordRequest) => {
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    return axiosClient(token,refreshToken).patch("/users/password", newPasswordRequest);
  },
};

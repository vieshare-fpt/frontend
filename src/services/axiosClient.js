import axios from "axios";
import { getCookieData, setCookieData } from "src/services/cookies";

const axiosClient = axios.create({
  baseURL: "https://backend-vieshare-stg.vi-vu.vn/api",
  "Content-Type": "application/json",
});

axiosClient.interceptors.request.use(async (config) => {
  const token = getCookieData("token");
  if (token) {
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const refreshAccessToken = async (refreshToken) => {
  const response = await axiosClient.post("/auth/token", {
    refreshToken: refreshToken,
  });
  return response.data.token;
};
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  async (error) => {
    // Handle errors
    const config = error?.config;

    const message = error.response.data.message;
    if (message !== "Token invalid or expired.") {
      throw error;
    }
    if (error?.response?.status === 401) {
      const refreshToken = getCookieData("refreshToken");
      if (refreshToken) {
        let result = result || refreshAccessToken(refreshToken);
        const newToken = await result;
        result = null;
        config.headers.Authorization = `Bearer ${newToken}`;
        setCookieData("token", newToken);
        return axiosClient(config);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;

import axios from "axios";
import { removeCookieData, setCookieData } from "src/services/cookies";
import { setCurrentCategory } from "src/stores/categorySlice";
import store from "src/stores/store";
import { setTab } from "src/stores/tabSlice";
import { clearInfoSuccess } from "src/stores/userSlice";

const axiosClient = (token, refreshToken) => {
  const axiosClient = axios.create({
    baseURL: "https://backend-vieshare-stg.vi-vu.vn/api",
    // baseURL: "http://localhost:8081/api/",
    "Content-Type": "application/json",
  });

  axiosClient.interceptors.request.use(async (config) => {
    if (token) {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      config.headers.common = { Authorization: `Bearer ${token}` };
    }
    return config;
  });

  const refreshAccessToken = async (refreshToken) => {
    let token = null;
    await axiosClient
      .post("/auth/token", {
        refreshToken: refreshToken,
      })
      .then((response) => {
        token = response.data.token;
      })
      .catch((error) => {
        token = null;
      });
    return token;
  };
  axiosClient.interceptors.response.use(
    (response) => {
      if (response && response.data) {
        return response.data;
      }
      return response;
    },
    async (error) => {
      const { dispatch } = store;

      // Handle errors
      const config = error?.config;

      const message = error.response?.data?.statusCode;
      if (message !== "INVALID_CREDENTIALS") {
        throw error;
      }
      if (error?.response?.status === 401 || error?.response?.status === 400) {
        if (refreshToken) {
          let result = refreshAccessToken(refreshToken);
          const newToken = await result;
          result = null;
          if (newToken != null) {
            setCookieData("token", newToken);
            config.headers.Authorization = `Bearer ${newToken}`;
          } else {
            if (typeof window !== "undefined") {
              dispatch(clearInfoSuccess());
              dispatch(setCurrentCategory(null));
              dispatch(setTab("information"));
              removeCookieData("token");
              removeCookieData("refreshToken");
              window.location.replace("/login");
            } else {
              return null
            }
          }

          return axiosClient(config);
        }
      }
      return Promise.reject(error);
    }
  );
  return axiosClient;
};

export default axiosClient;

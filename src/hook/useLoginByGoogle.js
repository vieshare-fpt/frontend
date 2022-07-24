import { useGoogleOneTapLogin } from "@react-oauth/google";
import { accessApi, infoUserApi } from "src/services";
import { getCookieData, setCookieData } from "src/services/cookies";

import { setUserInfoFailed, setUserInfoSuccess } from "src/stores/userSlice";

export default function useLoginByGoogle(dispatch) {
    function getInfoUser() {
        (async () => {
          await infoUserApi
            .info()
            .then((response) => {
              dispatch(setUserInfoSuccess(response.data));
            })
            .catch(function (error) {
              dispatch(setUserInfoFailed());
            });
        })();
      }
      if (!getCookieData("token")) {
        useGoogleOneTapLogin({
          onSuccess: (response) => {
            const user = {
              credential: response.credential,
            };
            (async () => {
              await accessApi
                .loginByGoogle(user)
                .then(function (response) {
                  const token = response.data.token;
                  const refreshToken = response.data.refreshToken;
                  setCookieData("token", token);
                  setCookieData("refreshToken", refreshToken);
                  getInfoUser(token, refreshToken);
                })
                .catch(function (error) {
                  console.log(error.response.status); // 401
                });
            })();
          },
        });
      }
}


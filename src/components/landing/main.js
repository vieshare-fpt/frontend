import { Box } from "@mui/material";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import React from "react";
import { CategoryBar } from "./components";
import { useDispatch } from "react-redux";
import { accessApi, infoUserApi } from "src/services";
import { getCookieData, setCookieData } from "src/services/cookies";
import { setUserInfoFailed, setUserInfoSuccess } from "src/stores/userSlice";
export default function Main(props) {
  const { prop, CurrentComponent } = props;
  const { categories } = prop;
  const dispatch = useDispatch();
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
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          zIndex: 2,
          marginTop: { xs: "40px", sm: "40px", md: "40px" },
        }}
      >
        <CategoryBar categories={categories} />
      </Box>
      <CurrentComponent props={prop} />
    </div>
  );
}

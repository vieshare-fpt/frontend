import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  ENTER_YOUR_EMAIL_VALIDATION,
  ENTER_VALID_EMAIL,
  EMAIL_REQUIRED,
  ENTER_PASSWORD_VALIDATION,
  PASSWORD_REQUIRED,
} from "src/locales/errors";
import { accessApi, infoUserApi } from "src/services";
import Page from "../src/components/login/main";
import { setCookieData } from "src/services/cookies";
import { useRouter } from "next/router";
import { setUserInfoFailed, setUserInfoSuccess } from "src/stores/userSlice";
import { useDispatch } from "react-redux";
import catchError from "src/utils/catchError";

const validationSchema = yup.object({
  email: yup
    .string(ENTER_YOUR_EMAIL_VALIDATION)
    .email(ENTER_VALID_EMAIL)
    .required(EMAIL_REQUIRED),
  password: yup.string(ENTER_PASSWORD_VALIDATION).required(PASSWORD_REQUIRED),
});

export default function LoginPage() {
  const [error, setError] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  function getInfoUser() {
    (async () => {
      await infoUserApi
        .info()
        .then((response) => {
          dispatch(setUserInfoSuccess(response.data));
          router.push("/");
        })
        .catch(function (error) {
          dispatch(setUserInfoFailed());
          catchError(error, dispatch, router)
        });
    })();
  }

  const handleLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const user = {
        email: values.email,
        password: values.password,
      };
      (async () => {
        await accessApi
          .login(user)
          .then(function (response) {
            const token = response.data.token;
            const refreshToken = response.data.refreshToken;
            setCookieData("token", token);
            setCookieData("refreshToken", refreshToken);
            getInfoUser();
          })
          .catch(function (error) {
            console.log(error.response.status); // 401
            if (error.response.status == 401) {
              setError(true);
            }
          });
      })();
    },
  });

  const handleLoginByGoogle = (response) => {
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
          if (error.response.status == 401) {
            setError(true);
          }
        });
    })();
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return (
    <>
      <Page
        CurrentComponent={{
          handleLogin,
          handleLoginByGoogle,
          handleError,
          error,
        }}
      />
    </>
  );
}

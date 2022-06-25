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
import { accessApi } from "src/services";
import Page from "../src/components/login/main";
import { setCookieData } from "src/services/cookies";
import { useRouter } from "next/router";

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
            setCookieData("token", response.data.token);
            setCookieData("refreshToken", response.data.refreshToken);
            router.push("/")
          })
          .catch(function (error) {
            console.log(error.response.status); // 401
            if (error.response.status == 401) {
              setError(true);
            }
          })
      })();
    },
  });

  const handleLoginByGoogle = (response) => {
    const user = {
      credential: response.credential,
    };
    (async () => {
      await accessAPI
        .loginByGoogle(user)
        .then(function (response) {
          setCookieData("token", response.data.token);
          setCookieData("refreshToken", response.data.refreshToken);

          router.push("/");
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
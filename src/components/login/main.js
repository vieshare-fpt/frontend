import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import React from "react";
import styles from "src/styles/Logo.module.css";
import * as yup from "yup";
import { useFormik } from "formik";
import LoginStyles from "src/styles/Login.module.css";
import {
  ENTER_YOUR_EMAIL_VALIDATION,
  ENTER_VALID_EMAIL,
  EMAIL_REQUIRED,
  ENTER_PASSWORD_VALIDATION,
  MIN_PASSWORD,
  PASSWORD_REQUIRED,
} from "src/locales/errors";
import { GoogleLogin } from "@react-oauth/google";
import { accessApi } from "src/services";
import { FormLogin } from "src/components/login";

export default function LoginComponent({ CurrentComponent }) {
  const { loading, handleLogin, handleLoginByGoogle, handleError, error } =
    CurrentComponent;
  return (
    <div className={LoginStyles.setBackground}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar> */}
          <Link href="/">
            <a className={styles.logo}>VieShare</a>
          </Link>

          <div className={LoginStyles.form}>
            <Typography component="h1" variant="h5">
              Đăng Nhập
            </Typography>

            <FormLogin formik={handleLogin} onError={error} loading={loading}/>

            <Grid container>
              <Grid item xs={12}>
                <Link href="/register-user" variant="body2">
                  <a>Chưa có tài khoản? Đăng ký ngay</a>
                </Link>
              </Grid>
            </Grid>

            <hr style={{ width: 370, marginBottom: 10 }} />
            <GoogleLogin
              onSuccess={handleLoginByGoogle}
              onError={handleError}
            />
          </div>
        </Box>
      </Container>
    </div>
  );
}

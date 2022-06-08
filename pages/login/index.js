import { Container, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import React from 'react'
import FormLogin from 'src/components/login/FormLogin'
import styles from 'src/styles/Logo.module.css'
import * as yup from 'yup';
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { loginUser, googleUser } from 'src/services/apiRequest'
import LoginStyles from 'src/styles/Login.module.css'
import GoogleLogin from 'src/components/login/GoogleLogin'
import { ENTER_YOUR_EMAIL_VALIDATION, ENTER_VALID_EMAIL, EMAIL_REQUIRED, 
ENTER_PASSWORD_VALIDATION, MIN_PASSWORD, PASSWORD_REQUIRED 
} from 'src/locales/errors'

const validationSchema = yup.object({
  email: yup
    .string(ENTER_YOUR_EMAIL_VALIDATION)
    .email(ENTER_VALID_EMAIL)
    .required(EMAIL_REQUIRED),
  password: yup
    .string(ENTER_PASSWORD_VALIDATION)
    .min(7, MIN_PASSWORD)
    .required(PASSWORD_REQUIRED),
});

export default function loginPage() {
  const useNavigate = useRouter();
  const useFormikHook = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newUser = {
        email: values.email,
        password: values.password,
      }
      loginUser(newUser, useNavigate)
    },
  });
  
  return (

    <div className={LoginStyles.setBackground}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar> */}
          <p className={styles.logo}>
            <Link href='/'>
              VieShare
            </Link>
          </p>
          <div className={LoginStyles.form}>
            <Typography component="h1" variant="h5">
              Đăng Nhập
            </Typography>
            <FormLogin formik={useFormikHook} />
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Quên mật khẩu?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Chưa có tài khản? Đăng ký"}
                </Link>
              </Grid>
            </Grid>
            <hr/>
            Hoặc
            <GoogleLogin/>
          </div>
        </Box>
      </Container>
    </div>
  )
}

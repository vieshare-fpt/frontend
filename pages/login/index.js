import { Container, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import React from 'react'
import FormLogin from 'src/components/login/formLogin'
import styles from 'src/styles/Logo.module.css'
import * as yup from 'yup';
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { useRouter } from 'next/router';
import { loginUser } from 'src/services/apiRequest'


const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(7, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
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
        <Typography component="h1" variant="h5">
          Đăng Nhập
        </Typography>
        <FormLogin formik={useFormikHook} />
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>

    </Container>
  )
}

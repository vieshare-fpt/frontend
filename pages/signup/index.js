import * as React from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useFormik } from 'formik';
import Link from 'next/link'
import FormRegistration from 'src/components/signup/FormRegistration';
import * as yup from 'yup';
import YupPassword from 'yup-password'
import formatDate from 'src/utils/FormatDateHelper.js'
import { registerUser } from 'src/services/apiRequest';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

YupPassword(yup)

const validationSchema = yup.object({
  fullname: yup
    .string('Nhập họ và tên')
    .required('Yêu cầu nhập tên'),
  phone: yup
    .string('Nhập số điện thoại của bạn')
    .min(10, 'Số điện thoại không hợp lệ')
    .required('Yêu cầu nhập số điện thoại'),
  email: yup
    .string('Nhập email của bạn')
    .email('Email không hợp lệ')
    .required('Yêu cầu nhập email'),
  password: yup
    .string('Nhập mật khẩu')
    .minSymbols(1, 'Mật khẩu ít nhất 1 kí tự đặc biệt')
    .minUppercase(1, 'Mật khẩu ít nhất 1 kí tự viết hoa')
    .minNumbers(1, 'Mật khẩu ít nhất có một con số')
    .min(7, "Mật khẩu ít nhất 7 kí tự")
    .required('Yêu cầu mật khẩu'),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Xác nhận mật khẩu không hợp lệ'),

});


export default function signUp() {
  const dispatch = useDispatch()
  const navigate = useRouter()
  const [dob, setDob] = React.useState(new Date())
  const [avatar, setAvatar] = React.useState('')
  React.useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview)
    }
  }, [avatar])

  function handleAvatar(e) {
    const file = e.target.files[0]
    const formdata = new FormData()
    formdata.append('image', file)
    setAvatar(file)
  }


  const formik = useFormik({
    initialValues: {
      fullname: '',
      gender: 'other',
      phone: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newUser = {
        name: values.fullname,
        dob: formatDate(dob),
        gender: values.gender,
        phone: values.phone,
        email: values.email,
        password: values.password,
        avatar: avatar,

      }
      registerUser(newUser, navigate, dispatch)
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

        <Typography component="h1" variant="h5">
          Đăng ký
        </Typography>
        {/* <FormRegistration/> */}
        <form onSubmit={formik.handleSubmit} noValidate>
          <FormRegistration formik={formik} dob={dob} setDob={setDob} avatar={avatar} handleAvatar={handleAvatar} />
        </form>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

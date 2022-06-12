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
import SignupStyle from 'src/styles/Signup.module.css'
import styles from 'src/styles/Logo.module.css'
import { ENTER_YOUR_NAME, NAME_REQUIRED, ENTER_PHONENUMBER, MIN_LENGHT_PHONENUMBER,
  PHONENUMBER_REQUIRED, ENTER_YOUR_EMAIL_VALIDATION, ENTER_VALID_EMAIL, EMAIL_REQUIRED, 
  ENTER_PASSWORD_VALIDATION, MIN_PASSWORD, PASSWORD_REQUIRED, MIN_UPPERCASE, MIN_NUMBERS, 
  MIN_SYMBOLS, PASSWORD_CONFIRM_FAILED} from 'src/locales/errors'


YupPassword(yup)

const validationSchema = yup.object({
  fullname: yup
    .string(ENTER_YOUR_NAME)
    .required(NAME_REQUIRED),
  phone: yup
    .string(ENTER_PHONENUMBER)
    .min(10, MIN_LENGHT_PHONENUMBER)
    .required(PHONENUMBER_REQUIRED),
  email: yup
    .string(ENTER_YOUR_EMAIL_VALIDATION)
    .email(ENTER_VALID_EMAIL)
    .required(EMAIL_REQUIRED),
  password: yup
    .string(ENTER_PASSWORD_VALIDATION)
    .minSymbols(1, MIN_SYMBOLS)
    .minUppercase(1, MIN_UPPERCASE)
    .minNumbers(1, MIN_NUMBERS)
    .min(7, MIN_PASSWORD)
    .required(PASSWORD_REQUIRED),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], PASSWORD_CONFIRM_FAILED),

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
    <div className={SignupStyle.setBackground}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <p className={styles.logo}>
            <Link href='/'>
              VieShare
            </Link>
          </p>
          <div className={SignupStyle.form}>
            <Typography sx={{ mb: 2 }} component="h1" variant="h5">
              Đăng ký
            </Typography>
            {/* <FormRegistration/> */}
            <form onSubmit={formik.handleSubmit} noValidate>
              <FormRegistration formik={formik} dob={dob} setDob={setDob} avatar={avatar} handleAvatar={handleAvatar} />
            </form>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/login" variant="body2">
                  Đã có tài khoản? Đăng nhập
                </Link>
              </Grid>
            </Grid>
          </div>
        </Box>
      </Container>
    </div>
  );
}

import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card, LinearProgress, Toolbar } from "@mui/material";
import styles from "src/styles/Contact.module.css";
import { MainLayout } from "src/components/layouts";
import emailjs from "@emailjs/browser";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  EMAIL_REQUIRED,
  ENTER_PHONENUMBER,
  ENTER_VALID_EMAIL,
  ENTER_YOUR_EMAIL_VALIDATION,
  ENTER_YOUR_MESSAGE,
  ENTER_YOUR_NAME,
  ENTER_YOUR_TITLE_VALIDATION,
  MESSAGE_REQUIRED,
  MIN_LENGHT_PHONENUMBER,
  NAME_REQUIRED,
  PHONENUMBER_REQUIRED,
  TITLE_REQUIRED,
} from "src/locales/errors";

const theme = createTheme();
const validationSchema = yup.object({
  fullname: yup.string(ENTER_YOUR_NAME).required(NAME_REQUIRED),
  subject: yup.string(ENTER_YOUR_TITLE_VALIDATION).required(TITLE_REQUIRED),
  phone: yup
    .string(ENTER_PHONENUMBER)
    .min(10, MIN_LENGHT_PHONENUMBER)
    .required(PHONENUMBER_REQUIRED),
  message: yup.string(ENTER_YOUR_MESSAGE).required(MESSAGE_REQUIRED),
  email: yup
    .string(ENTER_YOUR_EMAIL_VALIDATION)
    .email(ENTER_VALID_EMAIL)
    .required(EMAIL_REQUIRED),
});

export default function Contact() {
  const [sendSuccess, setSendSuccess] = useState(false);

  const router = useRouter();
  const user = useSelector(
    (state) => state.persistedReducer.user.currentUserInfoFull.userInfo
  );
  const formik = useFormik({
    initialValues: {
      fullname: "",
      subject: "",
      phone: "",
      message: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // emailjs
      //   .send(
      //     "service_5dk3h8h",
      //     "template_d9y3dqq",
      //     values,
      //     "lkpWgIxYPz1foBwIm"
      //   )
      //   .then(
      //     (result) => {
      //       console.log(result);
      //       setSendSuccess(true);
      //     },
      //     (error) => {
      //       console.log(error.text);
      //     }
      //   );
    },
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    emailjs
      .send(
        "service_5dk3h8h",
        "template_d9y3dqq",
        {
          fullname: user ? user.name : data.get("fullname"),
          subject: data.get("subject"),
          phone: user ? user.phone : data.get("phone"),
          message: data.get("message"),
          email: user ? user.email : data.get("email"),
        },
        "lkpWgIxYPz1foBwIm"
      )
      .then(
        (result) => {
          console.log(result);
          setSendSuccess(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
    event.target.reset();
  };
  const ContactForm = (
    <Card
      sx={{
        width: "100%",
        padding: "20px 20px !important",
        borderRadius: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ mt: 1, textAlign: "center" }}>
          <Typography variant="h2" sx={{ fontSize: 40 }}>
            Li??n h??? ch??ng t??i
          </Typography>
          <Typography component="p" sx={{ py: 2 }}>
            Ch??ng t??i lu??n s???n s??ng h??? tr???, d?? b???n ??? b???t c??? n??i ????u!
          </Typography>
        </Box>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                color="success"
                required
                fullWidth
                id="fullname"
                label="H??? v?? t??n"
                name="fullname"
                autoComplete="name"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                error={
                  formik.touched.fullname && Boolean(formik.errors.fullname)
                }
                helperText={formik.touched.fullname && formik.errors.fullname}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                color="success"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="success"
                required
                fullWidth
                id="phone"
                label="S??? ??i???n tho???i"
                name="phone"
                autoComplete="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                color="success"
                required
                fullWidth
                id="subject"
                name="subject"
                label="Ti??u ?????"
                value={formik.values.subject}
                onChange={formik.handleChange}
                error={formik.touched.subject && Boolean(formik.errors.subject)}
                helperText={formik.touched.subject && formik.errors.subject}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                color="success"
                id="message"
                name="message"
                label="Tin nh???n"
                multiline
                rows={4}
                value={formik.values.message}
                onChange={formik.handleChange}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
              />
            </Grid>
          </Grid>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              color="success"
              variant="contained"
              sx={{ mt: 3, mb: 2, textTransform: "none" }}
            >
              G???i
            </Button>
          </div>
        </Box>
      </Box>
    </Card>
  );
  function SendSuccess() {
    return (
      <div className={styles.paddingTop}>
        <div className={styles.flexCenter}>
          <CheckCircleOutlineOutlinedIcon
            sx={{ width: "20%", height: "30%" }}
            color="success"
          />
        </div>
        <p className={styles.text}>
          &ldquo;???? g???i th??nh c??ng ! Ch??ng t??i s??? c??? g???ng li???n h??? v???i b???n s???m
          nh???t !&ldquo;
        </p>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => router.push("/")}
            variant="outlined"
            color="success"
          >
            Tr??? l???i trang ch???
          </Button>
        </Box>
      </div>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg" sx={{ minHeight: "100vh" }}>
        <CssBaseline />
        <Toolbar />

        {sendSuccess ? (
          <SendSuccess />
        ) : (
          <Grid container className={styles.container}>
            <Grid item md={6} order={{ xs: 2, md: 1 }}>
              {ContactForm}
            </Grid>
            <Grid item md={6} order={{ xs: 1, md: 2 }}>
              <div className={styles.paddingTop}>
                <div className={styles.flexCenter}>
                  <ContactSupportOutlinedIcon
                    sx={{ width: "50%", height: "50%" }}
                  />
                </div>
                <h3 className={styles.text}>
                  ????? ???????c h??? tr??? nhanh h??n, vui l??ng g???i y??u c???u c???a b???n qua
                  bi???u m???u sau.
                </h3>
              </div>
            </Grid>
          </Grid>
        )}
      </Container>
    </ThemeProvider>
  );
}

Contact.getLayout = MainLayout;

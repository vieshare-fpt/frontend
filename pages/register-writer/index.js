import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card, Toolbar } from "@mui/material";
import styles from "src/styles/Contact.module.css";
import { MainLayout } from "src/components/layouts";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import { useRouter } from "next/router";
import { green } from "@mui/material/colors";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  CONTENT_REQUIRED,
  ENTER_YOUR_CONTENT_VALIDATION,
  ENTER_YOUR_TITLE_VALIDATION,
  TITLE_REQUIRED,
} from "src/locales/errors";
import { coverLetterApi } from "src/services";
import { useSelector } from "react-redux";

const theme = createTheme();
const validationSchema = yup.object({
  title: yup.string(ENTER_YOUR_TITLE_VALIDATION).required(TITLE_REQUIRED),
  content: yup.string(ENTER_YOUR_CONTENT_VALIDATION).required(CONTENT_REQUIRED),
});
export default function RegisterWriter() {
  const [sendSuccess, setSendSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [otherError, setOtherError] = useState(false);
  const router = useRouter();
  const user = useSelector(
    (state) => state.persistedReducer.user.currentUserInfoFull.userInfo
  );
  const formik = useFormik({
    initialValues: {
      positionApply: "Author",
      title: "",
      content: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!user) {
        alert("Vui lòng đăng nhập !!!");
      } else {
        (async () => {
          await coverLetterApi
            .sendCoverLetter(values)
            .then((response) => {
              console.log(response);
              setSendSuccess(true);
            })
            .catch((error) => {
              const message = error.response?.data?.statusCode;
              console.log(error);
              switch (message) {
                case "PREVIOUS_COVER_LETTER_NOT_PROCESSED":
                  setError(true);
                  break;
                case "UNEXPECTED":
                  setOtherError(true);
                  break;
                default:
                  break;
              }
            });
        })();
      }
    },
  });
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
            Trở thành tác giả
          </Typography>
          <Typography component="p" sx={{ py: 2 }}>
            Chúng tôi rất vui khi đồng hành cùng bạn !!
          </Typography>
        </Box>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                color="success"
                required
                fullWidth
                id="title"
                name="title"
                label="Tiêu đề"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                color="success"
                id="content"
                name="content"
                label="Nội dung"
                value={formik.values.content}
                onChange={formik.handleChange}
                error={formik.touched.content && Boolean(formik.errors.content)}
                helperText={formik.touched.content && formik.errors.content}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              {error && (
                <Typography variant="h7" color="error">
                  Đơn của bạn đã được gửi, xin vui lòng chờ phản hồi.
                </Typography>
              )}
              {otherError && (
                <Typography variant="h7" color="error">
                  Hình như bạn đã gửi yêu cầu trước đó, xin vui lòng chờ phản
                  hồi.
                </Typography>
              )}
            </Grid>
          </Grid>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              color="success"
              variant="contained"
              sx={{ mt: 3, mb: 2, textTransform: "none" }}
            >
              Gửi
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
          &ldquo;Đã gửi thành công ! Chúng tôi sẽ cố gắng liện hệ với bạn sớm
          nhất !&ldquo;
        </p>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => router.push("/")}
            variant="outlined"
            color="success"
          >
            Trở lại trang chủ
          </Button>
        </Box>
      </div>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="lg"
        sx={{ minHeight: "100vh"}}
      >
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
                  <AddReactionOutlinedIcon
                    sx={{ width: "80%", height: "50%", color: green[300] }}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        )}
      </Container>
    </ThemeProvider>
  );
}

RegisterWriter.getLayout = MainLayout;

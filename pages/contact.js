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
import { ContactLayout } from "src/components/layouts";
import emailjs from "@emailjs/browser";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
const theme = createTheme();

export default function Contact() {
  const [sendSuccess, setSendSuccess] = useState(false);

  const router = useRouter();
  const user = useSelector(
    (state) => state.persistedReducer.user.currentUserInfoFull.userInfo
  );
  console.log(user);

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
  function ContactForm() {
    return (
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
              Liên hệ chúng tôi
            </Typography>
            <Typography component="p" sx={{ py: 2 }}>
              Chúng tôi luôn sẵn sàng hỗ trợ, dù bạn ở bất cứ nơi đâu!
            </Typography>
          </Box>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {user ? (
                <></>
              ) : (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      color="success"
                      required
                      fullWidth
                      id="fullname"
                      label="Họ và tên"
                      name="fullname"
                      autoComplete="name"
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      color="success"
                      required
                      fullWidth
                      id="phone"
                      label="Số điện thoại"
                      name="phone"
                      autoComplete="phone"
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <TextField
                  color="success"
                  required
                  fullWidth
                  id="subject"
                  name="subject"
                  label="Chủ đề"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  color="success"
                  id="message"
                  name="message"
                  label="Tin nhắn"
                  multiline
                  rows={4}
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
                Summit
              </Button>
            </div>
          </Box>
        </Box>
      </Card>
    );
  }
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
        sx={{ minHeight: "calc(100vh - 96px)" }}
      >
        <CssBaseline />
        <Toolbar />

        {sendSuccess ? (
          <SendSuccess />
        ) : (
          <Grid container className={styles.container}>
            <Grid item md={6} order={{ xs: 2, md: 1 }}>
              <ContactForm />
            </Grid>
            <Grid item md={6} order={{ xs: 1, md: 2 }}>
              <div className={styles.paddingTop}>
                <div className={styles.flexCenter}>
                  <ContactSupportOutlinedIcon
                    sx={{ width: "50%", height: "50%" }}
                  />
                </div>
                <h3 className={styles.text}>
                  Để được hỗ trợ nhanh hơn, vui lòng gửi yêu cầu của bạn qua
                  biểu mẫu sau.
                </h3>
              </div>
            </Grid>
          </Grid>
        )}
      </Container>
    </ThemeProvider>
  );
}

Contact.getLayout = ContactLayout;

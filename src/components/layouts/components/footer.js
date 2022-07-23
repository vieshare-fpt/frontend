import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import Logo from "src/components/common/components/logo";
import { useRouter } from "next/router";
import { green } from "@mui/material/colors";
export function Footer() {
  const router = useRouter();
  console.log();
  const isLandingPage = router.asPath === "/";

  const styleLandingPage = {
    mb:1, mt: 2,
    display: "flex",
    flexDirection: { xs: "", sm: "column" },
    justifyContent: "center",
  }

  const styleOtherPage = {
    mt: 1,
    display: "flex",
    flexDirection: { xs: "", sm: "column" },
    flexWrap: "wrap",
    alignContent: "flex-end",
    justifyContent: "center",
  }
  return (
    <footer
      style={{
        backgroundPosition: isLandingPage ? '80% 20%' : "25% 100%",
        backgroundImage: 'url("/footer1.png")',
        backgroundColor: "rgb(246 ,246, 246, 1 )",
        height: "90vh",
      }}
    >
      <Container sx={{ py: 5 }} maxWidth={isLandingPage ? "" : "lg"}>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={6}
            lg={6}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "left" },
            }}
          >
            <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
              <Logo size="50px" lineHeight={1} />
              <Typography sx={{ color: "rgb(85,85,85)", fontSize: 16 }}>
                Nền tảng chia sẻ kiến thức dành cho người Việt
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={isLandingPage ? 12 : 6}
            sx={isLandingPage ? styleLandingPage : styleOtherPage}
          >
            <Link href="/about">
              <Box
                sx={{
                  ".MuiButton-root:hover": {
                    background: green[600],
                    boxShadow: 0,
                  },
                }}
              >
                <Button
                  variant="contained"
                  color="success"
                  sx={{
                    borderRadius: isLandingPage ? 1 : 20,
                    boxShadow: 0,
                    background: green[500],
                  }}
                >
                  <a>Về chúng tôi</a>
                </Button>
              </Box>
            </Link>
          </Grid>
        </Grid>
        
        <Divider  sx={{ mb: 3, mt: { xs: 1, sm: 0 }, mr: isLandingPage ? '62%' : "0" }} />
        <Grid
          container
          sx={{
            justifyContent: isLandingPage ? "left" : "center",
            display: "flex",
          }}
        >
          <Box sx={{ textAlign: isLandingPage ? {xs:"center", sm:"left",md: "left"} : "center" }}>
            <Typography>
              <strong> Điện thoại:</strong> 0939568941 <strong>Email:</strong>{" "}
              vie.share.platform@gmail.com{" "}
            </Typography>

            <Typography>
              © Vieshare 2022 . All Rights Reserved. |{" "}
              <a>Chính Sách Bảo Mật Thỏa</a> | <a>Thuận Người Dùng</a>
            </Typography>
          </Box>
        </Grid>
   
      </Container>
    </footer>
  );
}

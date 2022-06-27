import {
  AppBar,
  Box,
  styled,
  Toolbar,
  Typography,
  Container,
  Stack,
} from "@mui/material";
import Link from "next/link";
import React from "react";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
const style = {
  fontSize: "12px",
  color: "#2f9f32",
};
export function Footer() {
  return (
    <Box component="main">
      <Offset>
        <AppBar
          position="relative"
          elevation={0}
          color="primary"
          sx={{
            top: "auto",
            bottom: 0,
            backgroundColor: "white",
            height: "50px",
          }}
        >
          <Container maxWidth="" disableGutters>
            <Toolbar sx={{ borderTop: "1px solid #f3f5f8" }}>
              <Typography
                sx={{
                  color: "rgb(62, 80, 96)",
                  fontSize: "12px",
                }}
              >
                @Copyright © 2022 Team 1.
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Stack direction="row" spacing={1}>
                <Link href="/">
                  <a style={style}>Privacy Policy</a>
                </Link>
                <Link href="/">
                  <a style={style}> Terms & Conditions</a>
                </Link>
          
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>
      </Offset>
    </Box>
  );
}

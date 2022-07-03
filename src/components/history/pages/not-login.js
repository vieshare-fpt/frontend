import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import HistoryIcon from "@mui/icons-material/History";
import { useRouter } from "next/router";
import { green } from "@mui/material/colors";
export default function NotLogin() {
  const router = useRouter();
  function handleClick() {
    router.push("/login");
  }
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 25 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <HistoryIcon sx={{ fontSize: "100px", color: green[600] }} />
        </Box>
        <Typography
          variant="h2"
          sx={{
            fontSize: "30px",
            pt: 2,
            pb: 3,
            textAlign: "center",
            color: green[600],
          }}
        >
          Lịch sử xem không thể xem được
          <br />
          khi đăng xuất
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleClick}
            variant="outlined"
            color="success"
            sx={{ textTransform: "none" }}
          >
            Đăng Nhập
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

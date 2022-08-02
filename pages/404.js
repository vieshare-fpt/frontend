import { Box, Button, Container } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import Lottie from "react-lottie";
import * as animationData from "lottie/404.json";
import { useRouter } from "next/router";

const defaultAnimationOptions = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
export default function Custom404() {
  const user = useSelector(
    (state) => state.persistedReducer.user.currentUserInfoFull.userInfo
  );
  const router = useRouter();
  let link = "/";
  const isWriter = user?.roles.includes("Writer");
  const isAdmin = user?.roles.includes("Admin");
  const isCensor = user?.roles.includes("Censor");
  if (isWriter || isAdmin) {
    link = "/dashboard";
  } else if (isCensor) {
    link = "/dashboard/posts-management";
  }
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box>
        <Lottie
          options={{
            ...defaultAnimationOptions,
            ...{ animationData: animationData },
          }}
          isClickToPauseDisabled={true}
          height={350}
          width={500}
        />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={() => router.push(link)} color="success">
            Trở lại trang chủ
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

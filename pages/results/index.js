import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { PostCards } from "src/components/common";
import { ReaderLayout } from "src/components/layouts";
import { postApi } from "src/services";
import Lottie from "react-lottie";
import * as animationData from "lottie/search-not-found.json";
import style from "src/styles/Landing.module.css";

const defaultAnimationOptions = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
export default function Results() {
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const router = useRouter();
  const searchValue = router.query.search;
  useEffect(() => {
    setSpinner(true);
    (async () => {
      await postApi
        .searchPosts({ key: searchValue })
        .then((response) => {
          setSpinner(false);
          setData(response.data);
        })
        .catch((error) => {
          setSpinner(false);
          console.log(error);
        });
    })();
  }, [searchValue]);

  return (
    <>
      <Toolbar />
      <Container maxWidth="xl">
        <Divider textAlign="center">
          <Typography variant="h2" sx={{ fontSize: 30 }}>
            Từ khóa: {searchValue}
          </Typography>
        </Divider>
        {spinner ? (
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              minHeight: "70vh",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress color="success" />
            </Box>
          </Container>
        ) : (
          <Grid container>
            {data.length !== 0 ? (
              data.map((post) => (
                <Grid item xs={12} key={post.id} sx={{ px: 2 }}>
                  <PostCards note={post} />
                </Grid>
              ))
            ) : (
              <Container maxWidth="sm">
                <Lottie
                  options={{
                    ...defaultAnimationOptions,
                    ...{ animationData: animationData },
                  }}
                  isClickToPauseDisabled={true}
                  height={350}
                  width={350}
                />
                <Typography variant={"h5"} align="center">
                  Oops! Hình như bài viết bạn đang tìm kiếm không tồn tại vui
                  lòng thử lại !!
                </Typography>
              </Container>
            )}
          </Grid>
        )}
      </Container>
    </>
  );
}

Results.getLayout = ReaderLayout;

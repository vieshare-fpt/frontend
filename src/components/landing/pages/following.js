import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "src/styles/Landing.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { followingApi, postApi } from "src/services";
import { Progress } from "../components";
import { PostCards } from "src/components/common";
import Lottie from "react-lottie";
import * as animationData from "lottie/notLogin.json";
import * as animationDataNotFound from "lottie/search-not-found.json";

import { useRouter } from "next/router";

const defaultAnimationOptions = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "none",
  },
};

export default function FollowingPage() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [page, setpage] = useState(2);
  const [spinner, setSpinner] = useState(true);
  const categoryId = useSelector((state) => state.category.data);
  // //check page has more
  function isHasMore(data) {
    return data.metaData.page === data.metaData.total_pages;
  }
  const user = useSelector(
    (state) => state.persistedReducer.user.currentUserInfoFull.userInfo
  );

  const isUser = user?.roles.includes("User");
  useEffect(() => {
    if (user !== null && isUser) {
      (async () => {
        setpage(2);
        setSpinner(true);
        const payload = {
          status: "Publish",
          per_page: 12,
          page: 1,
        };
        if (categoryId.currentCategory) {
          payload.category_id = categoryId.currentCategory;
        }
        await followingApi
          .following(payload)
          .then((response) => {
            setData(response.data);
            setHasMore(!isHasMore(response));
            setSpinner(false);
          })
          .catch((error) => {
            console.log(error);
            setSpinner(false);
          });
      })();
    }
  }, [categoryId.currentCategory]);
  const fetchMoreData = async () => {
    const payload = {
      status: "Publish",
      per_page: 12,
      page: page,
    };
    if (categoryId.currentCategory) {
      payload.category_id = categoryId.currentCategory;
    }
    await followingApi
      .following(payload)
      .then((response) => {
        setData(data.concat(response.data));
        setHasMore(!isHasMore(response));
        if (!isHasMore(response)) {
          setpage(page + 1);
        }
      })
      .catch(function (error) {
        console.log(error.response.status); // 401
        if (error.response.status == 401) {
          console.log(error.response.data);
        }
      });
  };

  if (!isUser || user === null) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          minHeight: "100vh",
        }}
      >
        <Box>
          <Lottie
            options={{
              ...defaultAnimationOptions,
              ...{ animationData: animationData },
            }}
            isClickToPauseDisabled={true}
            height={500}
            width={500}
          />
          <Typography align="center" variant="h3" fontSize="25px">
            Vui lòng đăng nhập để sử dụng chức năng này!
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={() => router.push("/login")} color="success">
              Đăng nhập
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <div>
      <div className={style["content"]}>
        {spinner ? (
          <div className={style["spinner"]}>
            <Container maxWidth="lg">
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress color="success" />
              </Box>
            </Container>
          </div>
        ) : (
          <>
            {data.length === 0 ? (
              <Container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "90vh",
                }}
              >
                <Box>
                  <Lottie
                    options={{
                      ...defaultAnimationOptions,
                      ...{ animationData: animationDataNotFound },
                    }}
                    isClickToPauseDisabled={true}
                    height={500}
                    width={1000}
                  />
                  <Typography variant={"h5"} align="center">
                    Oops! Không có bài viết nào vui lòng thử lại sau.
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button onClick={() => router.push("/")} color="success">
                      Trở về trang chủ
                    </Button>
                  </Box>
                </Box>
              </Container>
            ) : (
              <Box sx={{ mt: "25px", mx: 2, mb: 10 }}>
                <InfiniteScroll
                  dataLength={data.length}
                  next={fetchMoreData}
                  hasMore={hasMore}
                  loader={<Progress />}
                >
                  <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    sx={{
                      ".MuiGrid-item": {
                        paddingTop: 0,
                      },
                    }}
                  >
                    {data.map((post) => (
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        key={post.id}
                        sx={{ pt: 0 }}
                      >
                        <PostCards note={post} />
                      </Grid>
                    ))}
                  </Grid>
                </InfiniteScroll>
              </Box>
            )}
          </>
        )}
      </div>
    </div>
  );
}

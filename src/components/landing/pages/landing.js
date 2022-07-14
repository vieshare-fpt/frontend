import { Box, CircularProgress, Divider, Grid } from "@mui/material";
import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "src/styles/Landing.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { postApi } from "src/services";
import { Progress } from "../components";
import { PostCards } from "src/components/common";


export default function LandingPage({ props }) {
  const { posts } = props;
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(!isHasMore(posts));
  const [page, setpage] = useState(2);
  const [spinner, setSpinner] = useState(false);
  const categoryId = useSelector((state) => state.category.data);
  //check page has more 
  function isHasMore(data) {
    return data.metaData.page === data.metaData.total_pages;
  }
  
  //loading post when any chip category is clicked
  useEffect(() => {
    if (categoryId.currentCategory) {
      setSpinner(true);
      (async () => {
        await postApi
          .getPosts({
            category_id: categoryId ? categoryId.currentCategory : "",
            status: "Publish",
            per_page: 12,
            page: 1,
          })
          .then((response) => {
            console.log(response);
            setData(response.data);
            setHasMore(!isHasMore(response));
            setSpinner(false);
          });
      })();
    } else {
      setData(posts.data);
      setHasMore(!isHasMore(posts));
    }
  }, [categoryId, posts, posts.data]);

  //loading more post when scroll
  const fetchMoreData = async () => {
    await postApi
      .getPosts({
        status: "Publish",
        per_page: 12,
        page: page,
      })
      .then((response) => {
        console.log(response);
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
  return (
    <div>
      <div className={style["content"]}>
        {spinner && (
          <div className={style["spinner"]}>
            <Container maxWidth="lg">
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress color="success" />
              </Box>
            </Container>
          </div>
        )}
        <Box sx={{ mt: "25px", mx: 2 }}>
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
                  paddingTop: 1,
                },
              }}
            >
              {data.map((post) => (
                <Grid item xs={12} sm={12} md={4} key={post.id} sx={{ pt: 0 }}>
                  <PostCards note={post} />
                </Grid>
              ))}
            </Grid>
          </InfiniteScroll>
        </Box>
      </div>
    </div>
  );
}

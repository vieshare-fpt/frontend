import { Box, CircularProgress, Container, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { postApi } from "src/services";
import { PostCards, Progress } from "../components";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import style from "../components/Landing.module.css";
export default function LandingPage({ props }) {
  const { post } = props;
  const [posts, setPost] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setpage] = useState(2);
  const [spinner, setSpinner] = useState(false);
  const categoryId = useSelector((state) => state.category.data);

  if (categoryId) {
    useEffect(() => {
      console.log(categoryId.currentCategory);
      setSpinner(true);
      (async () => {
        await postApi
          .getPosts({
            category_id: categoryId ? categoryId.currentCategory : "",
            per_page: 9,
            page: 1,
          })
          .then((response) => {
            setPost(response.data);
            setSpinner(false);
          });
      })();
    }, [categoryId]);
  } else {
    setPost(post);
  }
  const fetchPosts = async () => {
    await postApi
      .getPosts({
        category_id: categoryId ? categoryId.currentCategory : "",
        per_page: 9,
        page: page,
      })
      .then((response) => {
        if (response.data.length === 0 || response.data.length < 1) {
          sethasMore(false);
        } else {
          setPost(posts.concat(response.data));
          setpage(page + 1);
        }
      })
      .catch(function (error) {
        console.log(error.response.status); // 401
        if (error.response.status == 401) {
          err = error.response.data;
        }
      });
  };

  return (
    <div className={style["content"]}>
      {spinner && (
        <div className={style["spinner"]}>
          <Container maxWidth="lg">
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
              <CircularProgress color="success" />
            </Box>
          </Container>
        </div>
      )}
      <Container maxWidth="">
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchPosts}
          hasMore={hasMore}
          loader={<Progress />}
        >
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {posts.map((post) => (
              <Grid item xs={12} sm={12} md={4} key={post.id}>
                <PostCards note={post} />
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      </Container>
    </div>
  );
}

import {
  AppBar,
  Container,
  Grid,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getCookieData } from "src/services/cookies";
import { historyApi, postApi } from "src/services";
import { PostCards, Progress } from "../components";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";

const MyUl = styled("ul")({
  listStyleType: "none",
});

export default function LandingPage({ props }) {
  const { post } = props;
  const [posts, setPost] = useState(post);
  const [hasMore, sethasMore] = useState(true);
  const [page, setpage] = useState(2);
  const categoryId = useSelector((state) => state.category.data);
  // React.useEffect(() => {
  //  console.log(categoryId);

  if (categoryId) {
    useEffect(() => {
      (async () => {
        const response = await postApi.getPosts({
          category_id: `${categoryId.currentCategory}`,
          per_page: 9,
          page: 1,
        });
        setPost(response.data);
        console.log(categoryId.currentCategory);
      })();
    }, [categoryId]);
  }
  const fetchPosts = async () => {
    const response = await postApi
      .getPosts({
        category_id: categoryId ? categoryId.currentCategory : "",
        per_page: 9,
        page: page,
      })
      .catch(function (error) {
        console.log(error.response.status); // 401
        if (error.response.status == 401) {
          err = error.response.data;
        }
      });
    return response.data;
  };

  const fetchData = async () => {
    const postFormServer = await fetchPosts();

    if (postFormServer.length === 0 || postFormServer.length < 1) {
      sethasMore(false);
    } else {
      setPost(posts.concat(postFormServer));
      setpage(page + 1);
    }
  };

  return (
    <>
      <Container maxWidth="" sx={{ marginTop: 7 }}>
        <InfiniteScroll
          dataLength={30}
          next={fetchData}
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
    </>
  );
}

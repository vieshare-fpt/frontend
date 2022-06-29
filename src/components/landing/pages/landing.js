import {
  AppBar,
  Container,
  Grid,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { postApi } from "src/services";
import { PostCards, Progress } from "../components";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";



export default function LandingPage({ props }) {
  const { post } = props;
  const [posts, setPost] = useState(post);
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

  const Post = () => {
    if (posts.length === 0) {
      return (
        <>
          <Grid item xs={12} sm={12} md={4}>
            <div style={{ width: "570px" }}></div>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <div style={{ width: "570px" }}></div>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <div style={{ width: "760px" }}></div>
          </Grid>
          ;
        </>
      );
    } else if (posts.length < 3) {
      {
        return (
          <>
            {posts.map((post) => (
              <Grid item xs={12} sm={12} md={4} key={post.id}>
                <PostCards note={post} />
              </Grid>
            ))}
            <Grid item xs={12} sm={12} md={4}>
              <div style={{ width: "520px" }}></div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <div style={{ width: "520px" }}></div>
            </Grid>
          </>
        );
      }
    } else {
      return (
        <>
          {posts.map((post) => (
            <Grid item xs={12} sm={12} md={4} key={post.id}>
              <PostCards note={post} />
            </Grid>
          ))}
        </>
      );
    }
  };
  return (
    <div>
      {spinner && <div className="spinner"></div>}
      <Container maxWidth="" sx={{ marginTop: 7 }}>
        <InfiniteScroll
          dataLength={30}
          next={fetchPosts}
          hasMore={hasMore}
          loader={<Progress />}
        >
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Post />
          </Grid>
        </InfiniteScroll>
      </Container>
    </div>
  );
}

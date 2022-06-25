import { Container, Grid, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { default as LinkMUI } from "@mui/material/Link";
import { blue } from "@mui/material/colors";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { googleUser } from "src/services/accessApi";
import { getCookieData } from "src/services/cookies";
import historyApi from "src/services/historyApi";
import { useRouter } from "next/router";
import PostCards from "./components/PostCards";



const MyUl = styled("ul")({
  listStyleType: "none",
});

export default function LandingPage({ CurrentComponent }) {
  const { props, history } = CurrentComponent;
  const { trendingPosts, suggestPosts } = props;
  const isArray = history.length > 0;
  const watchMore = (
    <Typography
      sx={{
        cursor: "pointer",
        color: blue[700],
        ":hover": {
          color: "green",
        },
      }}
    >
      Xem thêm...
    </Typography>
  );

  return (
    <Container maxWidth='xl'>
      {/* to show 3 trending  */}
      <Typography
        variant="h4"
        sx={{
          mt: { xs: "30%", sm: "20%", md: "10%", lg: "6%" },
          mb: 2,
        }}
      >
        Trending
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {trendingPosts.map((trending) => (
          <Grid item xs={12} sm={12} md={4} key={trending.id}>
              <PostCards note={trending} />
          </Grid>
        ))}
      </Grid>
      {/* link to page trending */}
      <Grid container justifyContent="flex-end">
        <Link href="/trending">{watchMore}</Link>
      </Grid>

      {/* to show 3 suggestions */}
      <Typography variant="h4" sx={{ mb: 2 }}>
        Gợi ý cho bạn
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {suggestPosts.map((suggestion) => (
          <Grid item xs={12} sm={12} md={4} key={suggestion.id}>
            <PostCards note={suggestion} />
          </Grid>
        ))}
      </Grid>
      {/* link to page suggestion */}
      <Grid container justifyContent="flex-end">
        <Link href="/suggest">{watchMore}</Link>
      </Grid>

      {/* to show the post was read */}
      {isArray ? (
        <>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Đọc tiếp
          </Typography>
          <MyUl sx={{ fontSize: "17px", mx: 0 }}>
            {history.map((read) => (
              <li key={read.id}>
                <Link href={`/post/${read.id}`}>
                  <a>{/* {read.post.title} */}</a>
                </Link>
              </li>
            ))}
          </MyUl>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
}

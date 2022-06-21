import { Grid, styled, Typography } from "@mui/material";
import React from "react";
import Link from "next/link";
import { default as LinkMUI } from "@mui/material/Link";
import { blue } from "@mui/material/colors";
import PostCards from "src/components/PostCards";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { googleUser } from "src/services/accessApi";
import { getCookieData } from "src/services/cookies";

const MyContainer = styled("div")({
  margin: "0 5%",
});

const MyUl = styled("ul")({
  listStyleType: "none",
});

export default function LandingPage({ CurrentComponent }) {
  const { suggestPosts, trendingPosts } = CurrentComponent;
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

  if (!getCookieData("token")) {
    useGoogleOneTapLogin({
      onSuccess: (response) => {
        const newUser = {
          credential: response.credential,
        };
        googleUser(newUser, null);
      },
    });
  }

  function handleClick(event) {
    
    
  }

  return (
    <MyContainer >
      {/* to show 3 trending  */}
      <Typography
        variant="h4"
        sx={{
          mt: { xs: "30%", sm: "20%", md: "10%", lg: "8%" },
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
          <Link key={trending.id} href={`/post/${trending.id}`} onClick={handleClick(trending.id)}>
            <Grid item xs={12} sm={12} md={4}>
              <a>
                <PostCards note={trending} />
              </a>
            </Grid>
          </Link>
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
          <Link key={suggestion.id} href={`/post/${suggestion.id}`}>
            <Grid item xs={12} sm={12} md={4} key={suggestion.id}>
              <PostCards note={suggestion} />
            </Grid>
          </Link>
        ))}
      </Grid>
      {/* link to page suggestion */}
      <Grid container justifyContent="flex-end">
        <Link href="/suggest">{watchMore}</Link>
      </Grid>

      {/* to show the post was read */}
      <Typography variant="h4" sx={{ mb: 2 }}>
        Đọc tiếp
      </Typography>
      <MyUl sx={{ fontSize: "17px", mx: 0 }}>
        <LinkMUI sx={{ fontSize: "15px" }} underline="hover">
          Xem thêm...
        </LinkMUI>{" "}
        <br />
        <LinkMUI sx={{ fontSize: "15px" }} underline="hover">
          Xem thêm...
        </LinkMUI>
        <br />
        <LinkMUI sx={{ fontSize: "15px" }} underline="hover">
          Xem thêm...
        </LinkMUI>
        <br />
      </MyUl>
    </MyContainer>
  );
}

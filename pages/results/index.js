import { Divider, Grid, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { PostCards } from "src/components/common";
import { ReaderLayout } from "src/components/layouts";
import { postApi } from "src/services";

export default function Results() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const searchValue = router.query.search;

  useEffect(() => {
    (async () => {
      await postApi
        .searchPosts({ key: searchValue })
        .then((response) => {
          console.log(response);
          setData(response);
        })
        .catch((error) => console.log(error));
    })();
  }, [searchValue]);

  return (
    <>
      <Toolbar />
      <Container maxWidth="xl">
        <Divider textAlign="center">
          <Typography variant="h2" sx={{ fontSize: 30 }}>
            Kết quả: {searchValue}
          </Typography>
        </Divider>

        <Grid container>
          {data.map((post) => (
            <Grid item xs={12} md={6} key={post.id} sx={{ px: 2 }}>
              <PostCards note={post} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

Results.getLayout = ReaderLayout;

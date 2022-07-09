import { useRouter } from "next/router";
import React, { useState } from "react";
import { ReaderLayout } from "src/components/layouts";
import { postApi } from "src/services";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Grid } from "@mui/material";
import { RelatedCards } from "src/components/post/RelatedCard";

function PostDetailPage(props) {
  const router = useRouter();
  const { post, related } = props;
  if (router.isFallback) {
    return (
      <div style={{ fontSize: "2rem", textAlign: "center" }}>Đang tải...</div>
    );
  }
  if (!post) return null;

  if (post.statusCode === "USER_NOT_PREMIUM") {
    return <div style={{ marginTop: '100px' }}>card</div>;
  }
  console.log('related : ', related)
  return (
    <React.Fragment>
      <Grid container
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ paddingTop: 15, paddingBottom: 5}}
      >
        <Grid item xs={12} sm={12} md={2} key={1}>
          Info tác giả
        </Grid>
        <Grid item xs={12} sm={12} md={8} key={2}>
          <CssBaseline />
          <Container maxWidth="md" sx={{ textAlign: 'justify', textAlignLast: 'left' }}>
            <h2>{post.data.title}</h2>
            <h4>{post.data.description}</h4>
            <div dangerouslySetInnerHTML={{ __html: post.data.content }}></div>
          </Container>
          <Grid item xs={12} sm={12} md={12} key={4}>
            <h1>Comment</h1>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={2} key={3} sx={{padding:'0px'}}>
          {related.length ?
            related.map((element) => {
              return (
                <RelatedCards key={element.id} note={element}>

                </RelatedCards>
              )
            })
            : <></>
          }
        </Grid>



      </Grid>
      {/* <CssBaseline />
      <Container maxWidth="md" sx={{ paddingTop: 15, paddingBottom: 5, textAlign: 'justify', textAlignLast: 'left' }}>
        <h2>{post.data.title}</h2>
        <h4>{post.data.description}</h4>
        <div dangerouslySetInnerHTML={{ __html: post.data.content }}></div>
      </Container> */}
    </React.Fragment>
  )
}

export default PostDetailPage;
PostDetailPage.getLayout = ReaderLayout;

export async function getServerSideProps(context) {
  const postId = context.params?.postId
  if (!postId) return { notFound: true };
  const response = await postApi.getPostDetail(postId);
  const postRelated = await postApi.getPostsRelated(postId, { page: 1, per_page: 5 })
  return {
    props: {
      post: response,
      related: postRelated.data
    },
  };
}
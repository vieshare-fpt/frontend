import { useRouter } from "next/router";
import React, { useState } from "react";
import { ReaderLayout } from "src/components/layouts";
import { getCookieData } from "src/services/cookies";
import { postApi } from "src/services";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

function PostDetailPage(props) {
  const router = useRouter();
  const { post } = props
  if (router.isFallback) {
    return (
      <div style={{ fontSize: "2rem", textAlign: "center" }}>Đang tải...</div>
    );
  }
  if (!post) return null;

  if (post.statusCode === "USER_NOT_PREMIUM") {
    return <div style={{ marginTop: '100px' }}>card</div>;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md" sx={{paddingTop: 15, paddingBottom: 5, textAlign: 'justify', textAlignLast: 'left'}}>
        <h2>{post.data.title}</h2>
        <h4>{post.data.description}</h4>
        <div dangerouslySetInnerHTML={{ __html: post.data.content }}></div>
      </Container>
    </React.Fragment>
  )
}

export default PostDetailPage;
PostDetailPage.getLayout = ReaderLayout;

export async function getServerSideProps(context) {
  const postId = context.params?.postId
  if (!postId) return { notFound: true };
  const response = await postApi.getPostDetail(postId);

  return {
    props: {
      post: response,
    },
  };
}
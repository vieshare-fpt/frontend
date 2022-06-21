import { useRouter } from "next/router";
import React from "react";
import { MainLayout } from "src/components/layouts";
import axiosClient from "src/services/axiosClient";
import postApi from "src/services/postsApi";

function PostDetailPage({ post }) {
  const router = useRouter();
  const user = null;

  if (router.isFallback) {
    return (
      <div style={{ fontSize: "2rem", textAlign: "center" }}>Loading...</div>
    );
  }
  if (!post) return null;
  console.log(post);
  if (post.statusCode === "USER_NOT_PREMIUM") {
    return <div style={{marginTop:'100px'}}>card</div>;
  }

  return <div>hello</div>;
}

export default PostDetailPage;
// PostDetailPage.getLayout = MainLayout;
export const getStaticPaths = async () => {
  console.log("\nGET STATIC PATHS");
  const response = await postApi.getPostId();

  return {
    paths: response.data.map((post) => ({ params: { postId: post.id } })),
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  console.log("\nGET STATIC PROPS", context.params?.postId);
  const postId = context.params?.postId;
  let responseError = null;
  if (!postId) return { notFound: true };
  const response = await postApi.getPostDetail(postId).catch(function (error) {
    console.log(error.response.status); // 401
    if (error.response.status == 401) {
      responseError = error.response.data;
    }
  });

  return {
    props: {
      post: responseError ? responseError : response,
    },
    revalidate: 300,
  };
};

import React from 'react'
import PostManagement from 'src/components/dashboard/pages/posts-management'
import Page from 'src/components/dashboard/main'
import { postApi } from 'src/services'

export default function DashBoard(props) {
  return <Page CurrentComponent={PostManagement} 
               props={props}
  />;
}

export async function getServerSideProps() {
  const { token, refreshToken } = context.req.cookies || {token: null, refreshToken: null}
  const posts = await postApi.getPosts(token, refreshToken);
  return {
    props: {
      title: 'Quản lý bài viết',
      post: posts.data,
      postStatus: "Publish",
    },
  };
} 

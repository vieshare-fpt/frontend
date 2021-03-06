import React from 'react'
import MyContents from 'src/components/dashboard/pages/my-contents'
import Page from 'src/components/dashboard/main'
import { postApi } from 'src/services'

export default function DashBoard(props) {
  return <Page CurrentComponent={MyContents} 
               props={props}
  />;
}

export async function getServerSideProps() {
  const posts = await postApi.getPosts();
  return {
    props: {
      title: "Bài viết của tôi",
      post: posts.data,
      postStatus: "Publish",
    },
  };
} 

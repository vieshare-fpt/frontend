import React from 'react'
import MyContents from 'src/components/dashboard/pages/my-contents'
import Page from 'src/components/dashboard/main'
import { postApi } from 'src/services'

export default function DashBoard(props) {
  return <Page CurrentComponent={MyContents} 
  props={props}
  />;
}

export async function getStaticProps() {
  const posts = await postApi.getPosts({
    order_by: "publishDate",
    sort: "DESC",
    per_page: 999999999,
    page: 1,
  });
  return {
    props: {
      title: "Bài viết của tôi",
      post: posts.data,
      postStatus: "Publish",
    },
  };
} 

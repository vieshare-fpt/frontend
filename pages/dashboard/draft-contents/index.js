import React from 'react'
import MyContents from 'src/components/dashboard/pages/my-contents'
import Page from 'src/components/dashboard/main'
import { categoryApi, postApi  } from 'src/services'

const contentStatus = true;
export default function DashBoard(props) {
  return <Page CurrentComponent={MyContents} 
  props={props}
  />;

}

export async function getServerSideProps() {
  const posts = await postApi.getPosts({
    per_page: 9,
    page: 1,
  });
  return {
    props: {
      post: posts.data,
      postStatus: "Draft",
    },
  };
} 
 24  
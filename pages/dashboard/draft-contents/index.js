import React from 'react'
import MyContents from 'src/components/dashboard/pages/my-contents'
import Page from 'src/components/dashboard/main'
import { postApi  } from 'src/services'

export default function DraftContents(props) {
  return <Page CurrentComponent={MyContents} 
    props={props}
  />;

}

export async function getStaticProps() {
  const posts = await postApi.getPosts({
    per_page: 9,
    page: 1,
  });
  return {
    props: {
      title: "Bản nháp",
      post: posts.data,
      postStatus: "Draft",
    },
  };
} 

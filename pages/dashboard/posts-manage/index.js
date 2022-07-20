import React from 'react'
import Page from 'src/components/dashboard/main'

export default function PostsManage(props) {
  return (
    <Page CurrentComponent={<></>} props={props} />
  )
}

export async function getStaticProps() {
  return {
    props: {
      
    },
  };
}

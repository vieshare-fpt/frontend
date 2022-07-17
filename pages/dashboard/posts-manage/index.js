import React from 'react'


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

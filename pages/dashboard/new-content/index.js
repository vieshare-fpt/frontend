import React from 'react'
import ContentEditor from 'src/components/dashboard/pages/content-editor'
import Page from 'src/components/dashboard/main'
import { categoryApi } from "src/services";

export default function DashBoard(props) {
  return (
    <Page CurrentComponent={ContentEditor} props={props} />
  )
}

export async function getStaticProps() {
  const categories = await categoryApi.getCategory({
    per_page: 99,
    page:1
  })
  return {
    props: {
      categories: categories.data
    },
  };
}

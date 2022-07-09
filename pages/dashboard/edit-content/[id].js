import React from 'react'
import ContentEditor from 'src/components/dashboard/pages/content-editor'
import Page from 'src/components/dashboard/main'
import { postApi } from 'src/services'
import { categoryApi } from "src/services";

export default function EditContent(props) {
    return <Page CurrentComponent={ContentEditor} props={props} />
}

export async function getServerSideProps(context) {
    const categories = await categoryApi.getCategory({
        per_page: 99,
        page:1
      })
    const postId = context.params?.id
    if (!postId) return { notFound: true };
    const response = await postApi.getPostDetail(postId);
    return {
        props: {
            initialPost: response.data,
            categories: categories.data
        },
    };
}
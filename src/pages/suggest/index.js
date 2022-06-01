import { Grid, styled, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PostCards from '../../components/PostCards'
import Layout from '../../components/Layout'
import postApi from '../api/postsApi'

const MyContainer = styled('div')({
  margin: '0 5%'
})
export default function Suggest({suggestPosts}) {

  return (
    <Layout>
      
      <MyContainer  sx={{ mt: 6 }}>
        <Typography variant='h4' sx={{ mb: 2 }}>Gợi ý cho bạn</Typography>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {suggestPosts.map(suggestion => (
            <Grid item xs={12} sm={12} md={4} key={suggestion.id}>
              <PostCards note={suggestion} />
            </Grid>
          ))}
        </Grid>

      </MyContainer >
    </Layout>
  )
}

export async function getStaticProps () {
  const suggestPosts = await postApi.getPostsSuggestLimit({
    per_page: 9,
    page: 1
  });
  return {
    props: {
      suggestPosts: suggestPosts.data,
    }
  }
}

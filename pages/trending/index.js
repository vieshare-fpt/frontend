import { Grid, styled, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PostCards from 'src/components/PostCards'
import Layout from 'src/components/Layout'
import postApi from 'src/services/postsApi'
import Link from 'next/link'

const MyContainer = styled('div')({
  margin: '0 5%'
})
export default function TrendingPage({ trendingPosts }) {
  return (
    <Layout>
      <MyContainer sx={{ mt: 6 }}>
        <Typography variant='h4' sx={{ mb: 2 }}>Trending</Typography>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {trendingPosts.map(trending => (
            <Link key={trending.id} href={`/post/${trending.id}`}>
              <Grid item xs={12} sm={12} md={4} >
                <PostCards note={trending} />
              </Grid>
            </Link>
          ))}
        </Grid>
      </MyContainer >
    </Layout>
  )
}
export async function getStaticProps() {
  const trendingPosts = await postApi.getPostsTrendingLimit({
    order_by: 'views',
    sort: 'DESC',
    per_page: 9,
    page: 1
  });
  return {
    props: {
      trendingPosts: trendingPosts.data,
    }
  }
}
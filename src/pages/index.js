import { Grid, styled, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { default as LinkMUI } from '@mui/material/Link';
import postApi from './api/postsApi'
import { blue } from '@mui/material/colors';
import Layout from '../components/Layout'
import PostCards from '../components/PostCards'

const MyContainer = styled('div')({
  margin: '0 5%'
})

const MyUl = styled('ul')({
  listStyleType: 'none'
})



function LandingPage({ trendingPosts, suggestPosts }) {
  const watchMore = (
    <Typography sx={{
      cursor:'pointer',
      color:blue[700],
      ':hover': {
      color: 'green'
    }}}>Xem thêm...</Typography>
  )
  return (
    <Layout>
      <MyContainer sx={{ mt: 6 }}>
        {/* to show 3 trending  */}
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
        {/* link to page trending */}
        <Grid container justifyContent="flex-end">
          <Link href='/trending' >{watchMore}</Link>
        </Grid>

        {/* to show 3 suggestions */}
        <Typography variant='h4' sx={{ mb: 2 }}>Gợi ý cho bạn</Typography>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {suggestPosts.map(suggestion => (
            <Grid item xs={12} sm={12} md={4} key={suggestion.id}>
              <PostCards note={suggestion} />
            </Grid>
          ))}
        </Grid>
        {/* link to page suggestion */}
        <Grid container justifyContent="flex-end">
          <Link href='/suggest' >{watchMore}</Link>
        </Grid>

        {/* to show the post was read */}
        <Typography variant='h4' sx={{ mb: 2 }}>Đọc tiếp</Typography>
        <MyUl sx={{ fontSize: '17px', mx: 0 }}>
          <LinkMUI sx={{ fontSize: '15px' }} underline='hover'>Xem thêm...</LinkMUI> <br />
          <LinkMUI sx={{ fontSize: '15px' }} underline='hover'>Xem thêm...</LinkMUI><br />
          <LinkMUI sx={{ fontSize: '15px' }} underline='hover'>Xem thêm...</LinkMUI><br />
        </MyUl>
      </MyContainer>

    </Layout >
  )
}

export async function getStaticProps() {

  const suggestPosts = await postApi.getPostsSuggestLimit({
    per_page: 3,
    page: 1
  });
  const trendingPosts = await postApi.getPostsTrendingLimit({
    order_by: 'views',
    sort: 'DESC',
    per_page: 3,
    page: 1
  });
  return {
    props: {
      suggestPosts: suggestPosts.data,
      trendingPosts: trendingPosts.data
    }
  }
}
export default LandingPage

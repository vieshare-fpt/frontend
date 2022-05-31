import { Card, CardActions, CardContent, Link, CardHeader, Typography } from '@mui/material'
import React from 'react'
import { styled, Grid } from '@mui/material';
import { Box } from '@mui/system';
const MyText = styled('p')({
  display: '-webkit-box',
  WebkitLineClamp: '2',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
})

const MyTextTitle = styled('h2')({
  display: '-webkit-box',
  WebkitLineClamp: '1',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  margin: '0 0'
})
export default function PostCards({ note }) {
  return (
    <Card elevation={1} sx={{
      cursor: 'pointer',
      borderRadius: '16px', height: 200,
      backgroundImage: `url("${note.img}")`,
      backgroundRepeat: 'no-repeat',
      ':hover': {
        transform: 'scale(1.10)',
        boxShadow: 20,
        transition: 'all 0.7s'

      }
    }}>

      <Box sx={{ p: 1 }} >
        <img src={note.type === 'Premium' ? '/premiumPost.svg' : '/freePost.svg'} />
      </Box>

      <CardContent sx={{ py: 0 }}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <MyTextTitle >{note.title}</MyTextTitle>
          </Grid>
          <Grid item xs={12}>
            <MyText>
              {note.description}
            </MyText>
          </Grid>
          <Box sx={{ my: 2 }} />
          <Grid item xs={12}>
            <Typography>{note.authorName ? note.authorName : 'undefined'}</Typography>
          </Grid>

        </Grid>
      </CardContent>

    </Card>

  )
}

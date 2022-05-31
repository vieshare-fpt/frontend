import { Container, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import React from 'react'
import FormLogin from '../../features/login/components/formLogin'
import styles from '../../styles/Logo.module.css'

export default function loginPage() {
  
  return (
 
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
        <p className={styles.logo}>
          <Link href='/'>
            VieShare
          </Link>
        </p>
        <Typography component="h1" variant="h5">
          Đăng Nhập
        </Typography>
        <FormLogin />
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>

    </Container>
  )
}

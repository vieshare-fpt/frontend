import { Container, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import FormLogin from '../../features/login/components/formLogin'

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
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
         <FormLogin/>
        </Box>

      </Container>
    )
}

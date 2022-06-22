import { AppBar, Box, IconButton, Link, styled, Toolbar, Typography } from '@mui/material'
import React from 'react'
const MyLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  margin: theme.spacing(1),
}))
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export  function NavBottom() {
  return (

    <Offset>
      <AppBar position="relative" elevation={0} color="primary" sx={{ top: 'auto', bottom: 0, backgroundColor: 'white', height: '60px' }}>
        <Toolbar>

          <Box sx={{ flexGrow: 1 }} />

          <MyLink href='' underline='hover'>Góp ý</MyLink>
          <MyLink href='' underline='hover'>Liên hệ</MyLink>
          <MyLink href='' underline='hover'>Về chúng tôi</MyLink>

        </Toolbar>
      </AppBar>
    </Offset>
  )
}

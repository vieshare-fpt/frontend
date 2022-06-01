import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import Layout from '../../components/Layout'
import SubcriptionCard from '../../features/subcription/components/SubcriptionCard'

export default function paySuccess() {
  return (
    <Layout>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 4, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          sx={{ width: { lg: 650 } }}
        >
          Thanh toán thành công!
        </Typography>
        <Box sx={{ my: 4 }} />
        <Typography variant="h5" sx={{ fontSize: 20 }} align="center" color="text.secondary" component="p">
          Bạn đã thanh toán thành công gói mỗi 3 tháng! Kể từ ngày XX/XX/XXXX tới XX/XX/XXXX!
        </Typography>
      </Container>
      <SubcriptionCard/>
    </Layout>
  )
}

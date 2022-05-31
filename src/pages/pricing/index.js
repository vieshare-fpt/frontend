import { Button, Card, CardActions, CardContent, CardHeader, Container, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react'
import Layout from '../../components/Layout'
import PricingCard from '../../features/pricing/components/PricingCard'
import 'animate.css';

export default function Pricing() {
    return (
        <Layout>
            <Container disableGutters maxWidth="sm" component="main" sx={{
                pt: 4, pb: 6,
            }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    gutterBottom
                >
                    Mua Premium, xem không giới hạn
                </Typography>
                <Typography variant="h5" sx={{ fontSize: 20 }} align="center" color="text.secondary" component="p">
                    Bạn có thể mua gói Premium để có thể truy cập không giới hạn tới các nội dung trả phí.
                    Hãy chọn phương thức thanh toán phù hợp với bạn để có trải nghiệm tốt nhất nhé!
                </Typography>
            </Container>
            <PricingCard />
        </Layout>
    )
}

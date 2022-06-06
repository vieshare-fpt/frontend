import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import React from 'react'

export default function Category() {
    return (
        <Grid container >
            <Grid item lg={2}  >
                <Typography variant="h4" sx={{ margin:1, fontSize: 18 }}><Link href='/'>Tất cả thể loại</Link></Typography>
            </Grid>
            <Grid item lg={2} display="flex"
                justifyContent="center">
                <Typography variant="h4" sx={{ margin:1, fontSize: 18 }}><Link href='/'>Catetory</Link></Typography>
            </Grid>
            <Grid item lg={2} display="flex"
                justifyContent="center">
                <Typography variant="h4" sx={{ margin:1, fontSize: 18 }}><Link href='/'>Catetory</Link></Typography>
            </Grid>
            <Grid item lg={2} display="flex"
                justifyContent="center">
                <Typography variant="h4" sx={{ margin:1, fontSize: 18 }}><Link href='/'>Catetory</Link></Typography>
            </Grid>
            <Grid item lg={2} display="flex"
                justifyContent="center">
                <Typography variant="h4" sx={{ margin:1, fontSize: 18 }}><Link href='/'>Catetory</Link></Typography>
            </Grid>
            <Grid item lg={2} display="flex"
                justifyContent="center">
                <Typography variant="h4" sx={{ margin:1, fontSize: 18 }}><Link href='/'>Catetory</Link></Typography>
            </Grid>
        </Grid>
    )
}

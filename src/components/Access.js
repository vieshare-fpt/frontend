import { Button, Typography } from '@mui/material'
import { green } from '@mui/material/colors'
import { Box } from '@mui/system'
import Link from 'next/link'
import React from 'react'
const styles = {
    color: 'Black', cursor: 'pointer',
    borderBottom: "solid 0px green",
    textTransform: "uppercase",
    transition: "border-width 0.2s linear",
    color: 'black',
    fontWeight: '400',
    margin: "0 10px", 
    ":hover": {
        borderBottomWidth: '3px'
    },
    fontSize: { xs: 'x-small', sm:'small', md: 'small', lg: 'medium' },
    
}
const stylesButton = {
    backgroundColor: green[100],
    transition: "background-color 0.2s linear",
    textTransform: "uppercase",
    color: green[900],
    borderRadius: "8px",
    border: 'green solid 2px',
    margin: "0 10px",
    cursor: 'pointer',
    ':hover': {
        backgroundColor: green[400],
        color: 'white'
    },
    fontSize: { xs: 'x-small', sm:'small', md: 'small', lg: 'medium' },
}
export default function Access() {
    return (
        <div>
            <Link href='/login'>
                <Typography display="inline" sx={styles}>
                    Đăng Nhập
                </Typography>
            </Link>
            <Link href='/signup'>
                <Typography component='button' display="inline" sx={stylesButton}>
                    Đăng Ký
                </Typography>
            </Link>

        </div>
    )
}

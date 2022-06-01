import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Grid, IconButton, styled, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { default as LinkMUI } from '@mui/material/Link';
import {pages} from '../AppBar/constantNav'

export default function NavLine() {
    return (
        <nav>
            {pages.map((page) => (
                <Typography
                    component='span'
                    key={page.nameNav}
                    sx={{
                        my: 1, mx: 1.5, color: 'black',
                        textTransform: 'uppercase',
                        fontWeight: '400',
                        ':hover': {
                            color: 'green',
                        },
                    }}
                >
                    <Link href={page.url} 
                    >
                        {page.nameNav}
                    </Link>
                </Typography>

            ))}

        </nav>

    )
}
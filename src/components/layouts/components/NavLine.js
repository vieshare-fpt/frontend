import * as React from 'react';
import { Grid, IconButton, styled, Typography } from '@mui/material';
import Link from 'next/link';
import {pages} from 'src/components/layouts/components/constant'

export function NavLine() {
    return (
        <nav>
            {pages.map((page) => (
                <Typography
                    component='span'
                    key={page.nameNav}
                    sx={{
                        my: 1, mx: 1, color: 'black',
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
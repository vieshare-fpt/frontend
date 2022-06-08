import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Grid, IconButton, styled, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { default as LinkMUI } from '@mui/material/Link';

import {pages} from 'src/components/AppBar/constantNav'


export default function NavMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton id="basic-button"
                onClick={handleClick}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}

                sx={{ display: { lg: 'none', md: 'block' } }}
            >
                <nav>
                    {pages.map((page) => (
                        <MenuItem key={page.nameNav} onClick={handleClose}>
                            <Typography sx={{
                                my: 1, mx: 1.5, textTransform: 'uppercase', fontWeight: '500', ':hover': {
                                    color: 'green',
                                }
                            }}>
                                <Link href={page.url} >
                                    {page.nameNav}
                                </Link>
                            </Typography>
                        </MenuItem>
                    ))}

                </nav>
            </Menu>
        </div>
    );
}





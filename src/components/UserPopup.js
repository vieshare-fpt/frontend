import React from 'react'
import Tooltip from '@mui/material/Tooltip'
import { Avatar, Box, CardHeader, IconButton, Menu, MenuItem, Typography, Button } from '@mui/material';
import Link from 'next/link';
import Divider from '@mui/material/Divider';
import { green, teal } from '@mui/material/colors';
import { userLogout } from 'src/services/accessApi';
import { removeCookieData, getCookieData } from 'src/services/cookies';


const paper = {
    elevation: 0,
    sx: {
        borderRadius: 3,
        width: '400px',
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,


        '& .MuiMenuItem-root:not(#flash)': {
            ml: '5px',
            my: 2
        }
    }
}

const features = [{
    name: 'Lịch sử của tôi', url: '/'
},
{
    name: 'Gia hạn Premium', url: '/'
},
{
    name: 'Chỉnh sửa thông tin', url: '/'
},
]
export default function UserPopup({ fullname, email, avatar, type }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const refreshToken = getCookieData('refreshToken');
    const token = getCookieData('token');
    
    const handleLogout = () => { 
        //Call api 
        userLogout(refreshToken, token);
        //remove token
        if(getCookieData('token')){
            removeCookieData('token');
            removeCookieData('refreshToken');
            
        }
    }
    return (
        <div>
            <Tooltip title="Settings">
                <IconButton onClick={handleClick}>
                    <Avatar src={avatar} />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={paper}
            >
                <Box sx={{ px: 0 }} >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            margin: '10px 10px'
                        }}>
                        <img src={type ? "/premium.svg" : "/free.svg"} width={100} height={30} />
                        <Box sx={{ flexGrow: 1 }} />
                        <Typography sx={{
                            color: green[800],
                            fontSize: 15,
                            ':hover': {
                                color: teal[800],
                            }
                        }} variant='h6' color="initial">
                            <Button onClick={handleLogout} >Đăng xuất</Button>
                        </Typography>
                    </div>
                    <Divider />
                    <MenuItem>
                        <Avatar sx={{ width: 70, height: 70 }} />
                        <div style={{ marginLeft: 10 }}>
                            <Typography variant='h5'>{fullname}</Typography>
                            <Typography>{email}</Typography>
                        </div>
                    </MenuItem>
                    <Divider />
                    {features.map(feature => (
                        <MenuItem key={feature.name}>
                            <Link href={feature.url} >
                                {feature.name}
                            </Link>
                        </MenuItem>
                    ))}
                </Box>

            </Menu>
        </div>
    )
}

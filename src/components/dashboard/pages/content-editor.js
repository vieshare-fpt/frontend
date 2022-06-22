import * as React from 'react';
import dynamic from 'next/dynamic'
import MenuIcon from '@mui/icons-material/Menu';
import { Box, TextField, Typography, Toolbar, Button, IconButton } from '@mui/material';
import { creatorApi } from 'src/services';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function ContentEditor(props) {
    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, pl: 1, pr: 1, pb: 1, width: { sm: `100%` } }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    Tạo bài viết
                </Typography>
                <Button sx={{ float: 'right' }}>Phát hành</Button>
                <Button sx={{ float: 'right' }} onClick={async () => {
                    const result = await creatorApi.createPost({
                        "title": "string",
                        "categoryId": "string",
                        "description": "string",
                        "content": "string",
                        "type": "Free"
                    })
                    // TODO
                }}>Lưu bài viết</Button>
            </Toolbar>
            <Typography sx={{ p: 1 }}>Tiêu đề bài viết</Typography>
            <TextField
                fullWidth
                multiline
                maxRows={2}
                value={`sadsadasd`}
                onChange={() => { }}
            />
            <Typography sx={{ p: 1 }}>Mô tả ngắn</Typography>
            <TextField
                fullWidth
                multiline
                maxRows={2}
                value={`sadsadasd`}
                onChange={() => { }}
            />
            <Typography sx={{ p: 1 }}>Loại bài viết</Typography>
            <TextField
                fullWidth
                multiline
                maxRows={2}
                value={`sadsadasd`}
                onChange={() => { }}
            />
            <Typography sx={{ p: 1 }}>Nội dung</Typography>
            <div>
                <ReactQuill value={`value`} onChange={() => { }} />
            </div>
        </Box>
    );
}

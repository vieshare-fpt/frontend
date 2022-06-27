import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, TextField, Link, Typography, Toolbar, Button, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: '#', width: 70, description: 'Thứ tự bài viết' },
    { 
        field: 'tittle', 
        headerName: 'Tiêu đề', 
        width: 250, 
        editable: true,
        description: 'Tiêu đề bài viết'
    },
    { 
        field: 'description', 
        headerName: 'Mô tả', 
        width: 400, 
        editable: true,
        sortable: false,
        description: 'Mô tả ngắn về bài viết'
    },
    { 
        field: 'category', 
        headerName: 'Thể loại', 
        width: 150, 
        editable: true,
        sortable: false,
        description: 'Thể loại bài viết'
    },
    // {
    //     field: 'edit', 
    //     headerName: 'Hoạt động',
    //     editable: false,
    //     sortable: false,
    //     width: 100,
    //     description: 'Chỉnh sửa nội dung',
    //     renderCells: {handleEdit}
    // }
];

const rows = [
    {id: 1, tittle: 'Về nhà ăn cơm mẹ nấu', description: 'Ăn sơn hào muôn phương không bằng về ăn cơm mẹ nấu', category: 'Blog'},
    {id: 2, tittle: 'Về nhà ăn cơm mẹ nấu', description: 'Ăn sơn hào muôn phương không bằng về ăn cơm mẹ nấu', category: 'Blog'},
    {id: 3, tittle: 'Về nhà ăn cơm mẹ nấu', description: 'Ăn sơn hào muôn phương không bằng về ăn cơm mẹ nấu', category: 'Blog'},
    {id: 4, tittle: 'Biết địch biết ta, trăm trận trăm thắng', description: 'Hãy tìm hiểu đối phương trước khi đối đầu trực diện', category: 'Chiến thuật'},
    {id: 5, tittle: 'Biết địch biết ta, trăm trận trăm thắng', description: 'Hãy tìm hiểu đối phương trước khi đối đầu trực diện', category: 'Chiến thuật'},
    {id: 6, tittle: 'Biết địch biết ta, trăm trận trăm thắng', description: 'Hãy tìm hiểu đối phương trước khi đối đầu trực diện', category: 'Chiến thuật'},
    {id: 7, tittle: 'Biết địch biết ta, trăm trận trăm thắng', description: 'Hãy tìm hiểu đối phương trước khi đối đầu trực diện', category: 'Chiến thuật'},
    {id: 8, tittle: 'Về nhà ăn cơm mẹ nấu', description: 'Ăn sơn hào muôn phương không bằng về ăn cơm mẹ nấu', category: 'Blog'},
]
export default function MyContents(props) {
    
    if (typeof window !== 'undefined') {
        console.log('You are on the browser')
        console.log(window.localStorage.getItem('userID'));
        // 👉️ can use localStorage here
      } else {
        console.log('You are on the server')
        // 👉️ can't use localStorage
      }
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
                    Bài viết của tôi
                </Typography>
            </Toolbar>
            <Box sx={{ 
                height:650, width: '100%',
            }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    button
                />
            </Box>
        </Box>
    );
}
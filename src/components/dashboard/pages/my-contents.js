import React, { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, TextField, Link, Typography, Toolbar, Button, IconButton } from '@mui/material';
import { 
    DataGrid, 
    GridToolbar,
} from '@mui/x-data-grid'

const columns = [
    { field: 'id', headerName: '#', width: 50, marginLeft: 20, description: 'Thứ tự bài viết' },
    { 
        field: 'title', 
        headerName: 'Tiêu đề', 
        description: 'Tiêu đề bài viết',
        width: 350, 
        editable: false,
    },
    { 
        field: 'description', 
        headerName: 'Mô tả', 
        description: 'Mô tả ngắn về bài viết',
        width: 400, 
        editable: false,
        sortable: true,
    },
    { 
        field: 'category', 
        headerName: 'Thể loại', 
        description: 'Thể loại bài viết',
        width: 150, 
        editable: false,
        sortable: true,
    },
    {
        field: 'read', 
        headerName: 'Đọc', 
        description: 'Xem chi tiết bài viết',
        editable: false,
        sortable: false,
        width: 50,
        renderCell: (cellValue) => {
            return (
                <Button 
                    onClick={(event) => {
                        handleRead(event, cellValue);
                    }} 
                    color="success" 
                    startIcon={< VisibilityIcon />}>
                </Button>
            );
        },
    },
    {
        field: 'edit', 
        headerName: 'Sửa', 
        description: 'Chỉnh sửa bài viết',
        editable: false,
        sortable: false,
        width: 50,
        disableClickEventBubbling: true,
        renderCell: () => {
            return <Button color="secondary" startIcon={< EditIcon />}></Button>;
        },
    },
    {
        field: 'delete', 
        headerName: 'xóa', 
        description: 'Xóa bài viết',
        editable: false,
        sortable: false,
        width: 50,
        disableClickEventBubbling: true,
        renderCell: () => {
            return <Button color="error" startIcon={< DeleteIcon />}></Button>;
          },
    },
];

const handleRead = (event, cellValue) => {
    location.href = (`/post/${cellValue.row.postId}`);
}

const handleCellClick = (param, event) => {
    event.stopPropagation();
};
  
const handleRowClick = (param, event) => {
    event.stopPropagation();
};

//Demo post
const row = [
    { id:1, title: 'Về nhà ăn cơm mẹ nấu', description: 'Ăn sơn hào muôn phương không bằng về ăn cơm mẹ nấu', category: 'Blog'},
    { id:2, title: 'Biết địch biết ta, trăm trận trăm thắng', description: 'Hãy tìm hiểu đối phương trước khi đối đầu trực diện', category: 'Chiến thuật'},
]

//Get author Id from localStorage
var authorID = null;
if (typeof window !== 'undefined') {
    authorID = localStorage.getItem('authorID');
    
}
else{
    console.log("Error get author ID");
}
console.log(authorID);



export default function MyContents(props) {
    console.log(props);
    const { post } = props.props.props;
    console.log(post);
    const { postStatus } = props.props.props;
    var listPosts = [];
    for(let i = 0; i < post.length; i++) {
        if(post[i].author.id == authorID && post[i].status == postStatus) {
            const postObj = {id:i, postId: post[i].id, title: post[i].title, description: post[i].description, category: post[i].category.name};
            listPosts.push(postObj);
        }
    }
    console.log(listPosts);
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
                    aria-labelledby
                    rows={listPosts}
                    columns={columns}
                    pageSize={100}
                    rowsPerPageOptions={[10]}
                    onCellClick={handleCellClick}
                    onRowClick={handleRowClick}
                    components={{
                    Toolbar: GridToolbar
                    }}
                />
            </Box>
        </Box>
    );
}
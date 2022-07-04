import React, { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, TextField, Link, Typography, Toolbar, Button, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    // { field: 'id', headerName: '#', width: 50, marginLeft: 20, description: 'Thứ tự bài viết' },
    { 
        field: 'title', 
        headerName: 'Tiêu đề', 
        width: 250, 
        editable: true,
        description: 'Tiêu đề bài viết',
        disableClickEventBubbling: true,
    },
    { 
        field: 'description', 
        headerName: 'Mô tả', 
        width: 400, 
        editable: true,
        sortable: false,
        description: 'Mô tả ngắn về bài viết',
        disableClickEventBubbling: true,
    },
    { 
        field: 'category', 
        headerName: 'Thể loại', 
        width: 150, 
        editable: true,
        sortable: false,
        description: 'Thể loại bài viết',
        disableClickEventBubbling: true,
    },
    // {
    //     field: 'edit', 
    //     headerName: 'Chỉnh sửa',
    //     editable: false,
    //     sortable: false,
    //     width: 100,
    //     description: 'Chỉnh sửa nội dung',
    //     renderCells: {handleEdit}
    // }
];

const handleEdit = () => {
    on
}
//Demo post
const row = [
    { id:1, title: 'Về nhà ăn cơm mẹ nấu', description: 'Ăn sơn hào muôn phương không bằng về ăn cơm mẹ nấu', category: 'Blog'},
    { id:2, title: 'Biết địch biết ta, trăm trận trăm thắng', description: 'Hãy tìm hiểu đối phương trước khi đối đầu trực diện', category: 'Chiến thuật'},
]

//Get author Id from 
var authorID = null;
if (typeof window !== 'undefined') {
    authorID = localStorage.getItem('authorID');
    // console.log(authorID);
}
else{
    console.log("Error get author ID");
}

export default function MyContents(props) {
    console.log(props);
    const { post } = props.props.props; 
    const { postStatus} = props.props.props;
    var listPosts = [];
    for(let i = 0; i < post.length; i++) {
        if(post[i].author.id == authorID && post[i].status == postStatus) {
            const postObj = {id:i, postid: post[i].id, title: post[i].title, description: post[i].description, category: post[i].category.name};
            listPosts.push(postObj);
        }
    }
    // console.log(listPosts);
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
                    checkboxSelection
                    autoPageSize={true}
                    
                />
            </Box>
        </Box>
    );
}
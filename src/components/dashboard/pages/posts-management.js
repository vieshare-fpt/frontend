import React, { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, TextField, Link, Typography, Toolbar, Button, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'
import { postApi } from 'src/services';

export default function PostManagement(props) {
    const { postStatus, title, post } = props.props.props;
    const mapPostData = ( postData ) => {
    
        const result = postData.map((element) => {
            if(element.status == postStatus) {
                count++;
                const postObj = {   
                    id:(count), 
                    postId: element.id, 
                    author: element.author.name,
                    title: element.title, 
                    description: element.description, 
                    category: element.category.name
                };
                return postObj;
            }
        })
        return result.filter(p => p !== undefined);
    }
    let count = 0;
    const [posts, setPosts] = useState(mapPostData(post));
    async function getAllPosts() {
        await postApi.getPosts().then((response) => {
            setPosts(mapPostData(response.data));
        });
    }
    // ----------------------------------------------------------------
    
    useEffect(() => {
        // console.log(posts);
    },[]);

    // console.log(listPosts);
    const columns = [
        { field: 'id', headerName: '#', width: 35, marginLeft: 20, description: 'Thứ tự bài viết' },
        { 
            field: 'title', 
            headerName: 'Tiêu đề', 
            description: 'Tiêu đề bài viết',
            width: 350, 
            editable: false,
        },
        { 
            field: 'author', 
            headerName: 'Tác giả', 
            description: 'Tác giả bài viết',
            width: 170, 
            editable: false,
            sortable: true,
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
            width: 80,
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
            field: 'delete', 
            headerName: 'xóa', 
            description: 'Xóa bài viết',
            editable: false,
            sortable: false,
            width: 80,
            disableClickEventBubbling: true,
            renderCell: (cellValue) => {
                return (
                <Button 
                    color="error" 
                    startIcon={< DeleteIcon />}
                    onClick={(event) => {
                        handleRemove(event, cellValue);
                    }} 
                >
                </Button>
                );
            },
        },
    ];

    const handleRead = (event, cellValue) => {
        location.href = (`/post/${cellValue.row.postId}`);
    }

    // ----------------------------------------------------------------
    // Handle post Operations
    const handleRemove = (event, cellValue) => {
        const id = cellValue.row.postId;
        // console.log(id);
        if(confirm("Bài viết: " + cellValue.row.title + "\n" + "Bạn có chắc chắn muốn xóa bài viết này không?")){
            (async () => {
                await postApi.removePost(id);
            })();
            setTimeout(() => {
                getAllPosts();
            }, 500);
        }
    }

    const handleCellClick = (param, event) => {
        event.stopPropagation();
    };
    
    const handleRowClick = (param, event) => {
        event.stopPropagation();
    };
    // End handle post Operations

    // ----------------------------------------------------------------

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
                    {title}
                </Typography>
            </Toolbar>
            <Box sx={{ 
                height:650, width: '100%',
            }}>
                <DataGrid
                    disableSelectionOnClick
                    rows={posts}
                    columns={columns}
                    pageSize={100}
                    rowsPerPageOptions={[10]}
                    onCellClick={handleCellClick}
                    onRowClick={handleRowClick}
                />
            </Box>
        </Box>
    );
}


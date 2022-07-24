import React, { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PublishIcon from '@mui/icons-material/Publish';
import { Box, Typography, Toolbar, Button, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'
import { postApi, creatorApi } from 'src/services';
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';

const columns = [
    { field: 'id', headerName: '#', width: 50, marginLeft: 20, description: 'Thứ tự bài viết' },
    {
        field: 'title',
        headerName: 'Tiêu đề',
        description: 'Tiêu đề bài viết',
        minWidth: 350,
        flex: 1,
        editable: false,
    },
    {
        field: 'status',
        headerName: 'Tình trạng',
        description: 'Tình trạng của bài viết',
        width: 100,
        editable: false,
        sortable: true,
        renderCell: (cellValue) => {
            const { status } = cellValue.row
            switch (status) {
                case "Delete":
                    return "Đã bị xoá"
                case "Publish":
                    return "Đã phát hành"
                case "Draft":
                    return "Bản nháp"
                default:
                    return "Không rõ"
            }
        },
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
        width: 61,
        renderCell: (cellValue) => {
            return (
                <IconButton
                    onClick={(event) => {
                        handleRead(event, cellValue);
                    }}
                    color="success">
                        < VisibilityIcon />
                </IconButton>
            );
        },
    },
    {
        field: 'edit',
        headerName: 'Sửa',
        description: 'Chỉnh sửa bài viết',
        editable: false,
        sortable: false,
        width: 61,
        disableClickEventBubbling: true,
        renderCell: (cellValue) => {
            return (
                <IconButton
                    color="secondary"
                    disabled={cellValue.row.status === 'Delete'}
                    onClick={(event) => {
                        handleEdit(event, cellValue);
                    }}
                >
                    < EditIcon />
                </IconButton>
            );
        },
    },
    {
        field: 'delete',
        headerName: 'Xóa',
        description: 'Xóa bài viết',
        editable: false,
        sortable: false,
        width: 61,
        disableClickEventBubbling: true,
        renderCell: (cellValue) => {
            return (
                <IconButton
                    color="error"
                    disabled={cellValue.row.status === 'Delete'}
                    onClick={(event) => {
                        handleRemove(event, cellValue);
                    }}
                >
                    < DeleteIcon />
                </IconButton>
            );
        },
    },
    {
        field: 'publish',
        headerName: 'Phát hành',
        description: 'Phát hành bài viết',
        editable: false,
        sortable: false,
        width: 61,
        disableClickEventBubbling: true,
        renderCell: (cellValue) => {
            return (
                <IconButton
                    color="primary"
                    onClick={(event) => {
                        handlePublish(event, cellValue);
                    }}
                >
                    < PublishIcon />
                </IconButton>
            );
        },
    },
];

const myContentsColumns = [columns[0], columns[1], columns[2], columns[3], columns[4], columns[5], columns[6], columns[7]]
const draftContentsColumns = [columns[0], columns[1], columns[2], columns[3], columns[4], columns[6], columns[7], columns[8]]

const handleRead = (event, cellValue) => {
    location.href = (`/post/${cellValue.row.postId}`);
}

const handleEdit = (event, cellValue) => {
    location.href = (`/dashboard/edit-content/${cellValue.row.postId}`);
}

// ----------------------------------------------------------------
// Handle post Operations
const handleRemove = (event, cellValue) => {
    const id = cellValue.row.postId;
    // console.log(id);
    if (confirm("Bài viết: " + cellValue.row.title + "\n" + "Bạn có chắc chắn muốn xóa bài viết này không?")) {
        (async () => {
            await postApi.removePost(id);
        })();
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }
}

const handlePublish = (event, cellValue) => {
    const id = cellValue.row.postId;
    // console.log(id);
    if (confirm("Bài viết: " + cellValue.row.title + "\n" + "Bạn có chắc chắn muốn phát hành bài viết này không?")) {
        (async () => {
            await creatorApi.editPost({
                id,
                status: "Publish"
            })
        })();
        setTimeout(() => {
            location.href = (`/dashboard/my-contents`);
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

export default function MyContents(props) {
    const navigate = useRouter()
    // ----------------------------------------------------------------
    //Get author Id from localStorage
    const user = useSelector(
        (state) => state.persistedReducer.user?.currentUserInfoFull?.userInfo
    );
    const authorID = user.id;
    const { post, postStatus, title, type } = props.props.props;

    var listPosts = [];
    let count = 0;
    for (let i = 0; i < post.length; i++) {
        if (post[i].author.id == authorID && postStatus.includes(post[i].status)) {
            count++;
            const postObj = {
                id: (count),
                postId: post[i].id,
                title: post[i].title,
                description: post[i].description,
                category: post[i].category.name,
                status: post[i].status
            };
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
                    {title}
                </Typography>

                <Button onClick={() => {
                    navigate.push('/dashboard/new-content')
                }}>Bài viết mới</Button>
            </Toolbar>
            <Box sx={{
                height: 650, width: '100%',
            }}>
                <DataGrid
                    disableSelectionOnClick
                    rows={listPosts}
                    columns={type === 0 ? myContentsColumns : draftContentsColumns}
                    pageSize={100}
                    rowsPerPageOptions={[10]}
                    onCellClick={handleCellClick}
                    onRowClick={handleRowClick}
                />
            </Box>
        </Box>
    );
}


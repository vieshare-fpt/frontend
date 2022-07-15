import React, { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'
import { adminApi } from 'src/services';
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';

const columns = [
    { field: 'id', headerName: '#', width: 50, marginLeft: 20, description: 'Thứ tự bài viết' },
    { 
        field: 'name', 
        headerName: 'Họ và tên', 
        width: 250, 
        editable: false,
    },
    { 
        field: 'gender', 
        headerName: 'Giới tính', 
        width: 100, 
        editable: false,
        sortable: true,
    },
    { 
        field: 'status', 
        headerName: 'Trạng thái', 
        width: 150, 
        editable: false,
        sortable: true,
    },
    { 
        field: 'email', 
        headerName: 'Email', 
        width: 300, 
        editable: false,
        sortable: true,
    },
    { 
        field: 'role', 
        headerName: 'Vai trò', 
        width: 100, 
        editable: false,
        sortable: true,
    },
    // {
    //     field: 'read', 
    //     headerName: 'Đọc', 
    //     description: 'Xem chi tiết bài viết',
    //     editable: false,
    //     sortable: false,
    //     width: 80,
    //     renderCell: (cellValue) => {
    //         return (
    //             <Button 
    //                 onClick={(event) => {
    //                     handleRead(event, cellValue);
    //                 }} 
    //                 color="success" 
    //                 startIcon={< VisibilityIcon />}>
    //             </Button>
    //         );
    //     },
    // },
    // {
    //     field: 'edit', 
    //     headerName: 'Sửa', 
    //     description: 'Chỉnh sửa bài viết',
    //     editable: false,
    //     sortable: false,
    //     width: 80,
    //     disableClickEventBubbling: true,
    //     renderCell: (cellValue) => {
    //         return (
    //             <Button 
    //                 color="secondary" 
    //                 startIcon={< EditIcon />}
    //                 onClick={(event) => {
    //                     handleEdit(event, cellValue);
    //                 }} 
    //             >
    //             </Button>
    //         );
    //     },
    // },
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

const handleEdit = (event, cellValue) => {
    location.href = (`/dashboard/edit-content/${cellValue.row.postId}`);
}

// ----------------------------------------------------------------
// Handle post Operations
const handleRemove = (event, cellValue) => {
    const id = cellValue.row.userId;
    // console.log(id);
    if(confirm("Người dùng: " + cellValue.row.name + "\n" + "Bạn có chắc chắn muốn xóa người dùng này không?")){
        (async () => {
            await adminApi.removeUser(id,{
                isDelete: true,
            });
        })();
        setTimeout(() => {
            // window.location.reload();
        }, 500);
    }
}

const handleCellClick = (param, event) => {
    event.stopPropagation();
};
  
const handleRowClick = (param, event) => {
    event.stopPropagation();
};
// End handle user management

// ----------------------------------------------------------------

export default function AdminFeatures(props) {
    const [ users, setUsers ] = useState(null);
    useEffect(() => {
        console.log("Start call Api");
        getAllUsers();
    },[]);

    async function getAllUsers() {
        await adminApi.getUsers().then((response) => {
            // console.log(response.data);
            setUsers(response.data);
        })
    }

    // console.log(users);
    
    var listUsers = [];
    let count = 0;
    console.log(users);
    if(users){
        users.map((element) => {
                        
            if(element.roles.includes('User') || element.roles.includes('Writer') || element.roles.includes('Censor')) {
                console.log(element);
                count++;
                let status;
                if(element.isDelete){
                    console.log("true");
                    status = 'Đã xóa';
                }
                else{
                    console.log("false");
                    status = 'Đang hoạt động';
                }
                const userObj = {   
                    id:(count), 
                    userId: element.id, 
                    name: element.name, 
                    gender: element.gender, 
                    status: status,
                    email: element.email, 
                    role: element.roles,
                };
                listUsers.push(userObj);
            }    
        })
    }    
    // console.log(listUsers);

    return (
        <Box sx={{ 
            height:650, width: '80%',
        }}>
            <DataGrid
                disableSelectionOnClick
                rows={listUsers}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                onCellClick={handleCellClick}
                onRowClick={handleRowClick}
            />
        </Box>
    );
}
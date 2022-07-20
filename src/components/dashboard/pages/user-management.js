import React, { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button } from '@mui/material';
import { DataGrid, GridCellEditCommitParams } from '@mui/x-data-grid'
import { adminApi } from 'src/services';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';

export default function UserManagement(props) {
    const userRoles = ["User", "Writer", "Censor", "Admin"];
    let flag = 0;
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
            field: 'email', 
            headerName: 'Email', 
            width: 220, 
            editable: false,
            sortable: true,
        },
        {
            field: 'role',
            headerName: 'Vai trò',
            type: 'singleSelect',
            width: 120,
            editable: true,
            valueOptions: userRoles,
            
            renderCell: (CellValue) => {
                // console.log(CellValue);
                // handleEditRoles(CellValue);
                
            }
        },
        { 
            field: 'status', 
            headerName: 'Trạng thái', 
            width: 150, 
            editable: false,
            sortable: true,
        },
        {
            field: 'editStatus', 
            headerName: 'Sửa trạng thái', 
            description: 'Sửa trạng thái người dùng',
            editable: false,
            sortable: false,
            width: 120,
            disableClickEventBubbling: true,
            renderCell: (cellValue) => {
                if(cellValue.row.status == 'Dừng hoạt động'){
                    return (
                        <Button 
                            color="error" 
                            startIcon={< AutorenewIcon />}
                            onClick={(event) => {
                                handleEditStatus(event, cellValue);
                            }} 
                        >
                        </Button>
                    );
                }
                else{
                    return (
                        <Button 
                            color="error" 
                            startIcon={< DeleteIcon />}
                            onClick={(event) => {
                                handleEditStatus(event, cellValue);
                            }} 
                        >
                        </Button>
                    );
                }
              },
        },
    ];
    
    // ----------------------------------------------------------------
    // Handle users Management

    const handleEditRoles = (cellValue) => {
        listUsers.map((element) => {
            // console.log(element.role);
            if(cellValue.row.userId === element.userId) {
                const id = cellValue.row.id;
                if(cellValue.row.role != element.role){
                    if(confirm("Người dùng: " + cellValue.row.name + "\n" + "Bạn có chắc chắn muốn cấp quyền " + cellValue.row.role +  " cho người dùng này không?")){
                        (async () => {
                            await adminApi.userManage(id,{
                                roles: cellValue.row.role,
                            });
                        })();
                        setTimeout(() => {
                            getAllUsers();
                        }, 500);
                    }
                }
            }
        })
        
    }
    const handleEditStatus = (event, cellValue) => {
        const id = cellValue.row.userId;
        // console.log(id);
        if(cellValue.row.status == "Đang hoạt động"){
            
            if(confirm("Người dùng: " + cellValue.row.name + "\n" + "Bạn có chắc chắn muốn dừng hoạt động của người dùng này không?")){
                (async () => {
                    await adminApi.userManage(id,{
                        isDelete: true,
                    });
                })();
                setTimeout(() => {
                    getAllUsers();
                }, 500);
            }
        }
        if(cellValue.row.status == "Dừng hoạt động"){
            
            if(confirm("Người dùng: " + cellValue.row.name + "\n" + "Bạn có chắc chắn muốn mở lại hoạt động cho người dùng này không?")){
                (async () => {
                    await adminApi.userManage(id,{
                        isDelete: false,
                    });
                })();
                setTimeout(() => {
                    getAllUsers();
                }, 500);
            }
        }
        
    }
    
    const handleCellClick = (param, event) => {
        event.stopPropagation();
    };
      
    const handleRowClick = (param, event) => {
        event.stopPropagation();
    };
    
    const handleEdit = (params, event, details) => {
        console.log(params, event, details);
        if(params.field.includes('role')){
            listUsers.map((element) => {
                if(element.id === params.id){
                    console.log(element.name);
                    if(element.role != params.value){
                        console.log("Changed");
                        if(confirm("Người dùng: " + element.name + "\n" + "Bạn có chắc chắn muốn cấp quyền " + params.value + " cho người dùng này không?")){
                            (async () => {
                                await adminApi.userManage(element.userId,{
                                    roles: params.value,
                                });
                            })();
                            setTimeout(() => {
                                getAllUsers();
                            }, 500);
                        }
                    }
                }
            })
        }
        
    };
    // End handle user management
    
    // ----------------------------------------------------------------
    
    const [ users, setUsers ] = useState(null);
    useEffect(() => {
        // console.log("Start call Api");
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
    // console.log(users);
    if(users){
        users.map((element) => {
            if( element.roles.includes('User') || element.roles.includes('Writer') || element.roles.includes('Censor') ) {
                count++;
                let status;
                if(element.isDelete){
                    // console.log("true");
                    status = 'Dừng hoạt động';
                }
                else{
                    // console.log("false");
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
            height:650, width:{ sm: '100%', md: '95%', lg: '90%'},
        }}>
            <h3>Quản Lý Người Dùng</h3>
            <DataGrid
                disableSelectionOnClick
                rows={listUsers}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                onCellClick={handleCellClick}
                onRowClick={handleRowClick}
                onCellEditCommit={handleEdit}
            />
        </Box>
    );
}
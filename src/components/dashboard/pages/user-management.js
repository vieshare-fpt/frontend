import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'
import { adminApi } from 'src/services';
import AutorenewIcon from '@mui/icons-material/Autorenew';

export default function UserManagement(props) {
    const { userData, token, refreshToken, title } = props.props.props;
    const mapUserData = (data) => {
        let count = 0;
        const result = data.map((element) => {
            if( element.roles.includes('User') || element.roles.includes('Writer') || element.roles.includes('Censor') ) {
                count++;
                let status;
                if(element.isDelete){
                    status = 'Dừng hoạt động';
                }
                else{
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
                return userObj;
            }    
        })
        return result.filter(p => p !== undefined);    
    }
    const [ users, setUsers ] = useState(mapUserData(userData));
    useEffect(() => {

    },[]);
    async function getAllUsers() {
        await adminApi.getUsers( token, refreshToken ).then((response) => {
            setUsers(mapUserData(response.data));
        })
    }
    
    const [open, setOpen] = useState(false);
    const [oldRole, setOldRole] = useState(null);
    const [newRole, setNewRole] = useState(null);
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event) => {
        setNewRole(event.target.value);
    };
    const columns = [
        { field: 'id', headerName: '#', width: 50, marginLeft: 20, description: 'Thứ tự bài viết' },
        { 
            field: 'name', 
            headerName: 'Họ và tên', 
            width: 200, 
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
            width: 80,
            editable: false,
            sortable: true,
        },
        {
            field: 'editRoles', 
            headerName: 'Sửa vai trò', 
            description: 'Sửa vai trò người dùng',
            editable: false,
            sortable: false,
            width: 100,
            disableClickEventBubbling: true,
            
            renderCell: (CellValue) => {
                
                return(
                    <>
                        <Button 
                            color="primary" 
                            startIcon={< ManageAccountsIcon />}
                            onClick={(event) => {
                                setNewRole(null);
                                setOpen(true);
                                setOldRole(CellValue);
                            }} 
                        >
                        </Button>
                        
                    </>
                )
            },
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
    // Users Management
    const handleEditRoles = (id, newRole) => {
        //(newRole);
        if(JSON.stringify(newRole).includes("null")){
            //("false");
            alert("Chọn vai trò trước khi cập nhật");
        }
        else{
            users.map((element) => {
                // //(element);
                if(element.userId == id){
                    //(JSON.stringify(element.role));
                    if( !JSON.stringify(element.role).includes(newRole)){
                        //("Changed");
                        if(confirm("Người dùng: " + element.name + "\n" + "Vai trò cũ: " + element.role + "\nBạn có chắc chắn muốn cấp quyền " + newRole + " cho người dùng này không?")){
                            (async () => {
                                await adminApi.userManage(element.userId,{
                                    roles: newRole,
                                });
                            })();
                            setTimeout(() => {
                                getAllUsers();
                            }, 500);
                        }
                    }
                    else {
                        alert("Chọn vai trò trước khi cập nhật");
                    }
                }
            })
        }
        handleClose();
        getAllUsers();
    };
    const handleEditStatus = (event, cellValue) => {
        const id = cellValue.row.userId;
        // //(id);
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
        
    };
    
    const handleCellClick = (param, event) => {
        event.stopPropagation();
    };
      
    const handleRowClick = (param, event) => {
        event.stopPropagation();
    };
    
    // End handle user management
    // ----------------------------------------------------------------

    // //(oldRole);
    return (
        <Box 
        sx={{ 
            height:650, width:{ sm: '100%', md: '95%', lg: '90%'}, marginBottom: 10, display: 'flex', alignItems: 'stretch', flexDirection: 'column', marginLeft: 5,
        }}
        >
            <h2>{title}</h2>
            <DataGrid
                disableSelectionOnClick
                rows={users}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                onCellClick={handleCellClick}
                onRowClick={handleRowClick}
            />
            
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Cập nhật vai trò</DialogTitle>
                <DialogContent>
                    <Typography>Tên người dùng: {oldRole?.row?.name}</Typography>
                    <DialogContentText> Chọn vai trò: </DialogContentText>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            defaultValue={oldRole?.row?.role || null} 
                            open={open}
                            onChange={handleChange}
                        >
                            <FormControlLabel value = "User" control={<Radio />} label="User"/>
                            <FormControlLabel value = "Writer" control={<Radio />} label="Writer"/>
                            <FormControlLabel value = "Censor" control={<Radio />} label="Censor"/>
                            <FormControlLabel value = "Admin" control={<Radio />} label="Admin"/>
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button 
                    onClick= {() => {
                        handleEditRoles(oldRole?.row?.userId, newRole);
                    }}
                    >Cập nhật</Button>
                    <Button onClick={handleClose}>Thoát</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

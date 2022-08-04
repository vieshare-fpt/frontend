import * as React from 'react';
import { Box, Button, IconButton} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Loader from 'src/components/common/Loader';
import { toast, ToastContainer } from "react-toastify";
import {writerBonusApi} from 'src/services'
import { DataGrid } from '@mui/x-data-grid';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Moment from 'moment';

export default function IncomeStats(props) {
    const [ bonus, setBonus ] = React.useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        getAllBonusStats();
    },[]);

    const mapBonusData = (data) => {
        let count = 0;
        const result = data.map((element) => {
            count++;
            let status;
            if(element.status == "Processing" || element.status == "Ready"){
                if(element.status == "Processing"){
                    status = 'Đang tính toán';
                }
                else{
                    status = 'Tính thành công';
                }
                const bonusObj = {   
                    id:(count), 
                    bonusId: element.id, 
                    bonusFormulaId: element.bonusFormulaId, 
                    from: Moment(element.from).format('DD/MM/YYYY'), 
                    postId: element.postId,
                    status: status,
                    to: Moment(element.to).format('DD/MM/YYYY'), 
                    views: element.views,
                };
                return bonusObj; 
            }  
        })
        return result.filter(p => p !== undefined);    
    }

    if (!bonus) {
        return <Loader />
    }

    async function getAllBonusStats() {
        await writerBonusApi.getBonus()
            .then((response) => {
                console.log("34", response.data)
                setBonus(mapBonusData(response.data));
            });
    }
    //Columns
    const columns = [
        { field: 'id', headerName: '#', width: 50, marginLeft: 20, description: 'Thứ tự' },
        {
            field: 'bonusId',
            headerName: 'Mã tiền thưởng',
            minWidth: 300,
            flex: 1,
            editable: false,
        },
        {
            field: 'bonusFormulaId',
            headerName: 'Mã công thức',
            minWidth: 300,
            flex: 1,
            editable: false,
        },
        {
            field: 'from',
            headerName: 'Từ ngày',
            description: 'Ngày bắt đầu tính toán',
            minWidth:100,
            maxWidth: 120,
            flex: 1,
            editable: false,
        },
        {
            field: 'to',
            headerName: 'Đến ngày',
            description: 'Ngày kết thúc tính toán',
            minWidth:100,
            maxWidth: 120,
            flex: 1,
            editable: false,
        },
        {
            field: 'status',
            headerName: 'Tình trạng',
            description: 'Tình trạng tính toán tiền thưởng',
            width: 150,
            editable: false,
            sortable: true,
        },
        {
            field: 'views',
            headerName: 'Lượt xem',
            description: 'Số lượt xem của bài viết',
            width: 100,
            editable: false,
            sortable: true,
        },
        {
            field: 'push',
            headerName: 'Cộng tiền thưởng',
            description: 'Cộng tiền thưởng vào thu nhập',
            editable: false,
            sortable: false,
            width: 130,
            renderCell: (cellValue) => {
                return (
                    <IconButton
                        onClick={(event) => {
                            console.log(cellValue.row.bonusId);
                            if(cellValue.row.status.includes("Đang tính toán")){
                                toast.error("Đang trong quá trình tính toán", {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
                            }
                            else{
                                if(confirm("Bạn có chắc muốn cộng tiền thưởng vào thu nhập?")){
                                    try{
                                        (async () => {
                                            await writerBonusApi.postBonus(cellValue.row.bonusId,);
                                        })();
                                    }catch(err){
                                        toast.error("Cộng tiền thất bại", {
                                            position: "top-right",
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                        });
                                    }
                                    
                                }
                                toast.success("Cộng tiền thành công", {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
                            }
                            getAllBonusStats();
                        }}
                        color="success">
                            <AttachMoneyIcon/>
                    </IconButton>
                );
            },
        },
        
    ];

    const handleCellClick = (param, event) => {
        event.stopPropagation();
    };
      
    const handleRowClick = (param, event) => {
        event.stopPropagation();
    };
    
    return (

        <React.Fragment>
            <Box
                sx={{m:1, height: 700,}}
            >
                <h2>Tình trạng tiền thưởng</h2>
                <DataGrid
                    disableSelectionOnClick
                    rows={bonus}
                    columns={columns}
                    pageSize={15}
                    rowsPerPageOptions={[10]}
                    onCellClick={handleCellClick}
                    onRowClick={handleRowClick}
                />
            </Box>
            
        </React.Fragment>

    );
}

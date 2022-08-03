import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import {
  DataGrid,
  GridOverlay,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { coverLetterApi, infoUserApi, transactionApi } from "src/services";
import { subscriptionApi } from "src/services/subsciptionApi";

function Table({ data, isLoading, handleClick }) {
  const styles = {
    borderRadius: "3px",
    padding: "16px",
    ".MuiDataGrid-columnHeaders": {
      borderRadius: "8px 8px 6px 6px",
      backgroundColor: green[600],
      color: "white",
    },

    ".MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus": {
      outline: " solid green 1px;",
    },
    ".MuiDataGrid-columnHeader:focus-within, .MuiDataGrid-cell:focus-within": {
      outline: "solid green 1px;",
    },
  };
  const logo = {
    ".MuiSvgIcon-root": {
      color: "green",
    },
  };
  const columns = [
    {
      field: "id",
      headerName: "Mã đơn",
      width: 200,
      sortable: false,
      valueGetter: (params) => {
        return params.row.id;
      },
    },
    {
      field: "userId",
      headerName: "Mã người dùng",
      width: 200,
      sortable: false,
      valueGetter: (params) => {
        return params.row.userId;
      },
    },
    {
      field: "createDate",
      headerName: "Ngày nộp",
      width: 180,
      type: "dateTime",
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "positionApply",
      headerName: "Vị trí ứng tuyển",
      width: 150,
      valueGetter: (params) => params.row.positionApply,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 150,
      valueGetter: (params) => params.row.status,
    },
    {
      field: "action",
      headerName: "Hành động",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="success"
          sx={{ textTransform: "none", borderRadius: 16, boxShadow: "none" }}
          onClick={(e) => handleClick(e, params)}
        >
          Duyệt đơn
        </Button>
      ),
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ my: 2 }}>
        <Box sx={{ flexGrow: 1 }} />

        <GridToolbarQuickFilter
          placeholder="Tìm kiếm"
          color="success"
          sx={logo}
        />
      </GridToolbarContainer>
    );
  }
  function customNoRowsOverlay() {
    return (
      <GridOverlay>
        {isLoading ? (
          <>
            <CircularProgress color="success" />
          </>
        ) : (
          <>
            {data !== null && data.length === 0 && (
              <Typography>Chưa có ai nộp đơn :(</Typography>
            )}
          </>
        )}
      </GridOverlay>
    );
  }
  const compontents = {
    Toolbar: CustomToolbar,
    NoRowsOverlay: customNoRowsOverlay,
  };
  return (
    <Box sx={{ height: 700 }}>
      <DataGrid
        rows={data === null ? [] : data}
        columns={columns}
        sx={styles}
        components={compontents}
        color="success"
        disableColumnMenu
        autoPageSize
        disableSelectionOnClick
      />
    </Box>
  );
}

function SimpleDialog(props) {
  const { onClose, open, data, onSubmit, userInfo } = props;

  console.log();
  const handleClose = () => {
    onClose(false);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog fullWidth={true} onClose={handleClose} sx={{}} open={open}>
      <DialogTitle>Duyệt đơn</DialogTitle>
      <DialogContent>
        <Typography variant="h5">Tên: {userInfo?.name}</Typography>
        <Box sx={{ my: 2 }}>
          <Typography>
            <strong>Vai trò:</strong>
            {userInfo?.roles ? userInfo?.roles[0] : "Unknow"}
          </Typography>
          <Typography>
            <strong>Tiêu đề:</strong> {data.row?.title}
          </Typography>
          <DialogContentText id="alert-dialog-description">
            <strong>Nội dung:</strong> {data.row?.content}
          </DialogContentText>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          color="success"
          variant="contained"
          onClick={() => onSubmit(data.row.id, "Accepted")}
        >
          Chấp thuận
        </Button>
        <Button color="success" variant="contained" onClick={() => onSubmit(data.row.id, "Rejected")}>
          Từ chối
        </Button>
        <Button color="success" variant="outlined" onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
}
export default function CoverLetter() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [letter, setLetter] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const handleClick = (e, value) => {
    e.preventDefault();
    (async () => {
      setIsLoading(true);
      await infoUserApi
        .infoId(value.row.userId)
        .then((response) => {
          setUserInfo(response);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    })();
    setLetter(value);
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleSubmit = (id, value) => {
    (async () => {
      setIsLoading(true);
      await coverLetterApi
        .verifyCoverLetter({
          coverLetterId: id,
          status: value,
        })
        .then((response) => {
          console.log(response.data);
          toast.success("Duyệt thành công", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setOpen(false);
          setIsLoading(false);
          (async () => {
            setIsLoading(true);
            await coverLetterApi
              .getAllCoverLetter()
              .then((response) => {
                console.log(response.data);
                setData(response.data);
                setIsLoading(false);
              })
              .catch((error) => {
                setIsLoading(false);
                console.log(error);
              });
          })();
        })
        .catch((error) => {
          toast.error("Duyệt thất bại", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setIsLoading(false);
        });
    })();
  };
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await coverLetterApi
        .getAllCoverLetter()
        .then((response) => {
          console.log(response.data);
          setData(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    })();
  }, []);

  let page = (
    <Container maxWidth="xl">
      <Box sx={{ width: "100%" }}>
        <Table
          handleClick={handleClick}
          data={data}
          isLoading={isLoading}
          onChange={(event) => setType(event.target.value)}
        />
        <SimpleDialog
          onSubmit={handleSubmit}
          data={letter}
          userInfo={userInfo}
          open={open}
          onClose={handleClose}
        />
      </Box>
    </Container>
  );
  // page = authorization.reader(profile, page, router);
  return page;
}

import {
  Box,
  Button,
  CircularProgress,
  Container,
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
import { transactionApi } from "src/services";
import { subscriptionApi } from "src/services/subsciptionApi";
import { authorization } from "src/utils/authorization";

function Table({ data, isLoading, type, onChange, user }) {
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
      headerName: "Mã giao dịch",
      width: 400,
      sortable: false,
      valueGetter: (params) => {
        return params.row.id;
      },
    },
    {
      field: "date",
      headerName: "Ngày giao dịch",
      width: 180,
      type: "dateTime",
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "amount",
      headerName: "Mệnh giá",
      width: 150,
      valueGetter: (params) =>
        new Intl.NumberFormat("vi", {
          style: "currency",
          currency: "VND",
        }).format(params.row.amount),
    },

    {
      field: "type",
      headerName: "Loại",
      width: 150,
      valueGetter: (params) =>
        params.row.type === "DEPOSIT" ? "Nạp tiền" : "Rút tiền",
    },
    {
      field: "__bank__.name",
      headerName: "Ngân hàng",
      width: 150,
      type: "dateTime",
      valueGetter: (params) => params.row.__bank__?.name,
    },
  ];
  const columnsSubscription = [
    {
      field: "package.id",
      headerName: "Mã Ví",
      width: 400,
      sortable: false,
      valueGetter: (params) => {
        console.log(params.row.package?.id)
        return params.row.package?.id;
      },
    },
    {
      field: "date",
      headerName: "Ngày giao dịch",
      width: 180,
      type: "dateTime",
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "package.price",
      headerName: "Mệnh giá",
      width: 150,
      valueGetter: (params) =>
        new Intl.NumberFormat("vi", {
          style: "currency",
          currency: "VND",
        }).format(params.row.package?.price),
    },
    {
      field: "package.name",
      headerName: "Tên gói",
      width: 150,
      valueGetter: (params) =>
        params.row.package?.name,
    },
    {
      field: "package.expiresAfterNumberOfDays",
      headerName: "Thời hạn",
      width: 150,
      type: "dateTime",
      valueGetter: (params) => params.row.package?.expiresAfterNumberOfDays + " ngày",
    },
  ];
  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ my: 2 }}>
        <FormControl sx={{ minWidth: 120, display: user ? "none" : "flex" }}>
          <InputLabel color="success" id="demo-simple-select-label">
            Loại
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Loại"
            color="success"
            onChange={onChange}
          >
            <MenuItem value="DEPOSIT">Nạp tiền</MenuItem>
            <MenuItem value="WITHDRAW">Rút tiền</MenuItem>
            <MenuItem value="SUBSCRIPTION">Gói đã mua</MenuItem>
          </Select>
        </FormControl>
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
              <Typography>Chưa thực hiện giao dịch nào :(</Typography>
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
        columns={type !== "SUBSCRIPTION" ? columns : columnsSubscription}
        sx={styles}
        components={compontents}
        getRowId={row => type !== "SUBSCRIPTION" ? row.id : row.package.id}
        color="success"
        disableColumnMenu
        autoPageSize
        disableSelectionOnClick
      />
    </Box>
  );
}

export default function HistoryTransaction({ profile }) {
  const isAccess = profile.roles.includes("Writer");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [type, setType] = useState(isAccess ? "WITHDRAW" : "DEPOSIT");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      if (type !== "SUBSCRIPTION") {
        await transactionApi
          .getTransaction({
            type: type,
          })
          .then((response) => {
            setData(response.data);
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            console.log(error);
          });
      } else {
        await subscriptionApi
          .getSubscriptions()
          .then((response) => {
            console.log(response.data);
            setData(response.data);
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            console.log(error);
          });
      }
    })();
  }, [type]);

  let page = (
    <Box sx={{ minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Box sx={{ width: "100%" }}>
          <Table
            user={isAccess}
            data={data}
            isLoading={isLoading}
            type={type}
            onChange={(event) => setType(event.target.value)}
          />
        </Box>
      </Container>
    </Box>
  );
  page = authorization.reader(profile, page, router);
  return page;
}

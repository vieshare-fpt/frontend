import React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { green } from "@mui/material/colors";

const styles = {
    borderRadius: "16px",
    padding: "16px",
  ".MuiDataGrid-columnHeaders": {
    borderRadius: '8px',
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
export function Table(props) {
  const { data, columns} = props;

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ my: 2 }}>
        <Typography variant="h5">Bài viết đã đọc</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <GridToolbarQuickFilter placeholder="Tìm kiếm" color="success" sx={logo} />
      </GridToolbarContainer>
    );
  }
  const compontents = {
    Toolbar: CustomToolbar,
  };

  return (
    <div
      style={{
        height: 700,
        width: "100%",
      }}
    >
      <DataGrid
        rows={data}
        columns={columns}
        sx={styles}
        components={compontents}
        color="success"
        disableColumnMenu
        autoPageSize
        disableSelectionOnClick
      />
    </div>
  );
}

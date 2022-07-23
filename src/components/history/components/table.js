import React from "react";
import {
  DataGrid,
  GridOverlay,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Box, CircularProgress, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
const styles = {
  borderRadius: "16px",
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
export function Table(props) {
  const { data, columns, isLoading } = props;
  console.log(data);
  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ my: 2 }}>
        <Typography variant="h5">Bài viết đã đọc</Typography>
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
              <Typography>Chưa xem bài nào :(</Typography>
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
    <div
      style={{
        height: 700,
        width: "100%",
      }}
    >
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
    </div>
  );
}

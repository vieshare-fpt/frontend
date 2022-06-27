import { Drawer } from "@mui/material";
import React from "react";
const drawerWidth = "100%";

export function DrawerMobile(props) {
  const {
    handleSearchBox,
    handleMobile,
    open,
    openSearchBox,
    list,
    searchBox,
  } = props;
  return (
    <>
      <Drawer
        variant="temporary"
        open={open}
        anchor="top"
        onClose={handleMobile}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {list}
      </Drawer>

      <Drawer
        variant="temporary"
        open={openSearchBox}
        anchor="top"
        onClose={handleSearchBox}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {searchBox}
      </Drawer>
    </>
  );
}

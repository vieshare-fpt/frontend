import { Drawer } from "@mui/material";
import React from "react";
const drawerWidth = "100%";

export function DrawerMobile(props) {
  const {
    handleDrawerSearchBox,
    handleDrawerMobile,
    handleDrawerContact,
    openDrawerMobile,
    openSearchBox,
    openDrawerContact,
    listDrawer,
    listDrawerContact,
    searchBox,
  } = props;
  return (
    <>
      <Drawer
        variant="temporary"
        open={openDrawerMobile}
        anchor="top"
        onClose={handleDrawerMobile}
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
        {listDrawer}
      </Drawer>

      <Drawer
        variant="temporary"
        open={openSearchBox}
        anchor="top"
        onClose={handleDrawerSearchBox}
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

      <Drawer
        variant="temporary"
        open={openDrawerContact}
        anchor="top"
        onClose={handleDrawerContact}
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
        {listDrawerContact}
      </Drawer>
    </>
  );
}

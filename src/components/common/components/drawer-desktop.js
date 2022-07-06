import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import { IconButton } from "@mui/material";
import Logo from "./logo";
import MenuIcon from "@mui/icons-material/Menu";


const drawerWidth = 206;

const openedMixin = (theme) => ({
  width: drawerWidth,
  border: "none",
  boxShadow: "none",

  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  border: "none",

  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DrawerTemporary = styled(MuiDrawer)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...{
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  },
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export function DrawerDesktop(props) {
  const { open, list, onClose, openDrawerTemporary, asPath } = props;

  return (
    <Box sx={{ display: { xs: "none", md: `flex` } }}>
      {asPath ? (
        <DrawerTemporary
          anchor="left"
          open={openDrawerTemporary}
          onClose={onClose}
        >
          <DrawerHeader>
            <IconButton onClick={onClose} sx={{ marginRight: "5px" }}>
              <MenuIcon color="success" />
            </IconButton>
            <Logo />
            <Box
              sx={{
                marginLeft: "25px",
              }}
            />
          </DrawerHeader>
          {list}
        </DrawerTemporary>
      ) : (
        <Drawer variant="permanent" open={open}>
          <DrawerHeader />
          {list}
        </Drawer>
      )}
    </Box>
  );
}

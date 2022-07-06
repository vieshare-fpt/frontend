import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import { styles, ToolBarDesktop } from "./components";
import { UserPopup } from "./components";
import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ToolBarMobile } from "./components";
import { DrawerMobile } from "./components";
import SearchIcon from "@mui/icons-material/Search";
import { pages } from "./components";
import { DrawerDesktop } from "./components";
import {
  getUserInfoLimitFalse,
  getUserInfoLimitStart,
  getUserInfoLimitSuccess,
} from "src/stores/userSlice";
import { infoUserApi } from "src/services";
import { useRouter } from "next/router";
import { getCookieData } from "src/services/cookies";
import { setOpen } from "src/stores/drawerSlice";
const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export function Navigation({ children }) {
  // const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchBoxOpen, setMobileSearchBoxOpen] = useState(false);
  const open = useSelector(
    (state) => state.drawer.data?.open
  );
  let result = pages;
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(
    (state) => state.persistedReducer.user?.currentUserInfoFull?.userInfo
  );
  // useEffect(() => {
  //   if (getCookieData("token")) {
  //     (async () => {
  //       dispatch(getUserInfoLimitStart());
  //       await infoUserApi
  //         .info()
  //         .then((response) => {
  //           dispatch(getUserInfoLimitSuccess(response.data));
  //         })
  //         .catch(function (error) {
  //           dispatch(getUserInfoLimitFalse());
  //         });
  //     })();
  //   }
  // }, [dispatch]);

  const handleSubmit = (e) => {
    console.log("a");
  };
  const handleDrawer = () => {
    dispatch(setOpen(!open))
  };
  const handleDrawerMobile = () => {
    setMobileOpen(!mobileOpen);
    setMobileSearchBoxOpen(false);
  };
  const handleDrawerSearchBoxMobile = () => {
    setMobileSearchBoxOpen(!mobileSearchBoxOpen);
    setMobileOpen(false);
  };

  if (user?.isPremium) {
    result = pages.filter((page) => page.key !== 2);
  }

  if (user?.roles.includes("Writer")) {
    localStorage.setItem("authorID", user.id)
    result = pages.filter((page) => page.key !== 1);
  }
  const access = (
    <>
      {user ? (
        <UserPopup
          type={user.isPremium}
          fullname={user.name}
          avatar={user.avatar}
          email={user.email}
        />
      ) : (
        <Stack direction="row" spacing={2}>
          <Link href="/login">
            <Button
              color="success"
              variant="outlined"
              sx={{ textTransform: "none", borderRadius: 16 }}
            >
              Đăng nhập
            </Button>
          </Link>
        </Stack>
      )}
    </>
  );

  const drawer = (
    <List sx={{ padding: 0 }}>
      <Box sx={styles.box(open)}>
        {result.map((subpage) => (
          <ListItem
            key={subpage.key}
            selected={subpage.url === router.asPath}
            disablePadding
            sx={styles.listItem}
          >
            <Link href={subpage.url}>
              <ListItemButton sx={styles.listItemButton(open)}>
                <ListItemIcon sx={styles.listItemIcon(open)}>
                  {subpage.icon}
                </ListItemIcon>
                <ListItemText
                  primary={subpage.name}
                  sx={styles.listItemText(open)}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </Box>

      <ListItem>
        <Typography sx={styles.footer(open)}>
          <span>
            <Link href="/history">
              <a>Privacy Policy |</a>
            </Link>
            <Link href="/">
              <a> Terms & Conditions</a>
            </Link>
          </span>
          <br />
          @Copyright © 2022 Team 1.
        </Typography>
      </ListItem>
    </List>
  );

  const drawerMobile = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {result.map((text) => (
          <ListItem key={text.key} disablePadding>
            <Link href={text.url}>
              <ListItemButton>
                <ListItemIcon>{text.icon}</ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const drawerSearchMobile = (
    <div>
      <Toolbar /> {/*Create space from the top for align search box*/}
      <Divider />
      <List sx={{ textAlign: "center" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            color="success"
            id=""
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="success" />
                </InputAdornment>
              ),
            }}
            sx={styles.drawerSearchMobile}
          />
        </form>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={styles.appBar}>
        <Toolbar variant="regular" sx={{ px: "12px" }}>
          <ToolBarDesktop
            onSubmit={handleSubmit}
            onClick={handleDrawer}
            access={access}
          />
          <ToolBarMobile
            onClick={handleDrawerMobile}
            onClickSearchBox={handleDrawerSearchBoxMobile}
            access={access}
          />
        </Toolbar>
      </AppBar>

      <DrawerDesktop open={open} list={drawer} />
      <DrawerMobile
        handleSearchBox={handleDrawerSearchBoxMobile}
        handleMobile={handleDrawerMobile}
        open={mobileOpen}
        openSearchBox={mobileSearchBoxOpen}
        list={drawerMobile}
        searchBox={drawerSearchMobile}
      />

      <Box component="main" sx={{ flexGrow: 1, pt: 3, pb: 0 }}>
        {children}
      </Box>
    </Box>
  );
}

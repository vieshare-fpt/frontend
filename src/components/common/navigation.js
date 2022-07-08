import React, { useState } from "react";
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
import LoginIcon from "@mui/icons-material/Login";
import Link from "next/link";
import { devTeamPage, styles, ToolBarDesktop } from "./components";
import { UserPopup } from "./components";
import {
  Button,
  IconButton,
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

import { useRouter } from "next/router";
import { setOpen } from "src/stores/drawerSlice";
import { setCurrentSearchValue } from "src/stores/postSlice";
const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export function Navigation({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(
    (state) => state.persistedReducer.user?.currentUserInfoFull?.userInfo
  );
  const searchValue = useSelector((state) => state.post?.data.currentSearchValue)
  const [openDrawerMobile, setOpenDrawerMobile] = useState(false);
  const [openDrawerTemporary, setOpenDrawerTemporary] = useState(false);
  const [openMobileSearchBox, setOpenMobileSearchBox] = useState(false);
  const [openDrawerContact, setOpenDrawerContact] = useState(false);
console.log();
  
  const handleChange = (e) => {
    dispatch(setCurrentSearchValue(e.target.value));
  };
  const handleSubmit = (e) => {
    if (searchValue.payload !== "") {
      router.push(`/results?search=${searchValue.payload}`);
    }
    e.preventDefault();
  };

  const open = useSelector((state) => state.drawer.data?.open);
  let result = pages;
  const url = {
    post: "/post/",
  };

  const asPath =
    router.asPath.includes(url.post) ||
    devTeamPage.some((element) => element.url === router.asPath);


  //close drawer when clicked a button of drawer
  const handleClick = (url) => {
    if (asPath) setOpenDrawerTemporary(!openDrawerTemporary);
    router.push(url);
  };
  //open or close drawer when clicked outside of drawer
  const handleDrawerTemporary = () => {
    setOpenDrawerTemporary(!openDrawerTemporary);
  };
  //open or close drawer when clicked menuIcon
  const handleDrawer = () => {
    if (!asPath) {
      dispatch(setOpen(!open));
    } else {
      setOpenDrawerTemporary(!openDrawerTemporary);
    }
  };
  const handleDrawerMobile = () => {
    setOpenDrawerMobile(!openDrawerMobile);
    setOpenMobileSearchBox(false);
    setOpenDrawerContact(false);
  };
  const handleDrawerSearchBoxMobile = () => {
    setOpenMobileSearchBox(!openMobileSearchBox);
    setOpenDrawerMobile(false);
    setOpenDrawerContact(false);
  };
  const handleDrawerContacts = () => {
    setOpenDrawerContact(!openDrawerContact);
    setOpenDrawerMobile(false);
    setOpenMobileSearchBox(false);
  };
  if (user?.isPremium) {
    result = pages.filter((page) => page.key !== 2);
  }

  if (user?.roles.includes("Writer")) {
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
          <Box sx={{ display: { sm: "flex", md: "none" } }}>
            <Link href="/login">
              <IconButton color="success" variant="outlined">
                <LoginIcon />
              </IconButton>
            </Link>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link href="/login">
              <Button
                color="success"
                variant="outlined"
                sx={{ textTransform: "none", borderRadius: 16 }}
              >
                Đăng nhập
              </Button>
            </Link>
          </Box>
        </Stack>
      )}
    </>
  );

  const drawer = (styles) => {
    return (
      <List sx={{ padding: 0 }}>
        <Box sx={styles.box(open, asPath)}>
          {result.map((subpage, index) => (
            <ListItem
              key={subpage.key}
              selected={subpage.url === router.asPath}
              disablePadding
              sx={styles.listItem}
            >
              <ListItemButton
                onClick={() => handleClick(subpage.url)}
                sx={styles.listItemButton(open, asPath)}
              >
                <ListItemIcon sx={styles.listItemIcon(open, asPath)}>
                  {subpage.icon}
                </ListItemIcon>
                <ListItemText
                  primary={subpage.name}
                  sx={styles.listItemText(open, asPath)}
                />
              </ListItemButton>
              {index === 2 ? (
                <Divider variant="inset" textAlign="left" />
              ) : (
                <></>
              )}
            </ListItem>
          ))}
        </Box>

        <ListItem>
          <Typography sx={styles.footer(open, asPath)}>
            <span>
              <Link href="/history">
                <a>Privacy Policy |</a>
              </Link>
              <Link href="/">
                <a> Terms & Conditions</a>
              </Link>
            </span>
            <br />
            @Copyright © 2022 VieShare.
          </Typography>
        </ListItem>
      </List>
    );
  };

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
  const drawerContact = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {devTeamPage.map((text) => (
          <ListItem key={text.key} disablePadding>
            <Link href={text.url}>
              <ListItemButton>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={styles.appBar}>
        <Toolbar variant="dense" sx={{ px: "14px", height: "64px" }}>
          <ToolBarDesktop
            onSubmit={handleSubmit}
            onChange={handleChange}
            onClick={handleDrawer}
            value={searchValue.payload}
            access={access}
            router={router}
          />
          <ToolBarMobile
            onClickDrawerMobile={handleDrawerMobile}
            onClickDrawerSearchBox={handleDrawerSearchBoxMobile}
            onClickDrawerContacts={handleDrawerContacts}
            access={access}
          />
        </Toolbar>
      </AppBar>

      <DrawerDesktop
        url={url}
        asPath={asPath}
        open={open}
        router={router}
        openDrawerTemporary={openDrawerTemporary}
        list={drawer(styles)}
        onClose={handleDrawerTemporary}
      />
      <DrawerMobile
        handleDrawerSearchBox={handleDrawerSearchBoxMobile}
        handleDrawerMobile={handleDrawerMobile}
        handleDrawerContact={handleDrawerContacts}
        openDrawerMobile={openDrawerMobile}
        openDrawerContact={openDrawerContact}
        openSearchBox={openMobileSearchBox}
        listDrawer={drawerMobile}
        listDrawerContact={drawerContact}
        searchBox={drawerSearchMobile}
      />

      <Box component="main" sx={{ flexGrow: 1, pt: 3, pb: 0 }}>
        {children}
      </Box>
    </Box>
  );
}

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
import {
  pageNotDrawer,
  styles,
  subPageCensor,
  subPageSupport,
  subPageUser,
  subPageUserFree,
  subPageUserPremium,
  subPageWriter,
  supportSubPage,
  ToolBarDesktop,
  UserMenu,
} from "./components";
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

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export function Navigation({ children }) {
  const dispatch = useDispatch();

  const router = useRouter();
  const user = useSelector(
    (state) => state.persistedReducer.user?.currentUserInfoFull?.userInfo
  );
  const open = useSelector((state) => state.drawer.data?.open);

  // const searchValue = useSelector(
  //   (state) => state.post?.data.currentSearchValue
  // );
  const [openDrawerMobile, setOpenDrawerMobile] = useState(false);
  const [openDrawerTemporary, setOpenDrawerTemporary] = useState(false);
  const [openMobileSearchBox, setOpenMobileSearchBox] = useState(false);
  const [openDrawerContact, setOpenDrawerContact] = useState(false);
  const [trackingSearchValue, setTrackingSearchValue] = useState("");
  let result = subPageUserFree;

  const url = {
    post: "/post/",
    profileWriter: "/profile-writer/",
  };
  const asPath =
    router.asPath.includes(url.post) ||
    router.asPath.includes(url.profileWriter) ||
    pageNotDrawer.some((element) => element.url === router.asPath);

  if (user?.roles.includes("Writer")) {
    result = subPageWriter;
  } else if (user?.roles.includes("Censor")) {
    result = subPageCensor;
  } else if (user?.isPremium) {
    result = subPageUserPremium;
  }

  const handleChange = (e) => {
    setTrackingSearchValue(e.target.value);
    console.log(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (trackingSearchValue !== "") {
      setOpenMobileSearchBox(false);
      router.push(`/results?search=${trackingSearchValue}`);
    }
  };
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

  const access = (
    <>
      {user ? (
        <UserMenu
          type={user.isPremium}
          roles={user.roles}
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
          <Stack direction="row" sx={{ px: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ boxShadow: "none", borderRadius: "6px 0 0 6px" }}
            >
              <SearchIcon />
            </Button>
            <TextField
              color="success"
              placeholder="Search"
              InputProps={{
                value: trackingSearchValue,
                onChange: handleChange,
              }}
              sx={styles.drawerSearchMobile}
            />
          </Stack>
        </form>
      </List>
    </div>
  );
  const drawerContact = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {subPageSupport.map((text) => (
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
        <Toolbar
          variant="dense"
          disableGutters
          sx={{ px: "14px", height: "64px" }}
        >
          <ToolBarDesktop
            onSubmit={handleSubmit}
            onChange={handleChange}
            onClick={handleDrawer}
            value={trackingSearchValue}
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

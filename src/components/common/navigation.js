import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import { ToolBarDesktop } from "./components";
import { UserPopup } from "./components";
import { Button, InputAdornment, Stack, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ToolBarMobile } from "./components";
import { DrawerMobile } from "./components";
import SearchIcon from "@mui/icons-material/Search";
import { pages } from "./components";
import { DrawerDesktop } from "./components";
import { getUserInfoLimitFalse, getUserInfoLimitStart, getUserInfoLimitSuccess } from "src/stores/userSlice";
import { infoUserApi } from "src/services";



const AppBar = styled(
  MuiAppBar,
  {}
)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export  function Navigation({children}) {
  const [open, setOpen] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileSearchBoxOpen, setMobileSearchBoxOpen] = React.useState(false);
  let result = pages;
  const dispatch = useDispatch();

  const user = useSelector(
    (state) => state.user.currentUserInfoLimit?.userInfo
  );
  React.useEffect(() => {
    (async () => {
      dispatch(getUserInfoLimitStart());
      await infoUserApi
        .info()
        .then((response) => {
          dispatch(getUserInfoLimitSuccess(response.data));
        })
        .catch(function (error) {
          dispatch(getUserInfoLimitFalse());
        });
    })();
  }, []);

  const handleSubmit = (e) => {
    console.log("a");
  };
  const handleDrawer = () => {
    setOpen(!open);
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
    result = pages.filter((page) => page.key !== 1);
  }

  if (user?.roles.includes("Writer")) {
    result = pages.filter((page) => page.key !== 0);
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
              sx={{ textTransform: "none", borderRadius: 16 }}
            >
              Sign in
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              variant="outlined"
              color="success"
              sx={{ textTransform: "none", borderRadius: 16 }}
            >
              Sign up
            </Button>
          </Link>
        </Stack>
      )}
    </>
  );

  const drawer = (
    <List>
      <Box sx={{ minHeight: open ? "calc(86vh)" : "" }}>
        {result.map((subpage) => (
          <ListItem key={subpage.key} disablePadding sx={{ display: "block" }}>
            <Link href={subpage.url}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {subpage.icon}
                </ListItemIcon>
                <ListItemText
                  primary={subpage.nameNav}
                  sx={{ opacity: open ? 1 : 0, color: "#2e7d32" }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </Box>

      <ListItem>
        <Typography
          sx={{
            opacity: open ? 1 : 0,
            color: "rgb(62, 80, 96)",
            fontSize: "11px",
          }}
        >
          <span>
            <Link href="/history">
              <a style={{ opacity: open ? 1 : 0 }}>Privacy Policy |</a>
            </Link>
            <Link href="/">
              <a style={{ opacity: open ? 1 : 0 }}> Terms & Conditions</a>
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
                <ListItemText primary={text.nameNav} />
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
      <Toolbar />
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
            sx={{
              width: "95%",

              [`& fieldset`]: {
                borderRadius: 8,
              },
              [`&:hover fieldset`]: {},
            }}
          />
        </form>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{
          background: "white",
          boxShadow: "none",
          borderBottom: "1px solid #E7EBF0",
        }}
      >
        <Toolbar variant="regular" disableGutters sx={{ px: "12px" }}>
          <ToolBarDesktop onSubmit={handleSubmit} onClick={handleDrawer} access={access} />
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

      <Box component="main" sx={{ flexGrow: 1, pt:3 , pb:3 }}>

        {children}
      </Box>
    </Box>
  );
}

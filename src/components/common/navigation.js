import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { Container } from "@mui/system";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "./components/styles-searchbox";
import { UserPopup } from "./components/user-popup";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserInfoLimitFalse,
  getUserInfoLimitStart,
  getUserInfoLimitSuccess,
} from "src/stores/userSlice";
import { infoUserApi } from "src/services";
import { devTeamPage, DrawerDesktop, DrawerMobile, pages } from "./components";


const theme = createTheme({});

const logo = (
  <Link href="/">
    <Typography
      component="a"
      sx={{
        color: "Green",
        fontSize: "25px",
        fontFamily: "Salsa",
        cursor: "pointer",
      }}
    >
      VieShare
    </Typography>
  </Link>
);
const AppBarMUI = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export function Navigation({children}) {
  const [open, setOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileSearchBoxOpen, setMobileSearchBoxOpen] = React.useState(false);

  //   const window = null
  // const container =
  //   window !== undefined ? () => window().document.body : undefined;
  const dispatch = useDispatch();
  const user = useSelector(
    (state) => state.user.currentUserInfoLimit?.userInfo
  );

  let result = pages;

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
  const handleDrawer = () => {
    setOpen(!open);
  };
  const handleDrawerToggleMobile = () => {
    setMobileOpen(!mobileOpen);
    setMobileSearchBoxOpen(false);
  };
  const handleDrawerSearchBoxToggleMobile = () => {
    setMobileSearchBoxOpen(!mobileSearchBoxOpen);
    setMobileOpen(false);
  };
  const handleSubmit = (e) => {
    console.log("a");
  };

  if (user?.isPremium) {
    result = pages.filter((page) => page.key !== 1);
  }

  if (user?.roles.includes("Writer")) {
    result = pages.filter((page) => page.key !== 0);
  }

  const searchForm = (
    <form onSubmit={handleSubmit} style={{ marginRight: "10px" }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Tìm kiếm..."
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </form>
  );
  const linkPage = devTeamPage.map((subpage) => {
    return (
      <Link key={subpage.key} href={subpage.url}>
        <Button
          color="success"
          sx={{
            fontSize: "16px",
            borderRadius: 8,
            color: "",
            textTransform: "none",
          }}
        >
          {subpage.nameNav}
        </Button>
      </Link>
    );
  });

  const access = (effectOne, effectTwo) => {
    return (
      <Box sx={{ display: { xs: `${effectOne}`, md: `${effectTwo}` } }}>
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
      </Box>
    );
  };

  const drawer = (
    <List>
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
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBarMUI
            position="fixed"
            // color="transparent" elevation={0}

            style={{
              background: "white",
              boxShadow: "none",
              // borderBottom: "1px solid #E7EBF0",
            }}
          >
            <Toolbar variant="regular" disableGutters sx={{ px: "12px" }}>
              {/* desktop open */}
              <Box sx={{ display: { xs: "none", md: `flex` } }}>
                <IconButton onClick={handleDrawer} sx={{ marginRight: "20px" }}>
                  <MenuIcon color="success" />
                </IconButton>
                {logo}

                <Typography
                  component="p"
                  sx={{
                    color: "#E7EBF0",
                    fontWeight: 200,
                    fontSize: "30px",
                    marginLeft: "40px",
                  }}
                >
                  |
                </Typography>
                {linkPage}
              </Box>

              {/* searchbox mobile open */}
              <Box sx={{ display: { xs: "flex", md: "none", flexGrow: 1 } }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  sx={{ ml: "0" }}
                  onClick={handleDrawerToggleMobile}
                >
                  <MenuIcon color="success" />
                </IconButton>
                <IconButton onClick={handleDrawerSearchBoxToggleMobile}>
                  <SearchIcon color="success" />
                </IconButton>
              </Box>

              <Box sx={{ flexGrow: { xs: "none", md: 1 } }} />

              {/* logo mobile Open */}
              <Box sx={{ display: { xs: "flex", md: `none`, flexGrow: 1 } }}>
                {logo}
              </Box>

              {/* desktop open */}
              <Box sx={{ display: { xs: "none", md: `flex` } }}>
                {/* SearchBox */}
                {searchForm}
                {/* button access */}
                {access("none", "flex")}
              </Box>

              {/* mobile open*/}
              {access("flex", "none")}
            </Toolbar>
          </AppBarMUI>
        </Box>
        <Box>
          {/* <DrawerDesktop  handle={handleDrawer} open={open} list={drawer} /> */}
          <DrawerDesktop open={open} list={drawer} />
          <DrawerMobile
            handleSearchBox={handleDrawerSearchBoxToggleMobile}
            handleMobile={handleDrawerToggleMobile}
            open={mobileOpen}
            openSearchBox={mobileSearchBoxOpen}
            // container={container}
            list={drawerMobile}
            searchBox={drawerSearchMobile}
          />
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, background: "rgba(242, 242, 242, .5)" }}
        >
            {children}

        </Box>
      </Box>
    </ThemeProvider>
  );
}

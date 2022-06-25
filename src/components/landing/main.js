import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AttributionIcon from "@mui/icons-material/Attribution";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
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
import { getCookieData } from "src/services/cookies";
import {
  getUserInfoLimitFalse,
  getUserInfoLimitStart,
  getUserInfoLimitSuccess,
} from "src/stores/userSlice";
import {  infoUserApi } from "src/services";

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
const drawerWidth = "100%";
const AppBarMUI = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export default function NavBarTop(prop) {
  const { props, CurrentComponent, window } = prop;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileSearchBoxOpen, setMobileSearchBoxOpen] = React.useState(false);
  //   const window = null
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const dispatch = useDispatch();
  const user = useSelector(
    (state) => state.user.currentUserInfoLimit?.userInfo
  );
  const pages = [
    {
      key: 0,
      nameNav: "Trở thành tác giả",
      icon: <AttributionIcon />,
      url: "/content-writer",
    },
    {
      key: 1,
      nameNav: "Mua Premium",
      icon: <WorkspacePremiumIcon />,
      url: "/pricing",
    },
  ];
  let result = pages;

  React.useEffect(() => {
    const token = getCookieData("token");
    (async () => {
      dispatch(getUserInfoLimitStart());
      await infoUserApi
        .info(token)
        .then((response) => {
          dispatch(getUserInfoLimitSuccess(response.data));
        })
        .catch(function (error) {
          dispatch(getUserInfoLimitFalse());
        });
    })();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    setMobileSearchBoxOpen(false);
  };
  const handleDrawerSearchBoxToggle = () => {
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
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </form>
  );
  const linkPage = result.map((subpage) => {
    return (
      <Link key={subpage.nameNav} href={subpage.url}>
        <Button
          color="success"
          sx={{
            fontSize: "16px",
            ml: 1,
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

  const drawerSearch = (
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
          <Container maxWidth="xl" disableGutters>
            <Toolbar variant="regular">
              {/* desktop open */}
              <Box sx={{ display: { xs: "none", md: `flex` } }}>{logo}</Box>
              <Box sx={{ display: { xs: "none", md: `flex` } }}>{linkPage}</Box>
              {/* searchbox mobile open */}
              <Box sx={{ display: { xs: "flex", md: "none", flexGrow: 1 } }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon color="success" />
                </IconButton>
                <IconButton onClick={handleDrawerSearchBoxToggle}>
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
          </Container>
        </AppBarMUI>
      </Box>

      <Box>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          anchor="top"
          onClose={handleDrawerToggle}
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
          {drawer}
        </Drawer>

        <Drawer
          container={container}
          variant="temporary"
          open={mobileSearchBoxOpen}
          anchor="top"
          onClose={handleDrawerSearchBoxToggle}
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
          {drawerSearch}
        </Drawer>
      </Box>
      <CurrentComponent props={props} />
    </ThemeProvider>
  );
}

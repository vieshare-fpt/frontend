import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Link from "next/link";
import { IconButton, styled } from "@mui/material";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import { UserMenu } from "../common/components";
import { useRouter } from "next/router";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
const drawerWidth = 240;

export default function ResponsiveDrawer(props) {
  const { window, CurrentComponent } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter();
  const user = useSelector(
    (state) => state.persistedReducer.user.currentUserInfoFull.userInfo
  );

  console.log(CurrentComponent);
  const roles = user?.roles;

  if (user === null) {
    router.push("/login");
    return;
  } else {
    if (!(roles.includes("Admin") || roles.includes("Writer") || roles.includes("Censor"))) {
      router.push("/");
      return;
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  let subPages = [];
  const subPagesWriter = [
    {
      name: "Thống kê",
      icon: EqualizerIcon,
      link: "/dashboard",
    },
    {
      name: "Bài viết của tôi",
      icon: TextSnippetIcon,
      link: "/dashboard/my-contents",
    },
    { name: "Thu nhập", icon: AttachMoneyIcon, link: "/dashboard/income" },
    {
      name: "Bản nháp",
      icon: DesignServicesIcon,
      link: "/dashboard/draft-contents",
    },
    { name: "Hồ sơ", icon: AccountBoxIcon, link: "/dashboard/info" },
  ];

  const subPagesAdmin = [
    {
      name: "Thống kê",
      icon: EqualizerIcon,
      link: "/dashboard",
    },
    {
      name: "Người dùng",
      icon: PeopleAltIcon,
      link: "/dashboard/user-management",
    },
    { name: "Hồ sơ", icon: AccountBoxIcon, link: "/dashboard/info" },
  ];

  const subPagesCensor = [
    {
      name: "Quản lý bài viết",
      icon: TextSnippetIcon,
      link: "/dashboard/posts-management",
    },
    {
      name: "Trang bài viết",
      icon: AutoStoriesIcon,
      link: "/",
    },
    { name: "Hồ sơ", icon: AccountBoxIcon, link: "/dashboard/info" },
  ];

  if (roles.includes("Admin")) {
    subPages = subPagesAdmin;
  } else if (roles.includes("Censor")) {
    subPages = subPagesCensor;
  } else {
    subPages = subPagesWriter;
  }

  const MyLogo = styled(Typography)({
    color: "forestgreen",
    fontFamily: "Salsa",
    fontSize: "36px",
    fontWeight: "400",
    lineHeight: "44px",
    letterSpacing: "0em",
    textAlign: "left",
  });

  const drawer = (
    <div>
      <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
        <MyLogo>VieShare</MyLogo>
      </Toolbar>
      <Divider />
      <List>
        {subPages.map((item) => (
          <Link href={item.link} key={item.link}>
            <ListItem key={item.link} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "red",
          boxShadow: "none",
          background: "rgba(255,255,255,0.7)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon color="success" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <UserMenu
            type={user.isPremium}
            roles={user.roles}
            fullname={user.name}
            avatar={user.avatar}
            email={user.email}
          />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Toolbar />
        <CurrentComponent
          handleDrawerToggle={handleDrawerToggle}
          props={props}
          roles={roles}
        ></CurrentComponent>
      </Box>
    </Box>
  );
}

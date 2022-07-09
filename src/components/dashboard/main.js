import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Link from 'next/link';
import { styled } from '@mui/material';
const drawerWidth = 240;

export default function ResponsiveDrawer(props) {
  const { window, CurrentComponent } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  console.log(CurrentComponent);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const subPages = [
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
    { name: "Hồ sơ", icon: AccountBoxIcon, link: "/dashboard/writer-info" },
  ];

  const MyLogo = styled(Typography)({
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
        <MyLogo>
          <Link href="/" sx={{ textDecoration: "auto", color: "forestgreen" }}>
            VieShare
          </Link>
        </MyLogo>
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
        }}
      ></AppBar>
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
      <CurrentComponent
        handleDrawerToggle={handleDrawerToggle}
        props={props}
      ></CurrentComponent>
    </Box>
  );
}

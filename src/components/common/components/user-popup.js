import React from "react";
import Tooltip from "@mui/material/Tooltip";
import {
  Avatar,
  Box,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import { green, teal } from "@mui/material/colors";
import { removeCookieData, getCookieData } from "src/services/cookies";
import { accessApi } from "src/services";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  clearInfoFailed,
  clearInfoStart,
  clearInfoSuccess,
} from "src/stores/userSlice";

const paper = {
  elevation: 0,
  sx: {
    borderRadius: 3,
    width: "400px",
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,

    "& .MuiMenuItem-root:not(#flash)": {
      ml: "5px",
      my: 2,
    },
  },
};

const features = [
  {
    name: "Lịch sử của tôi",
    url: "/",
  },
  {
    name: "Gia hạn Premium",
    url: "/",
  },
  {
    name: "Chỉnh sửa thông tin",
    url: "/profile",
  },
];
export function UserPopup({ fullname, email, avatar, type }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    const refreshToken = getCookieData("refreshToken");
    dispatch(clearInfoStart());
    (async () => {
      await accessApi
        .logout(refreshToken)
        .then(function (response) {
          console.log(response);
          dispatch(clearInfoSuccess());
          removeCookieData("token");
          removeCookieData("refreshToken");
          // window.location.reload();
        })
        .catch((error) => {
          dispatch(clearInfoFailed());

          console.error(error);
        });
    })();
  };

  return (
    <div>
      <Tooltip title="Settings" sx={{ p: "4px" }}>
        <IconButton
          onClick={handleClick}
          sx={{ width: "40px", height: "40px" }}
        >
          <Avatar src={avatar} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={paper}
      >
        <Box sx={{ px: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              margin: "10px 10px",
            }}
          >
            <Image
              src={type ? "/premium.svg" : "/free.svg"}
              alt=""
              width={100}
              height={30}
            />
            <Box sx={{ flexGrow: 1 }} />
            <Typography
              sx={{
                color: green[800],
                fontSize: 15,
                ":hover": {
                  color: teal[800],
                },
              }}
              variant="h6"
              color="initial"
            >
              <Button onClick={handleLogout}>Đăng xuất</Button>
            </Typography>
          </div>
          <Divider />
          <MenuItem>
            <Avatar sx={{ width: 70, height: 70 }} src={avatar} />
            <div style={{ marginLeft: 10 }}>
              <Typography variant="h2" sx={{ fontSize: "20px" }}>
                {fullname}
              </Typography>
              <Typography
                variant="h3"
                sx={{ fontSize: "16px", margin: "6px 0px" }}
              >
                {email}
              </Typography>
            </div>
          </MenuItem>
          <Divider />
          {features.map((feature) => (
            <MenuItem key={feature.name}>
              <Link href={feature.url}>{feature.name}</Link>
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </div>
  );
}

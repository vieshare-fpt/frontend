import React from "react";
import Tooltip from "@mui/material/Tooltip";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import { green, teal } from "@mui/material/colors";
import { removeCookieData } from "src/services/cookies";
import { accessApi } from "src/services";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { clearInfoStart, clearInfoSuccess } from "src/stores/userSlice";
import { Router, useRouter } from "next/router";
import catchError from "src/utils/catchError";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AttributionTwoToneIcon from "@mui/icons-material/AttributionTwoTone";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import { setTab } from "src/stores/tabSlice";
import { setCurrentCategory } from "src/stores/categorySlice";

export function UserMenu({ fullname, email, avatar, type, roles }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const dispatch = useDispatch();
  const isAdmin = roles.includes("Admin");
  const isWriter = roles.includes("Writer");
  const isCensor = roles.includes("Censor");
  const isAdminOrCensor = roles.includes("Admin") || roles.includes("Censor");
  let userType = (
    <Image
      src={type ? "/premium.svg" : "/free.svg"}
      alt=""
      width={100}
      height={30}
    />
  );

  if (roles != null) {
    if (isAdmin) {
      userType = (
        <>
          <AdminPanelSettingsIcon sx={{ mx: 1 }} color="success" />
          <Typography>Quản trị viên</Typography>
        </>
      );
    } else if (isWriter) {
      userType = (
        <>
          <AttributionTwoToneIcon sx={{ mx: 1 }} color="success" />
          <Typography>Người sáng tạo</Typography>
        </>
      );
    } else if (isCensor) {
      userType = (
        <>
          <SupervisedUserCircleIcon sx={{ mx: 1 }} color="success" />
          <Typography>Giám sát viên</Typography>
        </>
      );
    }
  }

  const features = [
    {
      name: "Lịch sử giao dịch",
      url: (isAdmin || isWriter) ? "/dashboard/info":"/profile",
      value: "history"
    },
    {
      name: "Ví tiền",
      url: (isAdmin || isWriter) ? "/dashboard/info":"/profile",
      value: "wallet"
    }
  ];

  const paper = {
    elevation: 0,
    sx: {
      overflow: "visible",
      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
      width: "456px",
      height: isAdminOrCensor
        ? { xs: "164px", sm: "164px" }
        : { xs: "280px", sm: "250px" },
      mt: 1.5,
      borderRadius: 3,
      "& .MuiAvatar-root": {
        width: 70,
        height: 70,
        ml: -0.5,
        mr: 1,
      },
      "&:before": {
        content: '""',
        display: "block",
        position: "absolute",
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: "background.paper",
        transform: "translateY(-50%) rotate(45deg)",
        zIndex: 0,
      },
    },
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfile = () => {
    if (isAdmin || isWriter) {
      router.push("/dashboard/info");
    } else if (isCensor) {
      router.push("/dashboard/info");
    } else {
      dispatch(setTab("information"))
      router.push("/profile");
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(clearInfoStart());
    (async () => {
      await accessApi
        .logout()
        .then(function (response) {
          console.log(response);
          removeCookieData("token");
          removeCookieData("refreshToken");
          router.push("/login");
          dispatch(setTab("information"))
          dispatch(setCurrentCategory(null))
          dispatch(clearInfoSuccess());
        })
        .catch((error) => {
          catchError(error, dispatch, router);
        });
    })();
  };
  const handleFeature = (event, feature, value) => {
    event.preventDefault();
    dispatch(setTab(value))
    router.push(feature)
  }
  return (
    <div>
      <Tooltip title="Tài khoản" sx={{ p: "4px" }}>
        <IconButton
          onClick={handleClick}
          sx={{ width: "40px", height: "40px" }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar src={avatar} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
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
            {userType}

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
              <Button onClick={handleLogout} color="success">
                Đăng xuất
              </Button>
            </Typography>
          </div>
          <Divider />
          <MenuItem onClick={handleProfile} sx={{ mt: 1 }}>
            <Avatar src={avatar} />
            <div style={{ marginLeft: 10 }}>
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: "15px", md: "20px" } }}
              >
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
          {!isAdminOrCensor &&
            features.map((feature) => (
              <MenuItem key={feature.name} onClick={(e)=>handleFeature(e,feature.url, feature.value)}>
                {feature.name}
              </MenuItem>
            ))}
        </Box>
      </Menu>
    </div>
  );
}

import AttributionIcon from "@mui/icons-material/Attribution";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { green } from "@mui/material/colors";
import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from "@mui/icons-material/Home";
export const subPageUserFree = [
  {
    key: 0,
    name: "Trang chủ",
    icon: <HomeIcon sx={{ color: green[700] }} />,
    url: "/",
  },
  {
    key: 1,
    name: "Trở thành tác giả",
    icon: <AttributionIcon sx={{ color: green[700] }} />,
    url: "/register-writer",
  },
  {
    key: 2,
    name: "Mua Premium",
    icon: <WorkspacePremiumIcon sx={{ color: green[700] }} />,
    url: "/pricing",
  },
  {
    key: 3,
    name: "Bài viết đã đọc",
    icon: <HistoryIcon sx={{ color: green[700] }} />,
    url: "/history",
  },
];

export const subPageUserPremium = [
  {
    key: 0,
    name: "Trang chủ",
    icon: <HomeIcon sx={{ color: green[700] }} />,
    url: "/",
  },
  {
    key: 1,
    name: "Trở thành tác giả",
    icon: <AttributionIcon sx={{ color: green[700] }} />,
    url: "/register-writer",
  },
  {
    key: 2,
    name: "Bài viết đã đọc",
    icon: <HistoryIcon sx={{ color: green[700] }} />,
    url: "/history",
  },
];

export const subPageWriter = [
  {
    key: 0,
    name: "Trang chủ",
    icon: <HomeIcon sx={{ color: green[700] }} />,
    url: "/dashboard",
  },

];

export const subPageCensor = [
  {
    key: 0,
    name: "Trang chủ",
    icon: <HomeIcon sx={{ color: green[700] }} />,
    url: "/dashboard/posts-management",
  },
];

export const subPageSupport = [
  {
    key: 1,
    name: "Liên hệ",
    url: "/contact",
  },
  {
    key: 2,
    name: "Về chúng tôi",
    url: "/about",
  },

];

export const pageNotDrawer  = [
  {
    key: 1,
    url: "/contact",
  },
  {
    key: 2,
    url: "/about",
  },
  {
    key: 3,
    url: "/register-writer",
  },
  {
    key: 4,
    url: "/profile-writer/:path*",
  },
]
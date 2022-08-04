import AttributionIcon from "@mui/icons-material/Attribution";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { green } from "@mui/material/colors";
import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from "@mui/icons-material/Home";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PeopleIcon from '@mui/icons-material/People';
export const subPageUserFree = [
  {
    key: 0,
    name: "Trang chủ",
    icon: <HomeIcon sx={{ color: green[700] }} />,
    url: "/",
  },
  {
    key: 1,
    name: "Đang theo dõi",
    icon: <PeopleIcon sx={{ color: green[700] }} />,
    url: "/following",
  },
  {
    key: 2,
    name: "Trở thành tác giả",
    icon: <AttributionIcon sx={{ color: green[700] }} />,
    url: "/register-writer",
  },
  {
    key: 3,
    name: "Mua Premium",
    icon: <WorkspacePremiumIcon sx={{ color: green[700] }} />,
    url: "/pricing",
  },
  {
    key: 4,
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
    name: "Đang theo dõi",
    icon: <PeopleIcon sx={{ color: green[700] }} />,
    url: "/following",
  },
  {
    key: 2,
    name: "Trở thành tác giả",
    icon: <AttributionIcon sx={{ color: green[700] }} />,
    url: "/register-writer",
  },
  {
    key: 3,
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
    name: "Quản lý bài viết",
    icon: <TextSnippetIcon sx={{ color: green[700] }} />,
    url: "/dashboard/posts-management",
  },
  {
    key: 1,
    name: "Trang bài viết",
    icon: <AutoStoriesIcon sx={{ color: green[700] }} />,
    url: "/",
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
  {
    key: 5,
    url: "/pricing",
  },
  {
    key: 5,
    url: "/payment",
  },
]
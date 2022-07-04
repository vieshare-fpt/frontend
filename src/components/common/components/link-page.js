import AttributionIcon from "@mui/icons-material/Attribution";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { green } from "@mui/material/colors";
import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from '@mui/icons-material/Home';
export const pages = [
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
    url: "/content-writer",
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

export const devTeamPage = [
  {
    key: 0,
    name: "Góp ý",
    url: "/",
  },
  {
    key: 1,
    name: "Liên hệ",
    url: "/",
  },
  {
    key: 3,
    name: "Về chúng tôi",
    url: "/",
  },
];

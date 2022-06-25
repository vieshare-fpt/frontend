import AttributionIcon from "@mui/icons-material/Attribution";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
export const pages = [
  {
    key: 0,
    nameNav: "Trở thành tác giả",
    icon: <AttributionIcon/>,
    url: "/content-writer",
  },
  {
    key: 1,
    nameNav: "Mua Premium",
    icon: <WorkspacePremiumIcon/>,
    url: "/pricing",
  },
];

export const accounts = [
  { nameNav: "Đăng nhập", url: "/login" },
  { nameNav: "Đăng ký", url: "/signup" },
];

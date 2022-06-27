import AttributionIcon from "@mui/icons-material/Attribution";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { green } from "@mui/material/colors";

export const pages = [
    {
      key: 0,
      nameNav: "Trở thành tác giả",
      icon: <AttributionIcon sx={{color: green[700]}} />,
      url: "/content-writer",
    },
    {
      key: 1,
      nameNav: "Mua Premium",
      icon: <WorkspacePremiumIcon sx={{color: green[700]}} />,
      url: "/pricing",
    },
  ];


export const devTeamPage = [
    {
        key: 0,
        nameNav: "Góp ý",
        url: "/",
      },
      {
        key: 1,
        nameNav: "Liên hệ",
        url: "/",
      },
      {
        key: 3,
        nameNav: "Về chúng tôi",
        url: "/",
      },
]
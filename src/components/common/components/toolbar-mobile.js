import { Box, IconButton } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import EmojiPeopleRoundedIcon from "@mui/icons-material/EmojiPeopleRounded";
import Logo from "./logo";

export function ToolBarMobile(props) {
  const {
    onClickDrawerMobile,
    access,
    onClickDrawerSearchBox,
    onClickDrawerContacts,
  } = props;

  return (
    <>
      <Box sx={{ display: { xs: "flex", md: "none", flexGrow: 0 } }}>
        <IconButton onClick={onClickDrawerMobile} sx={{ marginRight: "5px" }}>
          <MenuIcon color="success" />
        </IconButton>
        <IconButton onClick={onClickDrawerSearchBox}>
          <SearchIcon color="success" />
        </IconButton>
        <IconButton onClick={onClickDrawerContacts}>
          <EmojiPeopleRoundedIcon color="success" />
        </IconButton>
      </Box>
      {/* logo mobile Open */}
      <Box
        sx={{
          display: { xs: "flex", md: `none`, flexGrow: 1 },
          justifyContent: "center",
        }}
      >
        <Logo />
      </Box>
      <Box
        sx={{
          display: { xs: "flex", md: "none", flexGrow: 0 },
          justifyContent: "right",
        }}
      >
        <Box sx={{ height: 40, width: 40 }}></Box>
        <Box sx={{ height: 40, width: 40 }}></Box>
        {access}
      </Box>
    </>
  );
}

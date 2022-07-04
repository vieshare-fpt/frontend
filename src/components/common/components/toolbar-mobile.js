import {
  Box,
  IconButton,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "./logo";



export function ToolBarMobile(props) {
  const { onClick, access, onClickSearchBox } = props;

  return (
    <>
      <Box sx={{ display: { xs: "flex", md: "none", flexGrow: 1 } }}>
        <IconButton onClick={onClick} sx={{ marginRight: "5px" }}>
          <MenuIcon color="success" />
        </IconButton>
        <IconButton onClick={onClickSearchBox}>
          <SearchIcon color="success" />
        </IconButton>
      </Box>
      {/* logo mobile Open */}
      <Box sx={{ display: { xs: "flex", md: `none`, flexGrow: 1 } }}>
      <Logo/>
      </Box>
      <Box sx={{ display: { xs: "flex", md: "none"} }}>
        {access}
      </Box>
    </>
  );
}

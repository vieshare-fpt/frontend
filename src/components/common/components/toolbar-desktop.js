import {
  Box,
  Button,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { devTeamPage } from "./link-page";
import { Search, SearchIconWrapper, StyledInputBase } from "./styles-searchbox";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "./logo";

export function ToolBarDesktop(props) {
  const { onClick, access, onSubmit, router, onChange, value } = props;

  
  const searchForm = (
    <form onSubmit={onSubmit} style={{ marginRight: "10px" }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Tìm kiếm..."
          inputProps={{
            "aria-label": "search",
            name: "search",
            value: value,
            onChange: onChange,
          }}
        />
      </Search>
    </form>
  );

  const handleClick = (e, url) => {
    e.preventDefault();
    router.push(url);
  };

  const linkPage = devTeamPage.map((subpage) => {
    return (
      <div key={subpage.key}>
        <Button
          color="success"
          onClick={(e) => handleClick(e, subpage.url)}
          sx={{
            fontSize: "16px",
            borderRadius: 8,
            color: "",
            textTransform: "none",
          }}
        >
          {subpage.name}
        </Button>
      </div>
    );
  });
  return (
    <>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <IconButton onClick={onClick} sx={{ marginRight: "5px" }}>
          <MenuIcon color="success" />
        </IconButton>
        <Logo />
        <Divider
          sx={{ ml: 3, mr: 2 }}
          orientation="vertical"
          variant="middle"
          flexItem
        />
        {linkPage}
      </Box>
      <Box sx={{ flexGrow: { xs: "none", md: 2 } }} />
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        {/* SearchBox */}
        {searchForm}
        {/* button access */}
        {access}
      </Box>
    </>
  );
}

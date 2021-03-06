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
import { Search, SearchIconWrapper, StyledInputBase } from "./styles-searchbox";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "./logo";
import { subPageSupport } from "./link-page";

export function ToolBarDesktop(props) {
  const { onClick, access, onSubmit, router, onChange, value } = props;

  const searchForm = (
    <Box component="form" onSubmit={onSubmit} style={{ marginRight: "10px" }}>
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
    </Box>
  );

  const handleClick = (e, url) => {
    e.preventDefault();
    router.push(url);
  };

  const linkPage = subPageSupport.map((subpage) => {
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
        <Logo size="28px"/>
        <Divider
          sx={{ ml: "34px", mr: 2 }}
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

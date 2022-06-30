import { Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { devTeamPage } from "./link-page";
import { Search, SearchIconWrapper, StyledInputBase } from "./styles-searchbox";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "./logo";

const linkPage = devTeamPage.map((subpage) => {
  return (
    <Link key={subpage.key} href={subpage.url}>
      <Button
        color="success"
        sx={{
          fontSize: "16px",
          borderRadius: 8,
          color: "",
          textTransform: "none",
        }}
      >
        {subpage.nameNav}
      </Button>
    </Link>
  );
});

export function ToolBarDesktop(props) {
  const { onClick, access, onSubmit } = props;
  const searchForm = (
    <form onSubmit={onSubmit} style={{ marginRight: "10px" }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Tìm kiếm..."
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </form>
  );
  return (
    <>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <IconButton onClick={onClick} sx={{ marginRight: "20px" }}>
          <MenuIcon color="success" />
        </IconButton>
        <Logo />
        <Typography
          component="p"
          sx={{
            color: "#E7EBF0",
            fontWeight: 200,
            fontSize: "30px",
            marginLeft: "40px",
          }}
        >
          |
        </Typography>
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

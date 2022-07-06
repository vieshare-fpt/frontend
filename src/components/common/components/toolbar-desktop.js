import { Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { devTeamPage } from "./link-page";
import { Search, SearchIconWrapper, StyledInputBase } from "./styles-searchbox";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "./logo";


export function ToolBarDesktop(props) {
  const { onClick, access, onSubmit, router } = props;
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

  const handleClick = (e, url) => {
    e.preventDefault();
    router.push(url)
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
        <Typography
          component="p"
          sx={{
            color: "#E7EBF0",
            fontWeight: 200,
            fontSize: "30px",
            marginLeft: "30px",
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

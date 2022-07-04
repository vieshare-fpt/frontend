import { Box } from "@mui/material";
import React from "react";
import { CategoryBar } from "./components";

export default function Main(props) {
  const { prop, CurrentComponent } = props;
  const { categories } = prop;

  return (
    <div >
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          zIndex: 2,
          marginTop: { xs: "30px", sm: "40px", md: "40px" },
        }}
      >
        <CategoryBar categories={categories} />
      </Box>
        <CurrentComponent props={prop} />
    </div>
  );
}

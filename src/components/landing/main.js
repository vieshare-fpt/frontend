import { Box } from "@mui/material";
import React from "react";
import { Navigation } from "../common";
import { MainLayout } from "../layouts";
import { CategoryBar } from "./components";

export default function Main(props) {
  const { prop, CurrentComponent } = props;
  const { categories } = prop;

  return (
    <Navigation>
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
      <MainLayout>
        <CurrentComponent props={prop} />
      </MainLayout>
    </Navigation>
  );
}

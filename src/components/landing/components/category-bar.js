import { AppBar, Chip, Stack, styled, Toolbar } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentCategory } from "src/stores/categorySlice";
const AppBarMUI = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.appBar - 1,
  boxShadow: "none",
}));
import { useRouter } from "next/router";

export function CategoryBar({ categories }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleOnclick = (event, id) => {
    event.preventDefault();
  };

  return (
    <AppBarMUI
      disableGutters
      sx={{
        borderTop: "1px solid #E7EBF0",
        borderBottom: "1px solid #E7EBF0",
        backgroundColor: "white",
        padding: 0,
      }}
      position="static"
    >
      <Toolbar disableGutters variant="dense" sx={{ padding: "0 20px" }}>
        <Stack direction="row" spacing={1}>
          <Chip
            label="All"
            className="chip bg-salmon"
            variant="outlined"
            color="success"
            onClick={(e) => {
              document
                .querySelectorAll(".chip")
                .forEach((el) => el.classList.remove("bg-salmon"));
              e.currentTarget.classList.add("bg-salmon");
              dispatch(setCurrentCategory(null));
            }}
          />

          {categories.map((category) => (
            <div key={category.id}>
              <Chip
                className="chip"
                color="success"
                label={`${category.name}`}
                variant="outlined"
                onClick={(e) => {
                  document
                    .querySelectorAll(".chip")
                    .forEach((el) => el.classList.remove("bg-salmon"));
                  e.currentTarget.classList.add("bg-salmon");
                  dispatch(setCurrentCategory(category.id));
                }}
              />
            </div>
          ))}
        </Stack>
      </Toolbar>
    </AppBarMUI>
  );
}

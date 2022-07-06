import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <>
      <Link href="/">
        <Typography
          component="a"
          sx={{
            color: "Green",
            fontSize: "28px",
            fontFamily: "Salsa",
            cursor: "pointer",
          }}
        >
          VieShare
        </Typography>
      </Link>
    </>
  );
}

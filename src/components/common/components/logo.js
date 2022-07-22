import { Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import Link from "next/link";
import React from "react";

export default function Logo(props) {
  const { size, lineHeight } = props;
  return (
    <Link href="/">
      <Typography
        component="a"
        sx={{
          color: green[500],
          fontSize: size,
          lineHeight: lineHeight,
          fontFamily: "Salsa",
          cursor: "pointer",
        }}
      >
        VieShare
      </Typography>
    </Link>
  );
}

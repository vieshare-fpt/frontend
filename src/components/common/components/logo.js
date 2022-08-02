import { Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function Logo(props) {
  const { size, lineHeight } = props;
  const user = useSelector(
    (state) => state.persistedReducer.user.currentUserInfoFull.userInfo
  )
  let link = "/"
  const isWriter = user?.roles.includes("Writer")
  const isAdmin = user?.roles.includes("Admin")
  const isCensor = user?.roles.includes("Censor")
  if(isWriter || isAdmin) {
    link = "/dashboard"
  } else if(isCensor) {
    link = "/dashboard/posts-management"
  }
  return (
    <Link href={link}>
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

import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, LinearProgress } from "@mui/material";

export function Progress() {
  return (
    <div style={{ textAlign: "center", marginTop: "" }}>
      <LinearProgress color="success" />
    </div>
  );
}

import * as React from "react";
import { Box, LinearProgress } from "@mui/material";

export function Progress() {
  return (
    <div style={{width: '100%', height: '20%' }}>
      <LinearProgress color="success" />
    </div>
  );
}

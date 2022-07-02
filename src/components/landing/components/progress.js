import * as React from "react";
import { Box, LinearProgress } from "@mui/material";

export function Progress() {
  return (
    <div style={{ position: 'absolute', width: '85%', height: '20%', top: 115 }}>
      <LinearProgress color="success" />
    </div>
  );
}

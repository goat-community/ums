import React from "react";

import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import { IconButton } from "@mui/material";

export function LayerSelector() {
  return (
    <IconButton color="primary" sx={{ backgroundColor: "white" }}>
      <LayersOutlinedIcon />
    </IconButton>
  );
}

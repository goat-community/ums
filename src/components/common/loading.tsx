import React from "react";

import { Snackbar } from "@mui/material";

import { useAppSelector } from "@hooks/context";

import * as D from "@constants/design";

export function LoadingWrapper() {
  const loading = useAppSelector((state) => state.network.loading);

  const snack_bar_style = {
    bottom: { xs: D.BOTTOM_BAR_HEIGHT + 20, sm: 0 },
    maxWidth: "75%",
  };

  if (loading) {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        key={"bottom" + "center"}
        open={true}
        message={"Loading, Please wait..."}
        sx={snack_bar_style}
      />
    );
  } else {
    return <></>;
  }
}

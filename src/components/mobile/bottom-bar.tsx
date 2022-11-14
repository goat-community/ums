import React, { type CSSProperties } from "react";
import { Link, useLocation } from "react-router-dom";
import * as DesignConstants from "@constants/design";
import BarChartIcon from "@mui/icons-material/BarChart";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { Typography } from "@mui/material";

export function BottomBar() {
  const path_name = useLocation().pathname;

  function tab_styles(tab_name: string) {
    if (tab_name === path_name) {
      // active tab
      return styles.navigationIconActive;
    }
    return styles.navigationIcon;
  }

  return (
    <section style={styles.navigationContainer}>
      <Link to="/map" style={styles.navigationItem}>
        <FmdGoodIcon sx={tab_styles("/map")} />
        <Typography variant="h6">Map</Typography>
      </Link>
      <Link to="/insight" style={styles.navigationItem}>
        <BarChartIcon sx={tab_styles("/insights")} />
        <Typography variant="h6">Insights</Typography>
      </Link>
    </section>
  );
}

const styles: { [key: string]: CSSProperties } = {
  navigationContainer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: DesignConstants.BOTTOM_BAR_HEIGHT,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 2,
    background:
      "linear-gradient(0deg, rgba(103, 80, 164, 0.08), rgba(103, 80, 164, 0.08)), #FFFBFE",
  },
  navigationItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    color: DesignConstants.BLACK_COLOR,
  },
  navigationIcon: {
    fontSize: "24px",
    marginBottom: "8px",
    color: DesignConstants.SECONDARY_DARK_COLOR,
  },
  navigationIconActive: {
    color: DesignConstants.PRIMARY_COLOR,
    backgroundColor: DesignConstants.HOVER_COLOR,
    width: "64px",
    padding: "4px 0",
    borderRadius: "16px",
  },
};

import React, { type CSSProperties } from "react";
import * as D from "@constants/design";
import Icon from "@images/icon.png";
import MenuIcon from "@mui/icons-material/Menu";

export function SideBar() {
  return (
    <section style={styles.navigationContainer}>
      <MenuIcon sx={styles.menuIcon} />
      <button style={styles.buttonHug}>
        <img src={Icon} alt="icon" width="24" height="24" />
      </button>
    </section>
  );
}

const styles: { [key: string]: CSSProperties } = {
  navigationContainer: {
    width: D.SIDE_BAR_WIDTH,
    padding: "44px 0",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 2,
    gap: "22px",
    background:
      "linear-gradient(0deg, rgba(103, 80, 164, 0.05), rgba(103, 80, 164, 0.05)), #FFFBFE",
  },
  menuIcon: {
    color: D.BLACK_COLOR,
  },
  buttonHug: {
    border: "none",
    width: 56,
    height: 56,
    backgroundColor: D.PRIMARY_COLOR,
    borderRadius: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

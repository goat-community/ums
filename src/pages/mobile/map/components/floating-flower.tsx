import React, { type CSSProperties } from "react";
import * as D from "@constants/design";
import PurpleIcon from "@images/purple_icon.png";

export function FloatingFlower() {
  return (
    <button style={styles.buttonHug}>
      <img src={PurpleIcon} alt="icon" width="24" height="24" />
    </button>
  );
}

const styles: { [key: string]: CSSProperties } = {
  buttonHug: {
    border: "none",
    width: 56,
    height: 56,
    backgroundColor: D.LIGHT_PRIMARY,
    borderRadius: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    bottom: D.BOTTOM_BAR_HEIGHT + 20,
    right: 10,
    boxShadow: "0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3)",
  },
};

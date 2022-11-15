import React, { type CSSProperties } from "react";
import * as D from "@constants/design";

interface DrawerProps {
  open: boolean;
  children: React.ReactNode;
  toggleDrawer: () => void;
}

export function Drawer(props: DrawerProps) {
  if (props.open) {
    return (
      <section style={styles.drawer} className="left-animation">
        {props.children}
      </section>
    );
  }

  return <></>;
}

const styles: { [key: string]: CSSProperties } = {
  drawer: {
    width: D.DRAWER_WIDTH,
    left: D.SIDE_BAR_WIDTH,
    backgroundColor: D.WHITE_COLOR,
    top: 0,
    zIndex: 1,
    height: "100vh",
    padding: "44px 0",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

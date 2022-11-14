/** Layout with bottom bar included */
import React, { type CSSProperties } from "react";
import { BottomBar } from "@components/mobile";
import { BOTTOM_BAR_HEIGHT } from "@constants/design";

interface BottomBarLayoutProps {
  children: React.ReactNode;
}

export function BottomBarLayout(props: BottomBarLayoutProps) {
  return (
    <>
      <div style={styles.content}>{props.children}</div>
      <BottomBar />
    </>
  );
}

const styles: { [key: string]: CSSProperties } = {
  content: {
    marginBottom: BOTTOM_BAR_HEIGHT,
    zIndex: 1,
  },
};

/** Layout with bottom bar included */
import React, { type CSSProperties } from "react";
import { SideBar } from "@components/desktop";
import { BOTTOM_BAR_HEIGHT } from "@constants/design";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export function SideBarLayout(props: SidebarLayoutProps) {
  return (
    <>
      <div style={styles.content}>{props.children}</div>
      <SideBar />
    </>
  );
}

const styles: { [key: string]: CSSProperties } = {
  content: {
    marginBottom: BOTTOM_BAR_HEIGHT,
    zIndex: 1,
  },
};

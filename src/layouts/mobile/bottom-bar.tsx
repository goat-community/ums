import React from "react";
import { BottomBar } from "@components/mobile";

interface BottomBarLayoutProps {
  children: React.ReactNode;
}

export function BottomBarLayout(props: BottomBarLayoutProps) {
  return (
    <>
      {props.children}
      <BottomBar />
    </>
  );
}

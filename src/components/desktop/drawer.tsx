import React from "react";
import styled, { keyframes } from "styled-components";

import * as D from "@constants/design";

interface DrawerProps {
  open: boolean;
  children: React.ReactNode;
  toggleDrawer: () => void;
}

export function Drawer(props: DrawerProps) {
  if (props.open) {
    return <Section>{props.children}</Section>;
  }

  return <></>;
}

const drawer_animation = keyframes`
  from {
    left: 0;
  }
  to {
    left: ${D.SIDE_BAR_WIDTH}px;
  }
`;

const Section = styled.section`
  width: ${D.DRAWER_WIDTH}px;
  left: ${D.SIDE_BAR_WIDTH}px;
  background-color: ${D.WHITE_COLOR};
  top: 0;
  z-index: 1;
  height: 100vh;
  padding: 44px 0;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${drawer_animation} 0.2s;
`;

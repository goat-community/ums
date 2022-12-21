import styled, { keyframes } from "styled-components";

import * as D from "@constants/design";

interface DrawerProps {
  open: boolean;
  children: React.ReactNode;
}

export function Drawer(props: DrawerProps) {
  if (props.open) {
    return <Section>{props.children}</Section>;
  }

  return <></>;
}

const drawer_animation = keyframes`
  from {
    width: 0;
  }
  to {
    width: ${D.DRAWER_WIDTH}px;
  }
`;

const Section = styled.section`
  width: ${D.DRAWER_WIDTH}px;
  background-color: ${D.WHITE_COLOR};
  position: absolute;
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  animation: ${drawer_animation} 0.2s;
`;

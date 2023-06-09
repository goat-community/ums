import styled, { keyframes } from "styled-components";

import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import * as D from "@constants/design";

interface DrawerProps {
  open: boolean;

  on_close: () => void;
  children: React.ReactNode;
}

export function Drawer(props: DrawerProps) {
  if (props.open) {
    return (
      <Section>
        <FloatingClose>
          <IconButton onClick={props.on_close}>
            <Close />
          </IconButton>
        </FloatingClose>
        {props.children}
      </Section>
    );
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
  z-index: 3;
  width: ${D.DRAWER_WIDTH}px;
  background-color: ${D.WHITE_COLOR};
  position: absolute;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  animation: ${drawer_animation} 0.2s;
  border-radius: 0 20px 20px 0;
`;

const FloatingClose = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 4;
`;

import React, { useState } from "react";
import styled from "styled-components";

import MenuIcon from "@mui/icons-material/Menu";

import * as D from "@constants/design";

import Icon from "@images/icon.png";

import { Drawer } from "./drawer";

interface SideBarProps {
  children?: React.ReactNode;
}

export function SideBar(props: SideBarProps) {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const menu_icon_style = { color: D.BLACK_COLOR, cursor: "pointer" };
  function toggleDrawer() {
    setDrawerOpen((prevState) => !prevState);
  }
  return (
    <>
      <Section>
        <MenuIcon sx={menu_icon_style} onClick={toggleDrawer} />
        <Button>
          <img src={Icon} alt="icon" width="24" height="24" />
        </Button>
      </Section>
      <Drawer open={drawerOpen} toggleDrawer={toggleDrawer}>
        {props.children || <></>}
      </Drawer>
    </>
  );
}

const Section = styled.section`
  width: ${D.SIDE_BAR_WIDTH}px;
  padding: 44px 0;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  gap: 22px;
  background: linear-gradient(0deg, rgba(103, 80, 164, 0.05), rgba(103, 80, 164, 0.05)),
    #fffbfe;
`;

const Button = styled.button`
  background-color: ${D.PRIMARY_COLOR};
  border: none;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

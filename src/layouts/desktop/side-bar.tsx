/** Layout with bottom bar included */
import React from "react";
import styled from "styled-components";

import { SIDE_BAR_WIDTH } from "@constants/design";

import { SideBar } from "@components/desktop";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export function SideBarLayout(props: SidebarLayoutProps) {
  return (
    <>
      <SideBar />
      <Section>{props.children}</Section>
    </>
  );
}

const Section = styled.section`
  margin-left: ${SIDE_BAR_WIDTH}px;
  z-index: 1;
`;

/** Layout with bottom bar included */
import React from "react";
import { SideBar } from "@components/desktop";
import { BOTTOM_BAR_HEIGHT } from "@constants/design";
import styled from "styled-components";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export function SideBarLayout(props: SidebarLayoutProps) {
  return (
    <>
      <Section>{props.children}</Section>
      <SideBar />
    </>
  );
}

const Section = styled.section`
  margin-bottom: ${BOTTOM_BAR_HEIGHT}px;
  z-index: 1;
`;

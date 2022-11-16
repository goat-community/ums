/** Layout with bottom bar included */
import React from "react";
import styled from "styled-components";

import { BOTTOM_BAR_HEIGHT } from "@constants/design";

import { BottomBar } from "@components/mobile";

interface BottomBarLayoutProps {
  children: React.ReactNode;
}

export function BottomBarLayout(props: BottomBarLayoutProps) {
  return (
    <>
      <Section>{props.children}</Section>
      <BottomBar />
    </>
  );
}

const Section = styled.section`
  margin-bottom: ${BOTTOM_BAR_HEIGHT}px;
  z-index: 1;
`;

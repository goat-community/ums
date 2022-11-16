/** Layout with bottom bar included */
import React from "react";
import { BottomBar } from "@components/mobile";
import { BOTTOM_BAR_HEIGHT } from "@constants/design";
import styled from "styled-components";

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

/** Layout with bottom bar included */
import React from "react";
import styled from "styled-components";

import { type CSSProperties } from "@types";

interface PaddingLayoutProps {
  padding: string;
  children: React.ReactNode;
}

export function PaddingLayout(props: PaddingLayoutProps) {
  return <Section padding={props.padding}>{props.children}</Section>;
}

const Section = styled.section<Pick<CSSProperties, "padding">>`
  padding: ${(props) => props.padding};
  z-index: 1;
`;

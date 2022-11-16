import React from "react";
import styled from "styled-components";

import { type CSSProperties } from "@types";

interface MarginProps {
  margin: string;
}

export function Margin(props: MarginProps) {
  return <Div margin={props.margin} />;
}

const Div = styled.div<Pick<CSSProperties, "margin">>`
  margin: ${(props) => props.margin};
`;

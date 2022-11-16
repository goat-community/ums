import React from "react";
import { type CSSProperties } from "@types";
import styled from "styled-components";

interface MarginProps {
  margin: string;
}

export function Margin(props: MarginProps) {
  return <Div margin={props.margin} />;
}

const Div = styled.div<Pick<CSSProperties, "margin">>`
  margin: ${(props) => props.margin};
`;

import React from "react";

interface MarginProps {
  margin: string;
}

export function Margin(props: MarginProps) {
  return <div style={{ margin: props.margin }}></div>;
}

import React from "react";
import * as D from "@constants/design";
import PurpleIcon from "@images/purple_icon.png";
import styled from "styled-components";

export function FloatingFlower() {
  return (
    <Button>
      <img src={PurpleIcon} alt="icon" width="24" height="24" />
    </Button>
  );
}

const Button = styled.button`
  border: none;
  width: 56px;
  height: 56px;
  background-color: ${D.LIGHT_PRIMARY};
  bottom: calc(${D.BOTTOM_BAR_HEIGHT}px + 20px);
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 10px;
  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3);
`;

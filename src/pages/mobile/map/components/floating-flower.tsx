import React from "react";
import styled from "styled-components";

import { useAppDispatch } from "@hooks/context";

import { notify } from "@context/base/notifier";

import * as D from "@constants/design";

import PurpleIcon from "@images/purple_icon.png";

export function FloatingFlower() {
  const dispatch = useAppDispatch();

  return (
    <Button onClick={() => dispatch(notify("Tap a location on the map"))}>
      <img src={PurpleIcon} alt="icon" width="24" height="24" />
    </Button>
  );
}

const Button = styled.button`
  position: fixed;
  width: 56px;
  height: 56px;
  right: 10px;
  background-color: ${D.LIGHT_PRIMARY};
  bottom: calc(${D.BOTTOM_BAR_HEIGHT}px + 20px);
  padding-right: env(safe-area-inset-right, 10px);
  padding-bottom: env(safe-area-inset-bottom, 100px);
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3);
`;

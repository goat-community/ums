import React from "react";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { set_picking_mode } from "@context/map/maps-action";

import * as D from "@constants/design";

import LightIcon from "@images/icon.png";
import PurpleIcon from "@images/purple_icon.png";

export function FloatingFlower() {
  const dispatch = useAppDispatch();
  const is_picking = useAppSelector((state) => state.map.picking_mode);
  const icon = is_picking ? LightIcon : PurpleIcon;

  return (
    <Button
      is_picking={is_picking}
      onClick={() => dispatch(set_picking_mode(!is_picking))}
    >
      <img src={icon} alt="icon" width="24" height="24" />
    </Button>
  );
}

const Button = styled.button<{ is_picking: boolean }>`
  position: fixed;
  width: 56px;
  height: 56px;
  right: 10px;
  background-color: ${(props) => (props.is_picking ? D.PRIMARY_COLOR : D.LIGHT_PRIMARY)};
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

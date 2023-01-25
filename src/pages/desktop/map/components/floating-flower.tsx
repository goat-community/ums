import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { setScoreLayerMode } from "@context/flower";

import * as D from "@constants/design";

import LightIcon from "@images/icon.png";
import PurpleIcon from "@images/purple_icon.png";

export function FlowerButton() {
  const dispatch = useAppDispatch();
  const layerVisibility = useAppSelector((state) => state.flower.score_layer_visible);
  const icon = layerVisibility ? LightIcon : PurpleIcon;

  return (
    <Button
      is_picking={layerVisibility}
      is_picked={layerVisibility}
      onClick={() => dispatch(setScoreLayerMode(!layerVisibility))}
    >
      <img src={icon} alt="icon" width="24" height="24" />
    </Button>
  );
}

const Button = styled.button<{ is_picking: boolean; is_picked }>`
  z-index: 1;
  width: 56px;
  height: 56px;
  right: 10px;
  background-color: ${(props) => (props.is_picking ? D.PRIMARY_COLOR : D.LIGHT_PRIMARY)};
  padding-right: env(safe-area-inset-right, 10px);
  padding-bottom: env(safe-area-inset-bottom, 100px);
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3);
  bottom: calc(${D.BOTTOM_BAR_HEIGHT}px + 20px);
`;

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { Tooltip } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { get_amenities } from "@context/flower";
import { set_picking_mode } from "@context/map/maps-action";

import * as D from "@constants/design";

export function IsochroneButton() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const is_picking = useAppSelector((state) => state.map.picking_mode);
  const is_loading = useAppSelector((state) => state.network.loading);
  // const is_done_survey = useAppSelector((state) => state.flower.survey_done_already);
  const travel_time_surface = useAppSelector(
    (state) => state.isochrones.travel_time_surface
  );

  const isochrone_shown = Boolean(!is_loading && travel_time_surface);
  // User should done the flower before picking isochrone
  const button_action = () => dispatch(set_picking_mode(!is_picking));

  // fetch survey from localstorage
  // to state the filling status
  useEffect(() => {
    dispatch(get_amenities());
  }, []);

  const tooltip_title = is_picking
    ? t("tooltips.disableIsochrone")
    : t("tooltips.enableIsochrone");

  return (
    <Tooltip title={tooltip_title} arrow>
      <Button
        is_picking={is_picking}
        isochrone_shown={isochrone_shown}
        onClick={button_action}
      >
        <FmdGoodIcon sx={{ color: is_picking ? "white" : D.PRIMARY_COLOR }} />
      </Button>
    </Tooltip>
  );
}

const Button = styled.button<{
  is_picking: boolean;
  isochrone_shown: boolean;
}>`
  width: 56px;
  height: 56px;
  right: 10px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3);
  background-color: ${(props) => (props.is_picking ? D.GREEN_PRIMARY : D.WHITE_COLOR)};
`;

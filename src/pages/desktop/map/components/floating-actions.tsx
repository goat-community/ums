import { Fragment, useEffect } from "react";
import styled from "styled-components";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Fab, Stack } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { get_amenities } from "@context/flower";

import * as D from "@constants/design";

import { Legend } from "@components/common/legend";

import { LanguageSelector } from "@pages/desktop/map/components/language-selector";

import { BaseMapSelector } from "./basemap-selector";
import { EitLogo } from "./eit-logo";
import { LayerSelector } from "./layer-selector";
import { PoisSelector } from "./pois-selector";

interface FloatingActionsProps {
  open_onboarding_force: CallableFunction;
}

export function FloatingActions(props: FloatingActionsProps) {
  const dispatch = useAppDispatch();
  const travel_time_surface = useAppSelector(
    (state) => state.isochrones.travel_time_surface
  );

  const drawer_is_open = travel_time_surface;

  // fetch survey from localstorage
  // to state the filling status
  useEffect(() => {
    dispatch(get_amenities());
  }, []);

  return (
    <Fragment>
      <Container position="right">
        <Stack direction="column" spacing={2}>
          <Legend />
          <LayerSelector />
          <PoisSelector />
          <BaseMapSelector />
        </Stack>
      </Container>
      <Container position="left" extraPadding={drawer_is_open}>
        <Stack direction="column" spacing={2}>
          <Fab
            size="large"
            sx={{ backgroundColor: D.WHITE_COLOR, color: D.BLACK_COLOR }}
            onClick={() => props.open_onboarding_force()}
          >
            <InfoOutlinedIcon />
          </Fab>
          <Stack direction="row" spacing={2}>
            <LanguageSelector />
            <EitLogo />
          </Stack>
        </Stack>
      </Container>
    </Fragment>
  );
}

const Container = styled.section<{ position: string; extraPadding?: boolean }>`
  z-index: 2;
  position: fixed;
  padding-right: env(safe-area-inset-right, 50px);
  padding-bottom: env(safe-area-inset-bottom, 50px);
  bottom: 50px;
  ${(props) => props.position}: 50px;
  ${(props) => props.extraPadding && `padding-left: ${D.DRAWER_WIDTH}px;}`}
`;

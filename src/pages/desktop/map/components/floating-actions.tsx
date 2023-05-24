import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Fab, Stack, Tooltip } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { get_amenities } from "@context/flower";

import * as D from "@constants/design";

import { LanguageSelector } from "@components/common/language-selector";

import { BaseMapSelector } from "./basemap-selector";
import { EitLogo } from "./eit-logo";
import { LayerSelector } from "./layer-selector";
import { LegendSelector } from "./legend-selector";
import { PoisSelector } from "./pois-selector";

interface FloatingActionsProps {
  open_onboarding_force: CallableFunction;
}

export function FloatingActions(props: FloatingActionsProps) {
  const { t } = useTranslation();
  // get showLogo from session storage and set to state
  const [showLogo, setShowLogo] = useState<boolean>(true);

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

  // Display logo at first 20 seconds and hide it until next refresh of the page
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLogo(false);
    }, 20000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Fragment>
      <Container position="right">
        <Stack direction="column" spacing={2}>
          <LegendSelector />
          <LayerSelector />
          <PoisSelector />
          <BaseMapSelector />
        </Stack>
      </Container>
      <Container position="left" extraPadding={drawer_is_open}>
        <Stack direction="column" spacing={2}>
          <Tooltip title={t("tooltips.openInformation")} arrow placement="left">
            <Fab
              size="large"
              sx={{ backgroundColor: D.WHITE_COLOR, color: D.BLACK_COLOR }}
              onClick={() => props.open_onboarding_force()}
            >
              <InfoOutlinedIcon />
            </Fab>
          </Tooltip>
          <Stack direction="row" spacing={2}>
            <LanguageSelector />
            {showLogo && <EitLogo />}
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

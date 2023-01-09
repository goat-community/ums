import { Fragment, useEffect } from "react";
import styled from "styled-components";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Fab, Stack } from "@mui/material";

import { useAppDispatch } from "@hooks/context";

import { get_amenities } from "@context/flower";

import * as D from "@constants/design";

import { BaseMapSelector } from "@pages/common/map/basemap-selector";
import { LanguageSelector } from "@pages/common/map/language-selector";
import { LayerSelector } from "@pages/common/map/layer-selector";
import { PoisSelector } from "@pages/common/map/pois-selector";

interface FloatingActionsProps {
  open_onboarding_force: CallableFunction;
}

export function FloatingActions(props: FloatingActionsProps) {
  const dispatch = useAppDispatch();

  // fetch survey from localstorage
  // to state the filling status
  useEffect(() => {
    dispatch(get_amenities());
  }, []);

  return (
    <Fragment>
      <Container position="right">
        <Stack direction="column" spacing={2}>
          <LayerSelector />
          <PoisSelector />
          <BaseMapSelector />
        </Stack>
      </Container>
      <Container position="left">
        <Stack direction="column" spacing={2}>
          <Fab
            size="small"
            sx={{ backgroundColor: D.WHITE_COLOR, color: D.BLACK_COLOR }}
            onClick={() => props.open_onboarding_force()}
          >
            <InfoOutlinedIcon />
          </Fab>
          <LanguageSelector />
        </Stack>
      </Container>
    </Fragment>
  );
}

const Container = styled.section<{ position: string }>`
  z-index: 2;
  position: fixed;
  padding-right: env(safe-area-inset-right, 50px);
  padding-bottom: env(safe-area-inset-bottom, 50px);
  bottom: 50px;
  ${(props) => props.position}: 50px;
`;

import styled from "styled-components";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Fab, Stack } from "@mui/material";

import * as D from "@constants/design";

import { Header } from "@components/mobile";

import { LayerSelector } from "./layer-selector";
import { PoisSelector } from "./pois-selector";

interface MapHeaderProps {
  open_onboarding_force: CallableFunction;
}

export function MapHeader(props: MapHeaderProps) {
  return (
    <Section>
      <Header />
      {/** Selector buttons */}
      <Stack direction="row" padding="10px 16px" justifyContent="space-between">
        <Stack direction="row" spacing={1}>
          <LayerSelector />
          <PoisSelector />
          <Fab
            size="small"
            sx={{ backgroundColor: D.WHITE_COLOR, color: D.BLACK_COLOR }}
            onClick={() => props.open_onboarding_force()}
          >
            <InfoOutlinedIcon />
          </Fab>
        </Stack>
      </Stack>
    </Section>
  );
}

const Section = styled.section`
  position: fixed;
  top: 0px;
  width: 100%;
`;

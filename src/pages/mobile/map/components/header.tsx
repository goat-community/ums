import React from "react";
import styled from "styled-components";

import { Stack } from "@mui/material";

import { Header } from "@components/mobile";

import { LayerSelector } from "./layer-selector";
import { LocationSelector } from "./location-selector";

export function MapHeader() {
  return (
    <Section>
      <Header />
      {/** Selector buttons */}
      <Stack direction="row" spacing={2} padding="28px 22px">
        <LayerSelector />
        <LocationSelector />
      </Stack>
    </Section>
  );
}

const Section = styled.section`
  position: fixed;
  top: 0px;
  width: 100%;
`;

import React from "react";
import styled from "styled-components";

import { Stack } from "@mui/material";

import { Header } from "@components/mobile";

import { BaseMapSelector } from "./base-map-selector";
import { LayerSelector } from "./layer-selector";
import { PoisSelector } from "./pois-selector";

export function MapHeader() {
  return (
    <Section>
      <Header />
      {/** Selector buttons */}
      <Stack direction="row" padding="10px 16px" justifyContent="space-between">
        <Stack direction="row" spacing={1}>
          <LayerSelector />
          <PoisSelector />
        </Stack>
        <BaseMapSelector />
      </Stack>
    </Section>
  );
}

const Section = styled.section`
  position: fixed;
  top: 0px;
  width: 100%;
`;

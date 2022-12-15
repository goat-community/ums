import React from "react";
import MatGeocoder from "react-mui-mapbox-geocoder";
import styled from "styled-components";

import { Stack, Typography } from "@mui/material";

import { useAppSelector } from "@hooks/context";

import { view_bounds_selector } from "@context/map/map-selector";

import { MAPBOX_TOKEN } from "@constants";

import { Margin } from "@components/common";

import M4CLOGO from "@images/m4c-big.png";

import { FlowerButton } from "./floating-flower";
import { IsochroneButton } from "./isochrone-button";

export function Header() {
  const viewBounds = useAppSelector(view_bounds_selector);

  return (
    <Section>
      <img src={M4CLOGO} height="25px" />
      <Typography variant="h6">
        How does your city score in terms of accessibility?
      </Typography>
      <Margin margin="13px 0 0" />
      <Stack spacing={1} direction="row">
        <FlowerButton />
        <IsochroneButton />
        <MatGeocoder
          key={0}
          inputPlaceholder="Location"
          accessToken={MAPBOX_TOKEN}
          onSelect={() => {
            console.log("todo");
          }}
          showLoader={true}
          country="de"
          bbox={viewBounds}
          inputPaperProps={{
            style: {
              width: "235px",
              padding: "0 10px",
              minHeight: "56px",
              height: "56px",
              boxShadow: "none",
              borderRadius: "4px 4px 0 0",
              borderBottom: "1px solid black",
              backgroundColor: "white",
            },
          }}
        />
      </Stack>
    </Section>
  );
}

const Section = styled.section`
  z-index: 2;
  position: fixed;
  padding-left: env(safe-area-inset-right, 50px);
  padding-top: env(safe-area-inset-bottom, 50px);
  top: 50px;
  left: 50px;
`;

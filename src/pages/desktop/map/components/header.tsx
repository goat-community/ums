import React from "react";
import MatGeocoder from "react-mui-mapbox-geocoder";
import { Link } from "react-router-dom";

import { Button, Stack, Typography } from "@mui/material";

import { useAppSelector } from "@hooks/context";

import { view_bounds_selector } from "@context/map/map-selector";

import { MAPBOX_TOKEN } from "@constants";

import { Margin } from "@components/common";

import Icon from "@images/icon.png";
import M4CLOGO from "@images/m4c-big.png";

import { IsochroneButton } from "./isochrone-button";

export function Header() {
  const viewBounds = useAppSelector(view_bounds_selector);

  const icon_style = { marginTop: -2 };

  return (
    <Stack direction="row" padding="50px 50px 0" justifyContent="space-between">
      <section>
        <img src={M4CLOGO} height="25px" />
        <Typography variant="h6">
          How does your city score in terms of accessibility?
        </Typography>
        <Margin margin="13px 0 0" />
        <Stack spacing={1} direction="row">
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
                width: "245px",
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
      </section>
      <Link to="/flower">
        <Button variant="contained">
          <img src={Icon} width="18" height="18" alt="icon" style={icon_style} />
          <Typography variant="h6" ml={1}>
            My Flower
          </Typography>
        </Button>
      </Link>
    </Stack>
  );
}

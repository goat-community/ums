import React from "react";
import { LngLat } from "react-map-gl";
import MatGeocoder from "react-mui-mapbox-geocoder";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Button, Stack, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { get_point_isochrone } from "@context/isochrones";
import { setPickedPoint } from "@context/map";
import { view_bounds_selector } from "@context/map/map-selector";

import { MAPBOX_TOKEN } from "@constants";
import * as D from "@constants/design";

import Icon from "@images/icon.png";
import Logo from "@images/m4c.png";
export function Header() {
  const icon_style = { marginTop: -2 };
  const viewBounds = useAppSelector(view_bounds_selector);
  const dispatch = useAppDispatch();
  const onSelectHandler = (result) => {
    const point = {
      lng: result.center[0],
      lat: result.center[1],
    } as LngLat;
    dispatch(setPickedPoint(point));
    dispatch(get_point_isochrone(point));
  };

  return (
    <Section>
      {/** Title and my profile button */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        padding="24px 10px 18px"
      >
        {/* <Typography variant="h1">Where to be?</Typography> */}
        <img src={Logo} width="50%" height="auto" alt="logo" />

        <Link to="/profile">
          <Button variant="contained">
            <img src={Icon} width="18" height="18" alt="icon" style={icon_style} />
            <Typography variant="h6" ml={1}>
              My Profile
            </Typography>
          </Button>
        </Link>
      </Stack>

      <MatGeocoder
        inputPlaceholder="Search Address"
        accessToken={MAPBOX_TOKEN}
        onSelect={onSelectHandler}
        showLoader={true}
        country="de"
        bbox={viewBounds}
      />
    </Section>
  );
}

const Section = styled.section`
  background-color: ${D.WHITE_COLOR};
`;

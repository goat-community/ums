import { useState } from "react";
import { LngLat } from "react-map-gl";
import MatGeocoder from "react-mui-mapbox-geocoder";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Button, Stack, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { get_point_isochrone } from "@context/isochrones";
import { setAddress, setPickingMode } from "@context/map";
import { view_bounds_selector } from "@context/map/maps-selector";

import { MAPBOX_TOKEN } from "@constants";
import * as D from "@constants/design";

import Icon from "@images/icon.png";
import Logo from "@images/m4c.png";

export function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const survey_has_done = useAppSelector((state) => state.flower.survey_done_already);
  const [keyIndex] = useState(0);
  const icon_style = { marginTop: -2 };
  const viewBounds = useAppSelector(view_bounds_selector);

  const onSelectHandler = (result) => {
    if (survey_has_done) {
      const point = {
        lng: result.center[0],
        lat: result.center[1],
      } as LngLat;
      // dispatch(setPickedPoint(point));
      dispatch(setPickingMode(true));
      dispatch(get_point_isochrone(point));
      dispatch(setAddress(result?.place_name));
      // setKeyIndex(keyIndex + 1);
    } else {
      navigate("/flower");
    }
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

        <Link to="/flower">
          <Button variant="contained">
            <img src={Icon} width="18" height="18" alt="icon" style={icon_style} />
            <Typography variant="h6" ml={1}>
              My Flower
            </Typography>
          </Button>
        </Link>
      </Stack>

      <MatGeocoder
        key={keyIndex}
        inputPlaceholder="Search Address"
        accessToken={MAPBOX_TOKEN}
        onSelect={onSelectHandler}
        showLoader={true}
        country="de"
        bbox={viewBounds}
        inputPaperProps={{
          style: {
            padding: "0 10px",
            minHeight: "56px",
            height: "56px",
            boxShadow: "none",
            borderRadius: 0,
            borderBottom: "1px solid black",
            backgroundColor: D.WHITE_COLOR,
          },
        }}
        suggestionsPaperProps={{
          style: {
            zIndex: 2,
          },
        }}
      />
    </Section>
  );
}

const Section = styled.section`
  background-color: ${D.WHITE_COLOR};
`;

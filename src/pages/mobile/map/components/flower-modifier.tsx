import React from "react";
import styled from "styled-components";

import { Slider, Stack, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@hooks/context";
import { batch } from "react-redux";

import {
  get_point_isochrone,
  select_isochrone_mode,
  select_max_trip_duration_minutes,
  setIsochroneMode,
  setMaxTripDurationMinutes,
} from "@context/isochrones";

import * as D from "@constants/design";
import CheckIcon from "@mui/icons-material/Check";

// import artistpallete from "@images/artist-palette.png";
// import Icon from "@images/icon.png";
// import tree from "@images/tree.png";
import type { TRAVEL_MODE } from "@types";

// const POI_LIST = [
//   { label: "Personal", icon: <img src={Icon} width="18" height="18" /> },
//   { label: "Nature lover", icon: <img src={tree} width="18" height="18" /> },
//   { label: "Creative spirit", icon: <img src={artistpallete} width="18" height="18" /> },
// ];

export function FlowerModifier() {
  const dispatch = useAppDispatch();
  const max_trip_duration_minutes = useAppSelector(select_max_trip_duration_minutes);
  const selectedIsochroneMode = useAppSelector(select_isochrone_mode);

  function set_isochrone_mode(mode: TRAVEL_MODE) {
    batch(() => {
      dispatch(setIsochroneMode(mode));
      dispatch(get_point_isochrone(null));
    });
  }

  return (
    <Section>
      <Stack direction="row" alignItems="center" spacing={2} maxWidth={240}>
        <Typography p={1} variant="h6" sx={typography_style} width={70}>
          Distance <br /> ({max_trip_duration_minutes} min.)
        </Typography>
        <Slider
          value={max_trip_duration_minutes}
          onChange={(_, value) => dispatch(setMaxTripDurationMinutes(value as number))}
          max={15}
          valueLabelDisplay="auto"
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        maxWidth={300}
        width={"90vw"}
      >
        <Typography p={1} variant="h6" sx={typography_style}>
          Modality
        </Typography>
        <SegmentedSection>
          {["walking", "cycling", "transit"].map((isochrone_mode) => (
            <SegementedButton
              key={isochrone_mode}
              onClick={() => set_isochrone_mode(isochrone_mode as TRAVEL_MODE)}
            >
              {selectedIsochroneMode === isochrone_mode && (
                <span>
                  <CheckIcon fontSize="small" />
                </span>
              )}
              <Typography variant="h6">{isochrone_mode}</Typography>
            </SegementedButton>
          ))}
        </SegmentedSection>
      </Stack>

      {/* <Stack
        direction="row"
        width={"90vw"}
        spacing={1}
        alignItems="center"
        marginTop={"17px"}
        sx={segmented_section_style}
      >
        {POI_LIST.map((i, index) => (
          <Chip
            key={i.label}
            icon={i.icon}
            label={i.label}
            color={index === 0 ? "primary" : "default"}
          />
        ))}
      </Stack> */}
    </Section>
  );
}

const Section = styled.section`
  position: fixed;
  left: 20px;
  bottom: calc(${D.BOTTOM_BAR_HEIGHT}px);
  padding-left: env(safe-area-inset-left, 20px);
  padding-bottom: env(safe-area-inset-bottom, 100px);
  border-radius: 16px;
  z-index: -1;
`;

const SegmentedSection = styled.section`
  border-radius: 50px;
  background-color: ${D.LIGHT_PRIMARY};
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  height: 28px;
`;

const SegementedButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 1px solid black;

  &:nth-child(1) {
    border-radius: 50px 0 0 50px;
  }

  &:nth-child(2) {
    border-right: none;
    border-left: none;
  }

  &:nth-child(3) {
    border-radius: 0 50px 50px 0;
  }
`;

const segmented_section_style = {
  overflowX: "scroll",
  paddingBottom: "30px",
  paddingRight: "30px",
};
const typography_style = { fontSize: "11px" };

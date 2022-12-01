import React from "react";
import { batch } from "react-redux";

import { Slider, Stack } from "@mui/material";

import { TRAVEL_MODE } from "@types";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import {
  get_point_isochrone,
  select_isochrone_mode,
  select_max_trip_duration_minutes,
  setIsochroneMode,
  setMaxTripDurationMinutes,
} from "@context/isochrones";

import { Selector } from "@components/mobile";

// const POI_LIST = [
//   { label: "Personal", icon: <img src={Icon} width="18" height="18" /> },
//   { label: "Nature lover", icon: <img src={tree} width="18" height="18" /> },
//   { label: "Creative spirit", icon: <img src={artistpallete} width="18" height="18" /> },
// ];

export function InsightsModifier() {
  const dispatch = useAppDispatch();
  const selected_isochrone_mode = useAppSelector(select_isochrone_mode);
  const max_trip_duration_minutes = useAppSelector(select_max_trip_duration_minutes);

  // const segmented_section_style = {
  //   overflowX: "scroll",
  //   paddingBottom: "10px",
  // };

  function set_isochrone_mode(mode: TRAVEL_MODE) {
    batch(() => {
      dispatch(setIsochroneMode(mode));
      dispatch(get_point_isochrone(null));
    });
  }

  return (
    <>
      <Stack direction="row" marginTop="30px" width={280} spacing={3} alignItems="center">
        <Selector
          items={[
            { label: "walking", value: "walking" },
            { label: "cycling", value: "cycling" },
            { label: "transit", value: "transit" },
          ]}
          label={"Mode"}
          value={selected_isochrone_mode as TRAVEL_MODE}
          handleChange={(e) => set_isochrone_mode(e.target.value as TRAVEL_MODE)}
        />
        <Slider
          value={max_trip_duration_minutes}
          onChange={(_, value) => dispatch(setMaxTripDurationMinutes(value))}
          max={15}
          valueLabelDisplay="auto"
        />
      </Stack>
      {/* <Stack
        direction="row"
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
    </>
  );
}

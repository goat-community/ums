import React, { useEffect } from "react";

import { Stack, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { coords_to_address } from "@context/map";

import { InsightsModifier } from "./insights-modifier";
import { PersonalScore } from "./pesonal-score";

export function InsightsSection() {
  const dispatch = useAppDispatch();
  const picked_point = useAppSelector((state) => state.map.picked_point);
  const address = useAppSelector((state) => state.map.current_point_address);
  const travel_time_surface = useAppSelector(
    (state) => state.isochrones.travel_time_surface
  );

  useEffect(() => {
    if (picked_point && travel_time_surface) {
      // convert coords to address
      dispatch(coords_to_address(picked_point));
    }
  }, [picked_point, travel_time_surface]);

  return (
    <Stack padding="31px 23px 10px">
      <Typography variant="h1" fontWeight="400" color="black">
        {address.split(",").slice(0, 2) || "..."}
      </Typography>
      <br />
      <Typography variant="h6" fontWeight="400" color="black">
        Munich {address.split("Munich")[1] || "..."}
      </Typography>
      <InsightsModifier />
      <PersonalScore />
    </Stack>
  );
}

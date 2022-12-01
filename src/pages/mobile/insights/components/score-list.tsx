import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { Stack, Typography } from "@mui/material";

import { useAppSelector } from "@hooks/context";

import * as D from "@constants/design";
import { AMENITIES_GROUP } from "@constants/flower";

export function ScoreList() {
  const flower_survey_amenties = useAppSelector((state) => state.flower.amenities);
  const travel_time_surface = useAppSelector(
    (state) => state.isochrones.travel_time_surface
  );
  const [scores, setScores] = useState<Record<string, number>>({
    food: 0,
    health: 0,
    services: 0,
    sport: 0,
    nature: 0,
    tourism: 0,
    transport: 0,
    shop: 0,
    education: 0,
  });

  const calculate_scores = useCallback(() => {
    let shallow_scores = {};
    // calcuate the selected point scores
    // based on the user personal flower
    Object.keys(scores).map((category) => {
      let nr_category_amenity_reached = 0;

      AMENITIES_GROUP[category].map((field) => {
        const isochrone_amenity = travel_time_surface.accessibility?.[field];
        // check the amenity is available
        if (!isochrone_amenity || isochrone_amenity.length < 1) {
          return false;
        }
        /* get the number of amenity reached
         *  based on the user personal flower maximum reach time
         */
        const amenity_reached = isochrone_amenity[flower_survey_amenties[field] - 1];
        if (parseInt(amenity_reached) >= 1) {
          nr_category_amenity_reached += 1;
        }
      });

      shallow_scores = {
        ...shallow_scores,
        [category]: Math.round(
          (nr_category_amenity_reached / AMENITIES_GROUP[category].length) * 10
        ),
      };
    });

    setScores(shallow_scores);

    // re-create function on these params change
  }, [travel_time_surface, flower_survey_amenties, AMENITIES_GROUP]);

  useEffect(() => {
    calculate_scores();
  }, [travel_time_surface, flower_survey_amenties, AMENITIES_GROUP]);

  return (
    <Stack padding="0 23px" margin="auto">
      {Object.keys(AMENITIES_GROUP).map((group) => (
        <ScoreItem key={group}>
          <Typography variant="h5" color="black">
            {group}
          </Typography>
          <Typography variant="h6" color="#49454F">
            {scores[group]}
          </Typography>
        </ScoreItem>
      ))}
    </Stack>
  );
}

const ScoreItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #cac4d0;
  padding: 16px 8px;
  background-color: ${D.WHITE_COLOR};
`;

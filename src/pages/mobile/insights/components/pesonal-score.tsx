import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { CircularProgress, Stack, Typography } from "@mui/material";

import { useAppSelector } from "@hooks/context";

import { AMENITIES_LIST } from "@constants/flower";

export function PersonalScore() {
  const [score, setScore] = useState<number>(0);
  const flower_survey_amenties = useAppSelector((state) => state.flower.amenities);
  const travel_time_surface = useAppSelector(
    (state) => state.isochrones.travel_time_surface
  );

  const calculate_scores = useCallback(() => {
    // calcuate the selected point scores
    // based on the user personal flower
    let nr_amenities_reached = 0;

    AMENITIES_LIST.map((amenity) => {
      const isochrone_amenity = travel_time_surface.accessibility?.[amenity];
      // check the amenity is available
      if (!isochrone_amenity || isochrone_amenity.length < 1) {
        return false;
      }
      /* get the number of amenity reached
       *  based on the user personal flower maximum reach time
       */
      const amenity_reached = isochrone_amenity[flower_survey_amenties[amenity] - 1];
      if (parseInt(amenity_reached) >= 1) {
        nr_amenities_reached += 1;
      }
    });

    setScore(Math.round((nr_amenities_reached / AMENITIES_LIST.length) * 10));

    // re-create function on these params change
  }, [travel_time_surface, flower_survey_amenties, AMENITIES_LIST]);

  useEffect(() => {
    calculate_scores();
  }, [travel_time_surface, flower_survey_amenties, AMENITIES_LIST]);

  return (
    <Section>
      <Stack direction="row" justifyContent="space-around" alignItems="center">
        <CircularProgress variant="determinate" value={score * 10 || 0} size="70px" />
        <Stack justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontSize="14px">
            Personal scrore
          </Typography>
          <Typography variant="h1" fontSize="46px" fontWeight="400">
            {score} / 10
          </Typography>
        </Stack>
      </Stack>
    </Section>
  );
}

const Section = styled.section`
  margin-top: 28px;
  padding: 31px 23px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  background: #fafafa;
`;

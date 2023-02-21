import { useCallback, useEffect, useState } from "react";

import { select_max_trip_duration_minutes } from "@context/isochrones";

import { AMENITIES_GROUP, AMENITIES_LIST } from "@constants/flower";

import { useAppSelector } from "./context";

export function useCalculateSingleScore() {
  const [score, setScore] = useState<number>(0);
  const flower_survey_amenties = useAppSelector((state) => state.flower.amenities);
  const max_trip_duration_minutes = useAppSelector(select_max_trip_duration_minutes);
  const travel_time_surface = useAppSelector(
    (state) => state.isochrones.travel_time_surface
  );

  const calculate_scores = useCallback(() => {
    let nr_amenities_reached = 0;
    AMENITIES_LIST.map((amenity) => {
      const isochrone_amenity = travel_time_surface.accessibility?.[amenity] || null;
      if (!isochrone_amenity || isochrone_amenity.length < 1) {
        return false;
      }
      /* get the number of amenity reached
       *  based on the user personal flower maximum reach time or 15 as default
       */
      const user_ideal_time_to_this_amenity = flower_survey_amenties?.[amenity] || 15;

      let amenity_reached: string;
      if (user_ideal_time_to_this_amenity > 15) {
        amenity_reached = isochrone_amenity[15 - 1];
      } else {
        amenity_reached = isochrone_amenity[user_ideal_time_to_this_amenity - 1];
      }
      if (parseInt(amenity_reached) >= 1) {
        nr_amenities_reached += 1;
      }
    });
    setScore(Math.round((nr_amenities_reached / AMENITIES_LIST.length) * 10));
    // re-create function on these params change
  }, [
    travel_time_surface,
    max_trip_duration_minutes,
    flower_survey_amenties,
    AMENITIES_LIST,
  ]);

  useEffect(() => {
    if (travel_time_surface && max_trip_duration_minutes) {
      calculate_scores();
    }
  }, [
    travel_time_surface,
    max_trip_duration_minutes,
    flower_survey_amenties,
    AMENITIES_LIST,
  ]);

  return score;
}

// Calculate each category score
export function useCalculateStandardScore() {
  const [scores, setScores] = useState<Record<string, number>>({
    food: 0,
    health: 0,
    services: 0,
    sport: 0,
    leisure: 0,
    transport: 0,
    shop: 0,
    education: 0,
  });
  const max_trip_duration_minutes = useAppSelector(select_max_trip_duration_minutes);
  const travel_time_surface = useAppSelector(
    (state) => state.isochrones.travel_time_surface
  );

  const calculate_scores = useCallback(() => {
    let shallow_scores = {};
    Object.keys(scores).map((category) => {
      let nr_category_amenity_reached = 0;
      if (AMENITIES_GROUP?.[category]) {
        AMENITIES_GROUP[category].map((field) => {
          const isochrone_amenity = travel_time_surface.accessibility?.[field];
          // check the amenity is available
          if (!isochrone_amenity || isochrone_amenity.length < 1) {
            return false;
          }
          /* get the number of amenity reached
           *  based on the user personal flower maximum reach time
           */
          const amenity_reached = isochrone_amenity[max_trip_duration_minutes - 1];

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
      }
    });
    setScores(shallow_scores);
    // re-create function on these params change
  }, [travel_time_surface, max_trip_duration_minutes, AMENITIES_GROUP]);

  useEffect(() => {
    if (max_trip_duration_minutes && travel_time_surface) {
      calculate_scores();
    }
  }, [travel_time_surface, max_trip_duration_minutes, AMENITIES_GROUP]);

  return scores;
}

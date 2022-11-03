// Showcase of sample page that fetch an isochrone
import React from "react";
import { getIsochrone } from "@context/isochrones";
import { useAppDispatch, useAppSelector } from "@hooks/context";
import { CircularProgress } from "@mui/material";

const SAMPLE_TEST_ISOCHRONE = {
  mode: "walking",
  settings: {
    travel_time: "10",
    speed: "5",
    walking_profile: "standard",
  },
  starting_point: {
    input: [
      {
        lat: 48.1502132,
        lon: 11.5696284,
      },
    ],
  },
  scenario: {
    id: 0,
    modus: "default",
  },
  output: {
    type: "grid",
    steps: "12",
  },
};

export function Sample() {
  const dispatch = useAppDispatch();
  const isochrone = useAppSelector((state) => state.isochrones.isochrone);
  const loading = useAppSelector((state) => state.network.loading);

  return (
    <>
      {loading && <CircularProgress />}

      {isochrone ? (
        <p>{JSON.stringify(isochrone)}</p>
      ) : (
        <button onClick={() => dispatch(getIsochrone(SAMPLE_TEST_ISOCHRONE))}>
          Fetch Isochrone
        </button>
      )}
    </>
  );
}

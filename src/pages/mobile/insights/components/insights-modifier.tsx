import React from "react";
import { batch } from "react-redux";
import styled from "styled-components";

import { Slider, Stack, Typography } from "@mui/material";

import { SCORE_MODE, TRAVEL_MODE } from "@types";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import {
  get_point_isochrone,
  select_isochrone_mode,
  select_max_trip_duration_minutes,
  setIsochroneMode,
  setMaxTripDurationMinutes,
  setScoreMode,
} from "@context/isochrones";
import { picked_point_selector } from "@context/map/map-selector";

import * as D from "@constants/design";

import { Margin } from "@components/common";
import { Selector } from "@components/mobile";

import TriangleIcon from "@images/triangle.png";
import TriangleWhiteIcon from "@images/triangle-white.png";

export function InsightsModifier() {
  const dispatch = useAppDispatch();
  const score_mode = useAppSelector((state) => state.isochrones.score_mode);
  const selected_isochrone_mode = useAppSelector(select_isochrone_mode);
  const max_trip_duration_minutes = useAppSelector(select_max_trip_duration_minutes);
  const picked_point = useAppSelector(picked_point_selector);

  function set_isochrone_mode(mode: TRAVEL_MODE) {
    batch(() => {
      dispatch(setIsochroneMode(mode));
      dispatch(get_point_isochrone(picked_point));
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
          onChange={(_, value) => dispatch(setMaxTripDurationMinutes(value as number))}
          max={30}
          valueLabelDisplay="auto"
          color={"secondary"}
          disabled={score_mode === SCORE_MODE.personal}
        />
      </Stack>
      <Margin margin="20px 0 0" />
      <SegmentedSection>
        {[SCORE_MODE.personal, SCORE_MODE.standard].map((i) => (
          <SegementedButton
            key={i}
            active={score_mode === i}
            onClick={() => dispatch(setScoreMode(i))}
          >
            {i === score_mode ? (
              <span>
                <img src={TriangleWhiteIcon} alt="triangle" width={18} height={18} />
              </span>
            ) : (
              <span>
                <img src={TriangleIcon} alt="triangle" width={18} height={18} />
              </span>
            )}
            <Typography variant="h6">{i}</Typography>
          </SegementedButton>
        ))}
      </SegmentedSection>
    </>
  );
}

const SegmentedSection = styled.section`
  border-radius: 50px;
  background-color: ${D.WHITE_COLOR};
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 207px;
  height: 28px;
`;

const SegementedButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 1px solid #73777f;
  text-decoration: none;
  height: 28px;
  font-size: 11px;
  color: ${(props) => (props.active ? D.WHITE_COLOR : D.BLACK_COLOR)};
  background-color: ${(props) => (props.active ? D.GREEN_PRIMARY : D.WHITE_COLOR)};

  &:nth-child(1) {
    border-radius: 50px 0 0 50px;
  }

  &:nth-child(2) {
    border-radius: 0 50px 50px 0;
    border-left: none;
  }
`;

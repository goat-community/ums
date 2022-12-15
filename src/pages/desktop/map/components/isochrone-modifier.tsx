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

import TriangleIcon from "@images/triangle.png";
import TriangleWhiteIcon from "@images/triangle-white.png";

// const POI_LIST = [
//   { label: "Personal", icon: <img src={Icon} width="18" height="18" /> },
//   { label: "Nature lover", icon: <img src={tree} width="18" height="18" /> },
//   { label: "Creative spirit", icon: <img src={artistpallete} width="18" height="18" /> },
// ];

export function IsochroneModifier() {
  const dispatch = useAppDispatch();
  const score_mode = useAppSelector((state) => state.isochrones.score_mode);
  const max_trip_duration_minutes = useAppSelector(select_max_trip_duration_minutes);
  const selectedIsochroneMode = useAppSelector(select_isochrone_mode);
  const picked_point = useAppSelector(picked_point_selector);

  function set_isochrone_mode(mode: TRAVEL_MODE) {
    batch(() => {
      dispatch(setIsochroneMode(mode));
      dispatch(get_point_isochrone(picked_point));
    });
  }

  return (
    <Section>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography p={1} variant="h6" sx={typography_style} width={70}>
          Distance <br /> ({max_trip_duration_minutes} min.)
        </Typography>
        <Slider
          value={max_trip_duration_minutes}
          onChange={(_, value) => dispatch(setMaxTripDurationMinutes(value as number))}
          max={15}
          valueLabelDisplay="auto"
          color="secondary"
        />
      </Stack>

      <Stack direction="row" alignItems="center" maxWidth={260} width={"90vw"} p={1}>
        <Typography variant="h6" sx={typography_style} width={70}>
          Modality
        </Typography>
        <SegmentedSection>
          {["walking", "cycling", "transit"].map((isochrone_mode) => (
            <SegementedButton
              key={isochrone_mode}
              active={selectedIsochroneMode === isochrone_mode}
              onClick={() => set_isochrone_mode(isochrone_mode as TRAVEL_MODE)}
            >
              {selectedIsochroneMode === isochrone_mode ? (
                <span>
                  <img src={TriangleWhiteIcon} alt="triangle" width={18} height={18} />
                </span>
              ) : (
                <span>
                  <img src={TriangleIcon} alt="triangle" width={18} height={18} />
                </span>
              )}

              <Typography variant="h6">{isochrone_mode}</Typography>
            </SegementedButton>
          ))}
        </SegmentedSection>
      </Stack>

      <Stack direction="row" alignItems="center" maxWidth={250} width={"90vw"} p={1}>
        <Typography variant="h6" sx={typography_style} width={70}>
          Score
        </Typography>
        <SegmentedSection>
          {[SCORE_MODE.personal, SCORE_MODE.standard].map((i) => (
            <SegementedButtonTwo
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
            </SegementedButtonTwo>
          ))}
        </SegmentedSection>
      </Stack>
    </Section>
  );
}

const Section = styled.section`
  width: 90%;
  margin-top: 20px;
`;

const SegmentedSection = styled.section`
  border-radius: 50px;
  background-color: ${D.WHITE_COLOR};
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
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
    border-right: none;
    border-left: none;
  }

  &:nth-child(3) {
    border-radius: 0 50px 50px 0;
  }
`;

const SegementedButtonTwo = styled.button<{ active: boolean }>`
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

// const segmented_section_style = {
//   overflowX: "scroll",
//   paddingBottom: "30px",
//   paddingRight: "30px",
// };
const typography_style = { fontSize: "11px" };

import { useTranslation } from "react-i18next";
import { batch } from "react-redux";
import styled from "styled-components";

import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import { Slider, Stack, Typography } from "@mui/material";

import { TRAVEL_MODE } from "@types";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import {
  get_point_isochrone,
  select_isochrone_mode,
  select_max_trip_duration_minutes,
  setIsochroneMode,
  setMaxTripDurationMinutes,
} from "@context/isochrones";
import { picked_point_selector } from "@context/map/maps-selector";

import * as D from "@constants/design";

const ISOCHRONES_MODE_ICON = {
  walking: <DirectionsWalkIcon fontSize="small" />,
  cycling: <DirectionsBikeIcon fontSize="small" />,
  transit: <DirectionsBusIcon fontSize="small" />,
};

export function IsochroneModifier() {
  const dispatch = useAppDispatch();
  const max_trip_duration_minutes = useAppSelector(select_max_trip_duration_minutes);
  const selectedIsochroneMode = useAppSelector(select_isochrone_mode);
  const picked_point = useAppSelector(picked_point_selector);
  const { t } = useTranslation();

  function set_isochrone_mode(mode: TRAVEL_MODE) {
    batch(() => {
      dispatch(setIsochroneMode(mode));
      dispatch(get_point_isochrone(picked_point));
    });
  }

  return (
    <Section>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography p={1} variant="h6" sx={typography_style} width={90}>
          {t("isochrone.distance")} <br /> ({max_trip_duration_minutes} min.)
        </Typography>
        <Slider
          value={max_trip_duration_minutes}
          onChange={(_, value) => dispatch(setMaxTripDurationMinutes(value as number))}
          max={15}
          valueLabelDisplay="auto"
          color="secondary"
        />
      </Stack>

      <Stack direction="row" alignItems="center" maxWidth={360} p={1} spacing={2}>
        <Typography variant="h6" sx={typography_style} width={70}>
          {t("isochrone.modality")}
        </Typography>
        <SegmentedSection>
          {["walking", "cycling", "transit"].map((isochrone_mode) => (
            <SegementedButton
              key={isochrone_mode}
              active={selectedIsochroneMode === isochrone_mode}
              onClick={() => set_isochrone_mode(isochrone_mode as TRAVEL_MODE)}
            >
              {ISOCHRONES_MODE_ICON[isochrone_mode]}
            </SegementedButton>
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
  justify-content: space-between;
  height: 28px;
`;

const SegementedButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #73777f;
  padding: 0 15px;
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

// const SegementedButtonTwo = styled.button<{ active: boolean }>`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
//   border: 1px solid #73777f;
//   padding: 0 10px;
//   text-decoration: none;
//   height: 28px;
//   font-size: 11px;
//   color: ${(props) => (props.active ? D.WHITE_COLOR : D.BLACK_COLOR)};
//   background-color: ${(props) => (props.active ? D.GREEN_PRIMARY : D.WHITE_COLOR)};

//   &:nth-child(1) {
//     border-radius: 50px 0 0 50px;
//   }

//   &:nth-child(2) {
//     border-radius: 0 50px 50px 0;
//     border-left: none;
//   }
// `;

// // const segmented_section_style = {
// //   overflowX: "scroll",
// //   paddingBottom: "30px",
// //   paddingRight: "30px",
// // };
const typography_style = { fontSize: "11px" };

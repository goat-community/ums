import { useTranslation } from "react-i18next";
import { batch } from "react-redux";

import { Slider, Stack } from "@mui/material";

import { SCORE_MODE, TRAVEL_MODE } from "@types";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import {
  get_point_isochrone,
  select_isochrone_mode,
  select_max_trip_duration_minutes,
  setIsochroneMode,
  setMaxTripDurationMinutes,
} from "@context/isochrones";
import { picked_point_selector } from "@context/map/maps-selector";

import { Selector } from "@components/mobile";

export function InsightsModifier() {
  const dispatch = useAppDispatch();
  const score_mode = useAppSelector((state) => state.isochrones.score_mode);
  const selected_isochrone_mode = useAppSelector(select_isochrone_mode);
  const max_trip_duration_minutes = useAppSelector(select_max_trip_duration_minutes);
  const picked_point = useAppSelector(picked_point_selector);

  const { t } = useTranslation();

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
            { label: t("isochrone.modalityModes.walking"), value: "walking" },
            { label: t("isochrone.modalityModes.cycling"), value: "cycling" },
            { label: t("isochrone.modalityModes.transit"), value: "transit" },
          ]}
          label={"Mode"}
          value={selected_isochrone_mode as TRAVEL_MODE}
          handleChange={(e) => set_isochrone_mode(e.target.value as TRAVEL_MODE)}
        />
        <Slider
          value={max_trip_duration_minutes}
          onChange={(_, value) => dispatch(setMaxTripDurationMinutes(value as number))}
          max={15}
          valueLabelDisplay="auto"
          color={"secondary"}
          disabled={score_mode === SCORE_MODE.personal}
        />
      </Stack>
    </>
  );
}

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Chip, Slider, Stack } from "@mui/material";

import {
  selectMaxTripDurationMinutes,
  setMaxTripDurationMinutes,
} from "@context/isochrones";

import { Selector } from "@components/mobile";

import artistpallete from "@images/artist-palette.png";
import Icon from "@images/icon.png";
import tree from "@images/tree.png";

export function FlowerModifier() {
  const [mode, setMode] = useState<string | number>("walk");
  const maxTripDurationMinutes = useSelector(selectMaxTripDurationMinutes);
  const dispatch = useDispatch();

  return (
    <>
      <Stack direction="row" marginTop="30px" width={230} spacing={3} alignItems="center">
        <Selector
          items={[
            { label: "Walking", value: "walking" },
            { label: "Running", value: "running" },
          ]}
          label={"Mode"}
          value={mode}
          handleChange={(e) => setMode(e.target.value)}
        />
        <Slider
          defaultValue={1}
          value={maxTripDurationMinutes}
          onChange={(e, value) => dispatch(setMaxTripDurationMinutes(value as number))}
          max={15}
          valueLabelDisplay="auto"
        />
      </Stack>
      <Stack direction="row" marginTop="30px" width={230} spacing={1} alignItems="center">
        <Chip
          icon={<img src={Icon} width="18" height="18" />}
          label="Personal"
          color="primary"
        />
        <Chip
          icon={<img src={tree} width="18" height="18" />}
          label="Nature lover"
          color="default"
        />
        <Chip
          icon={<img src={artistpallete} width="18" height="18" />}
          label="Creative spirit"
          color="default"
        />
      </Stack>
    </>
  );
}

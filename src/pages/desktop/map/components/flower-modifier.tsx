import React, { useState } from "react";

import { Chip, Slider, Stack } from "@mui/material";

import { Selector } from "@components/mobile";

import artistpallete from "@images/artist-palette.png";
import Icon from "@images/icon.png";
import tree from "@images/tree.png";

export function FlowerModifier() {
  const [mode, setMode] = useState<string | number>("walk");

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
        <Slider defaultValue={5} max={15} valueLabelDisplay="auto" />
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

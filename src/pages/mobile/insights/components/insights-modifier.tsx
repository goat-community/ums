import React, { useState } from "react";

import { Chip, Slider, Stack } from "@mui/material";

import { Selector } from "@components/mobile";

import artistpallete from "@images/artist-palette.png";
import Icon from "@images/icon.png";
import tree from "@images/tree.png";

const POI_LIST = [
  { label: "Personal", icon: <img src={Icon} width="18" height="18" /> },
  { label: "Nature lover", icon: <img src={tree} width="18" height="18" /> },
  { label: "Creative spirit", icon: <img src={artistpallete} width="18" height="18" /> },
];

export function InsightsModifier() {
  const [mode, setMode] = useState<string | number>("walk");

  const segmented_section_style = {
    overflowX: "scroll",
    paddingBottom: "10px",
  };

  return (
    <>
      <Stack direction="row" marginTop="30px" width={280} spacing={3} alignItems="center">
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
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        marginTop={"17px"}
        sx={segmented_section_style}
      >
        {POI_LIST.map((i, index) => (
          <Chip
            key={i.label}
            icon={i.icon}
            label={i.label}
            color={index === 0 ? "primary" : "default"}
          />
        ))}
      </Stack>
    </>
  );
}

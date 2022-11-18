import React from "react";

import { Stack, Typography } from "@mui/material";

import { Margin, SearchInput } from "@components/common";

import { FlowerModifier } from "./flower_modifier";
import { PersonalScore } from "./pesonal_score";

export function DrawerContent() {
  return (
    <Stack width={350} padding="53px 39px 0">
      <Typography variant="h1">Where to be?</Typography>
      <Margin margin="30px 0 0" />
      <SearchInput variant="outlined" />
      <Margin margin="50px 0 0" />
      <Typography variant="h1" fontWeight="400" color="black">
        Alfons-Goppel-Straße 7
      </Typography>
      <FlowerModifier />
      <PersonalScore />
    </Stack>
  );
}

import React from "react";

import { Stack, Typography } from "@mui/material";

import { InsightsModifier } from "./insights-modifier";
import { PersonalScore } from "./pesonal-score";

export function InsightsSection() {
  return (
    <Stack padding="31px 23px 10px">
      <Typography variant="h1" fontWeight="400" color="black">
        Alfons-Goppel-Straße 7
      </Typography>
      <br />
      <Typography variant="h6" fontWeight="400" color="black">
        80539 München, Germany
      </Typography>
      <InsightsModifier />
      <PersonalScore />
    </Stack>
  );
}

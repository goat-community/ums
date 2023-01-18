import { Stack, Typography } from "@mui/material";

import { useAppSelector } from "@hooks/context";

import { InsightsModifier } from "./insights-modifier";
import { PersonalScore } from "./pesonal-score";

export function InsightsSection() {
  const address = useAppSelector((state) => state.map.current_point_address);

  return (
    <Stack padding="31px 23px 10px">
      <Typography variant="h1" fontWeight="400" color="black">
        {address.split(",").slice(0, 2) || ""}
      </Typography>
      <br />
      <Typography variant="h6" fontWeight="400" color="black">
        Munich {address.split("Munich")?.[1] || ""}
      </Typography>
      <InsightsModifier />
      <PersonalScore />
    </Stack>
  );
}

import { Stack, Typography } from "@mui/material";

import { useAppSelector } from "@hooks/context";

import { InsightsModifier } from "./insights-modifier";
import { PersonalScore } from "./pesonal-score";

export function InsightsSection() {
  const address = useAppSelector((state) => state.map.current_point_address);

  return (
    <Stack padding="31px 23px 10px">
      <Typography variant="h2" fontWeight="400" color="black">
        {address?.display_name?.split(",").slice(0, 2) || ""}
      </Typography>
      <br />
      <Typography variant="h6" fontWeight="400" color="black">
        {address.address?.city}, {address.address?.state}, {address.address?.postcode},{" "}
        {address.address?.country}
      </Typography>
      <InsightsModifier />
      <PersonalScore />
    </Stack>
  );
}

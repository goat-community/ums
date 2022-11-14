import React, { type CSSProperties } from "react";
import { Margin } from "@components/common";
import Icon from "@images/icon.png";
import { Button, Stack, Typography } from "@mui/material";

import { LayerSelector } from "./layer-selector";
import { LocationSelector } from "./location-selector";
import { SearchInput } from "./search";

export function Header() {
  return (
    <>
      {/** Title and my profile button */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h1">Where to be?</Typography>

        <Button variant="contained">
          <img src={Icon} width="18" height="18" alt="icon" style={styles.icon} />
          <Typography variant="h6" ml={1}>
            My Profile
          </Typography>
        </Button>
      </Stack>

      {/** Search bar */}
      <SearchInput />

      {/** Selector buttons */}
      <Margin margin="28px 0px 0px 0px" />
      <Stack direction="row" spacing={1}>
        <LayerSelector />
        <Margin margin="0px 5px" />
        <LocationSelector />
      </Stack>
    </>
  );
}

const styles: { [key: string]: CSSProperties } = {
  icon: {
    marginTop: -2,
  },
};

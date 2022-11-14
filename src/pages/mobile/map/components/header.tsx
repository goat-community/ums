import React, { type CSSProperties } from "react";
import Icon from "@images/icon.png";
import { Button, Stack, Typography } from "@mui/material";

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
    </>
  );
}

const styles: { [key: string]: CSSProperties } = {
  icon: {
    marginTop: -2,
  },
};

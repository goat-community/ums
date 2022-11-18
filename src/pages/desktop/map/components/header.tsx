import React from "react";

import { Stack, Typography } from "@mui/material";

import { Margin, SearchInput } from "@components/common";

export function Header() {
  return (
    <Stack width={350} padding="53px 39px 0">
      <Typography variant="h1">Where to be?</Typography>
      <Margin margin="30px 0 0" />
      <SearchInput variant="filled" />
    </Stack>
  );
}

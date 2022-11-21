import React from "react";
import { Link } from "react-router-dom";

import { Button, Stack, Typography } from "@mui/material";

import { Margin, SearchInput } from "@components/common";

import Icon from "@images/icon.png";

import { LayerSelector } from "./layer-selector";
import { LocationSelector } from "./location-selector";

export function Header() {
  const icon_style = { marginTop: -2 };

  return (
    <>
      {/** Title and my profile button */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h1">Where to be?</Typography>

        <Link to="/profile">
          <Button variant="contained">
            <img src={Icon} width="18" height="18" alt="icon" style={icon_style} />
            <Typography variant="h6" ml={1}>
              My Profile
            </Typography>
          </Button>
        </Link>
      </Stack>

      {/** Search bar */}
      <Margin margin="17px 0px 0px" />
      <SearchInput variant="filled" />

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

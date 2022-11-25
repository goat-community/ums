import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Box, Button, Stack, Typography } from "@mui/material";

import * as D from "@constants/design";

import { SearchInput } from "@components/common";

import Icon from "@images/icon.png";

import { LayerSelector } from "./layer-selector";
import { LocationSelector } from "./location-selector";

export function Header() {
  const icon_style = { marginTop: -2 };
  const box_style = { backgroundColor: D.WHITE_COLOR };

  return (
    <Section>
      <Box sx={box_style}>
        {/** Title and my profile button */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          padding="10px 15px"
        >
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
        <SearchInput variant="filled" />
      </Box>

      {/** Selector buttons */}
      <Stack direction="row" spacing={2} padding="28px 22px">
        <LayerSelector />
        <LocationSelector />
      </Stack>
    </Section>
  );
}

const Section = styled.section`
  position: fixed;
  top: 0px;
  width: 100%;
`;

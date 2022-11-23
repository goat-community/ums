import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Button, Stack, Typography } from "@mui/material";

import * as D from "@constants/design";

import { SearchInput } from "@components/common";

import Icon from "@images/icon.png";

export function Header() {
  const icon_style = { marginTop: -2 };

  return (
    <Section>
      {/** Title and my profile button */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        padding="24px 10px 18px"
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
      <SearchInput variant="outlined" />
    </Section>
  );
}

const Section = styled.section`
  background-color: ${D.WHITE_COLOR};
`;

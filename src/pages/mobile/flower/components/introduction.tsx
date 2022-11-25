import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Button, Stack, Typography } from "@mui/material";

import { Margin } from "@components/common";

interface IntroductionProps {
  onClickContinue: () => void;
}

export default function Introduction(props: IntroductionProps) {
  return (
    <Box>
      <Typography variant="h3">
        The &apos;Proximity Flower&apos; helps map people&apos;s preferred city ammenities
        in relation to the distance to their homes
      </Typography>
      <Margin margin="25px 0 0 0" />
      <Typography variant="h3" fontWeight="bold">
        How does you flower look like?
      </Typography>
      <Margin margin="35px 0 0 0" />
      <Stack
        justifyContent="space-between"
        alignItems="center"
        direction="row"
        spacing={3}
      >
        <Link to="/">
          <Button variant="outlined" onClick={props.onClickContinue}>
            Go back
          </Button>
        </Link>
        <Button variant="contained" onClick={props.onClickContinue}>
          Create Flower
        </Button>
      </Stack>
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 53px;
  height: 100vh;
`;

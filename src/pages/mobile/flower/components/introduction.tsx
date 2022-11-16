import React from "react";
import { Margin } from "@components/common";
import { Button, Typography } from "@mui/material";
import styled from "styled-components";

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
      <Button variant="contained" onClick={props.onClickContinue}>
        Continue
      </Button>
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

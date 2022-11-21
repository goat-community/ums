import React from "react";
import styled from "styled-components";

import { CircularProgress, Stack, Typography } from "@mui/material";

export function PersonalScore() {
  return (
    <Section>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CircularProgress variant="determinate" value={50} />
        <div>
          <Typography variant="h6">Personal scrore</Typography>
          <Typography variant="h1">5 / 10</Typography>
        </div>
      </Stack>
    </Section>
  );
}

const Section = styled.section`
  background-color: red;
  margin-top: 28px;
  padding: 15px 35px;
  background: linear-gradient(0deg, rgba(103, 80, 164, 0.05), rgba(103, 80, 164, 0.05)),
    #fffbfe;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
`;

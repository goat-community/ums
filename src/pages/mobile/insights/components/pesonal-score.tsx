import React from "react";
import styled from "styled-components";

import { CircularProgress, Stack, Typography } from "@mui/material";

export function PersonalScore() {
  return (
    <Section>
      <Stack direction="row" justifyContent="space-around" alignItems="center">
        <CircularProgress variant="determinate" value={90} size="70px" />
        <Stack justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontSize="14px" color="#625B71">
            Personal scrore
          </Typography>
          <Typography variant="h1" fontSize="46px" fontWeight="400">
            9 / 10
          </Typography>
        </Stack>
      </Stack>
    </Section>
  );
}

const Section = styled.section`
  background-color: red;
  margin-top: 28px;
  padding: 31px 23px;
  background: linear-gradient(0deg, rgba(103, 80, 164, 0.05), rgba(103, 80, 164, 0.05)),
    #fffbfe;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
`;

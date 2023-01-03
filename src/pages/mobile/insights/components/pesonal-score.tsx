import styled from "styled-components";

import { CircularProgress, Stack, Typography } from "@mui/material";

import { useCalculateSingleScore } from "@hooks";

import { ScoreHighLighter } from "@components/common";

export function PersonalScore() {
  const score = useCalculateSingleScore();
  return (
    <Section>
      <Stack direction="row" justifyContent="space-around" alignItems="center">
        <CircularProgress
          variant="determinate"
          value={score * 10 || 0}
          size="70px"
          color="secondary"
        />
        <Stack justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontSize="14px">
            Personal Score
          </Typography>
          <Typography variant="h1" fontSize="46px" fontWeight="400">
            <ScoreHighLighter isochrone_score={score} large />
          </Typography>
        </Stack>
      </Stack>
    </Section>
  );
}

const Section = styled.section`
  margin-top: 28px;
  padding: 31px 23px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  background: #fafafa;
`;

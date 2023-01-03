import styled from "styled-components";

import { CircularProgress, Stack, Typography } from "@mui/material";

import { convert_to_pascal } from "@utils";

import { useCalculateSingleScore } from "@hooks";
import { useAppSelector } from "@hooks/context";

import { ScoreHighLighter } from "@components/common";

import { ScoreList } from "./score-list";

export default function Insights() {
  const score = useCalculateSingleScore();
  const isochrone_mode = useAppSelector((state) => state.isochrones.score_mode);
  const address = useAppSelector((state) => state.map.current_point_address);

  return (
    <>
      <Stack padding="31px 0 10px" sx={{ width: "90%" }}>
        <Typography variant="h2" fontWeight="400" color="black">
          {address.split(",").slice(0, 2) || "..."}
        </Typography>
        <br />
        <Typography variant="h6" fontWeight="400" color="black">
          Munich {address.split("Munich")?.[1] || "..."}
        </Typography>
        <Section>
          <Stack direction="row" justifyContent="space-around" alignItems="center">
            <CircularProgress
              variant="determinate"
              value={score * 10 || 0}
              size="60px"
              color="secondary"
            />
            <Stack justifyContent="space-between" alignItems="center">
              <Typography fontSize="12px">
                {convert_to_pascal(isochrone_mode)} Score
              </Typography>
              <Typography fontSize="34px" fontWeight="400">
                <ScoreHighLighter isochrone_score={score} large />
              </Typography>
            </Stack>
          </Stack>
        </Section>
        <ScoreList />
      </Stack>
    </>
  );
}

const Section = styled.section`
  margin-top: 28px;
  padding: 12px 20px;
  border-radius: 10px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
`;

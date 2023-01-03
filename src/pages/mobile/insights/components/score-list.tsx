import styled from "styled-components";

import { Stack, Typography } from "@mui/material";

import { convert_to_pascal } from "@utils";

import { useCalculateStandardScore } from "@hooks";

// import { useAppSelector } from "@hooks/context";
import * as D from "@constants/design";
import { AMENITIES_GROUP } from "@constants/flower";

import { ScoreHighLighter } from "@components/common";

export function ScoreList() {
  const standard_score = useCalculateStandardScore();

  return (
    <Stack padding="0 23px" margin="auto">
      {Object.keys(AMENITIES_GROUP).map((group) => (
        <ScoreItem key={group}>
          <Typography variant="h5" color="black">
            {convert_to_pascal(group)}
          </Typography>
          <Typography>
            <ScoreHighLighter isochrone_score={standard_score[group]} />
          </Typography>
        </ScoreItem>
      ))}
    </Stack>
  );
}

const ScoreItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #cac4d0;
  padding: 16px 8px;
  background-color: ${D.WHITE_COLOR};
`;

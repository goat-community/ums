import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { Stack, Typography } from "@mui/material";

import { useCalculateStandardScore } from "@hooks";

// import { useAppSelector } from "@hooks/context";
import * as D from "@constants/design";
import { AMENITIES_GROUP } from "@constants/flower";

import { ScoreHighLighter } from "@components/common";

export function ScoreList() {
  const standard_score = useCalculateStandardScore();

  const { t } = useTranslation();

  return (
    <Stack padding="20px 0">
      {Object.keys(AMENITIES_GROUP).map((group) => (
        <ScoreItem key={group}>
          <Typography variant="h5" color="black">
            {t(`amenitiesGroup.${group}`)}
          </Typography>
          <Typography variant="h6" color="#49454F">
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

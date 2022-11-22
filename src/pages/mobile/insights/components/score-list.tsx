import React from "react";
import styled from "styled-components";

import { Stack, Typography } from "@mui/material";

import * as D from "@constants/design";

const POI_LIST = [
  { label: "Entertainment", score: "5/10" },
  { label: "Health", score: "8/10" },
  { label: "Living", score: "9/10" },
  { label: "Working", score: "5/10" },
  { label: "Commerce", score: "8/10" },
  { label: "Education", score: "9/10" },
];

export function ScoreList() {
  return (
    <Stack padding="0 23px" margin="auto">
      {POI_LIST.map((i) => (
        <ScoreItem key={i.label}>
          <Typography variant="h5" color="black">
            {i.label}
          </Typography>
          <Typography variant="h6" color="#49454F">
            {i.score}
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

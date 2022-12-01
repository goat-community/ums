import React from "react";

import { Stack, Typography } from "@mui/material";

import { Header } from "@components/mobile";

import { BottomBarLayout } from "@layouts/mobile";

import { InsightsSection } from "./components/insights-section";
import { ScoreList } from "./components/score-list";
import { CenteredTabs } from "./components/tabs";

export default function Insights() {
  const has_isochrone_result = false;
  return (
    <BottomBarLayout>
      <Header />
      {has_isochrone_result ? (
        <>
          <InsightsSection />
          <ScoreList />
          <CenteredTabs />
        </>
      ) : (
        <Stack padding={5}>
          <Typography variant="h4" textAlign="center">
            Please go back to the map section and pick an map point with clicking on the
            flower button on the bottom right!
          </Typography>
        </Stack>
      )}
    </BottomBarLayout>
  );
}

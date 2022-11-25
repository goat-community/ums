import React from "react";

import { Header } from "@components/mobile";

import { BottomBarLayout } from "@layouts/mobile";

import { InsightsSection } from "./components/insights-section";
import { ScoreList } from "./components/score-list";
import { CenteredTabs } from "./components/tabs";

export default function Insights() {
  return (
    <BottomBarLayout>
      <Header />
      <InsightsSection />
      <ScoreList />
      <CenteredTabs />
    </BottomBarLayout>
  );
}

import React from "react";

import { BottomBarLayout } from "@layouts/mobile";

import { Header } from "./components/header";
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

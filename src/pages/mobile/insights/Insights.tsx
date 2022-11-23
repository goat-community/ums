import React from "react";

import { Header } from "./components/header";
import { InsightsSection } from "./components/insights-section";
import { ScoreList } from "./components/score-list";
import { CenteredTabs } from "./components/tabs";

export default function Insights() {
  return (
    <>
      <Header />
      <InsightsSection />
      <ScoreList />
      <CenteredTabs />
    </>
  );
}

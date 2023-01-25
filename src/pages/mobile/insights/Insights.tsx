import { useTranslation } from "react-i18next";

import { Stack, Typography } from "@mui/material";

import { useAppSelector } from "@hooks/context";

import { Header } from "@components/mobile";

import { BottomBarLayout } from "@layouts/mobile";

import { InsightsSection } from "./components/insights-section";
import { ScoreList } from "./components/score-list";
// import { CenteredTabs } from "./components/tabs";

export default function Insights() {
  const travel_time_surface = useAppSelector(
    (state) => state.isochrones.travel_time_surface
  );

  const { t } = useTranslation();

  return (
    <BottomBarLayout>
      <Header />
      {travel_time_surface ? (
        <>
          <InsightsSection />
          <ScoreList />
          {/* <CenteredTabs /> */}
        </>
      ) : (
        <Stack padding={4}>
          <Typography variant="h4" textAlign="center">
            {t("insights.addLocation")}
          </Typography>
        </Stack>
      )}
    </BottomBarLayout>
  );
}

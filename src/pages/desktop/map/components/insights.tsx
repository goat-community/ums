import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { Box, CircularProgress, Stack, Typography } from "@mui/material";

import { useCalculateSingleScore } from "@hooks";
import { useAppSelector } from "@hooks/context";

import { ScoreList } from "./score-list";

export default function Insights() {
  const score = useCalculateSingleScore();
  const address = useAppSelector((state) => state.map.current_point_address);
  const { t } = useTranslation();

  return (
    <>
      <Stack padding="31px 0 10px" sx={{ width: "95%" }}>
        <Section>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack justifyContent="space-between" alignItems="flex-start">
              <Typography fontSize={15} fontWeight="bold" color="#283647">
                {t("isochrone.modes.15min")}
              </Typography>
              <Typography
                fontSize={13}
                fontWeight="200"
                color="#293748"
                mt={1}
                maxWidth={165}
              >
                {address?.display_name?.split(",").slice(0, 2) || ""}
              </Typography>
              <Typography variant="h6" fontWeight="200" color="#808894">
                {address.address?.city}, {address.address?.state},{" "}
                {address.address?.postcode}, {address.address?.country}
              </Typography>
            </Stack>
            <Box sx={{ position: "relative", display: "inline-flex" }}>
              <CircularProgress
                variant="determinate"
                value={score * 10 || 0}
                size="80px"
                color="secondary"
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h5" component="div">
                  {score} / 10
                </Typography>
              </Box>
            </Box>
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

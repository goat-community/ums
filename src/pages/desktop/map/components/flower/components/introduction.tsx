import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Button, Dialog, Stack, Typography } from "@mui/material";

import { useAppSelector } from "@hooks/context";

import { Margin } from "@components/common";
import { Flower } from "@components/common/flower-generator";

interface IntroductionProps {
  onClickContinue: () => void;
  onBackClick: () => void;
}

export default function Introduction(props: IntroductionProps) {
  const surevey_has_done = useAppSelector((state) => state.flower.survey_done_already);
  const { t } = useTranslation();

  if (surevey_has_done) {
    return (
      <Dialog open={true} maxWidth="xl">
        <Box>
          <Flower />
          <Margin margin="25px 0 0 0" />
          <Typography variant="h3">{t("introduction.editPersonalData")}</Typography>
          <Margin margin="25px 0 0 0" />
          <Stack
            justifyContent="space-between"
            alignItems="center"
            direction="row"
            spacing={3}
          >
            <Link to="/">
              <Button variant="outlined" onClick={props.onBackClick}>
                {t("introduction.back")}
              </Button>
            </Link>
            <Button variant="contained" onClick={props.onClickContinue}>
              {t("introduction.editFlower")}
            </Button>
          </Stack>
        </Box>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} maxWidth="xl">
      <Box>
        <Typography variant="h3" textAlign="center">
          {t("introduction.proximityFlowerDesc")}
        </Typography>
        <Margin margin="25px 0 0 0" />
        <Typography variant="h3" fontWeight="bold">
          {t("introduction.howDoesYourFlowerLook")}
        </Typography>
        <Margin margin="35px 0 0 0" />
        <Stack
          justifyContent="space-between"
          alignItems="center"
          direction="row"
          spacing={3}
        >
          <Link to="/">
            <Button variant="outlined" onClick={props.onClickContinue}>
              {t("introduction.back")}
            </Button>
          </Link>
          <Button variant="contained" onClick={props.onClickContinue}>
            {t("introduction.createFlower")}
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 53px;
  height: 650px;
  width: 700px;
`;
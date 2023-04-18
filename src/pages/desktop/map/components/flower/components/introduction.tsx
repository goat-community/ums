import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

import CloseIcon from "@mui/icons-material/Close";
import { Button, Dialog, IconButton, Stack, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { resetToStandardFlower } from "@context/flower";

import { Margin } from "@components/common";
import { Flower } from "@components/common/flower-generator";

interface IntroductionProps {
  onClickContinue: () => void;
  onBackClick: () => void;
}

export default function Introduction(props: IntroductionProps) {
  const dispatch = useAppDispatch();
  const [reset_mode, set_reset_mode] = useState<boolean>(false);

  const surevey_has_done = useAppSelector((state) => state.flower.survey_done_already);
  const { t } = useTranslation();

  function reset_to_standard() {
    dispatch(resetToStandardFlower());
    return props.onBackClick();
  }

  if (reset_mode) {
    return (
      <Dialog open={true} maxWidth="xl">
        <Box>
          <Typography variant="h3" textAlign="center">
            {t("introduction.resetToStandardConfirmation")}
          </Typography>
          <Margin margin="35px 0 0 0" />
          <Stack
            justifyContent="space-between"
            alignItems="center"
            direction="row"
            spacing={3}
          >
            <Link to="/">
              <Button variant="outlined" onClick={() => set_reset_mode(false)}>
                {t("introduction.resetNo")}
              </Button>
            </Link>
            <Button variant="contained" onClick={reset_to_standard}>
              {t("introduction.resetYes")}
            </Button>
          </Stack>
        </Box>
      </Dialog>
    );
  }

  if (surevey_has_done) {
    return (
      <Dialog open={true} maxWidth="xl">
        <FloatingResetButton>
          <IconButton onClick={props.onBackClick}>
            <CloseIcon />
          </IconButton>
        </FloatingResetButton>
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
            <Button variant="outlined" onClick={() => set_reset_mode(true)}>
              {t("introduction.resetToStandard")}
            </Button>
            <Button variant="contained" onClick={props.onClickContinue}>
              {t("introduction.editFlower")}
            </Button>
          </Stack>
          {/* <FloatingShareButton>
            <Link to="/flower">
              <Button variant="contained" onClick={props.onBackClick}>
                {t("introduction.share")}
              </Button>
            </Link>
          </FloatingShareButton> */}
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
            <Button variant="outlined" onClick={props.onBackClick}>
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

const FloatingResetButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

// const FloatingShareButton = styled.div`
//   position: absolute;
//   bottom: 20px;
//   right: 20px;
// `;

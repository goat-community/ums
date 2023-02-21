import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Button, Stack, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { resetToStandardFlower } from "@context/flower";

import { Flower, Margin } from "@components/common";

interface IntroductionProps {
  onClickContinue: () => void;
}

export default function Introduction(props: IntroductionProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const surevey_has_done = useAppSelector((state) => state.flower.survey_done_already);
  const { t } = useTranslation();

  function reset_to_standard() {
    dispatch(resetToStandardFlower());
    return navigate("/");
  }

  if (surevey_has_done) {
    return (
      <Box>
        <FloatingResetButton>
          <Button variant="contained" color="error" onClick={reset_to_standard}>
            {t("introduction.resetToStandard")}
          </Button>
        </FloatingResetButton>
        <Flower width={300} height={300} />
        <Margin margin="15px 0 0 0" />
        <Typography variant="h3">
          Do you want to edit your personal mobility flower?
        </Typography>
        <Margin margin="25px 0 0 0" />
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
            {t("introduction.editFlower")}
          </Button>
        </Stack>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h3">{t("introduction.proximityFlowerDesc")}</Typography>
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
  );
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 53px;
  height: 100vh;
`;

const FloatingResetButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

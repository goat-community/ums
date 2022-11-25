import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  FormControlLabel,
  IconButton,
  Radio,
  Stack,
  Typography,
} from "@mui/material";

import * as D from "@constants/design";

import { Margin } from "@components/common";

import Flower from "@images/flower.png";

interface SurveyProps {
  onClickBack: () => void;
}

const SURVEY_OPTIONS = [5, 15, 30];
const SURVEY_QUESTIONS = [
  "Theatre",
  "Cinema",
  "Bar",
  "Gym",
  "Swimming Pool",
  "Restaurant",
  "Place of worship",
];

export default function Survey(props: SurveyProps) {
  const form_control_label_style = {
    padding: 0,
    margin: 0,
    marginRight: "14px",
    marginTop: "-20px",
  };
  const radio_button_style = { marginRight: "14px" };
  const typography_style = { color: D.PRIMARY_COLOR };

  function SurveyOptions(props: { index: number }) {
    return (
      <>
        {SURVEY_OPTIONS.map((minutes) => {
          if (props.index !== 0) {
            return (
              <Radio
                key={minutes + props.index}
                value={minutes}
                sx={radio_button_style}
              />
            );
          }
          return (
            <FormControlLabel
              key={minutes + props.index}
              sx={form_control_label_style}
              control={<Radio />}
              label={
                <Typography variant="h6" sx={typography_style}>
                  {minutes} min
                </Typography>
              }
              labelPlacement="top"
            />
          );
        })}
      </>
    );
  }

  function SurveyQuestions() {
    return (
      <>
        {SURVEY_QUESTIONS.map((question, index) => (
          <SurveyQuestionsContainer key={question}>
            <Typography variant="h5">{question}</Typography>
            <Stack direction="row">
              <SurveyOptions index={index} />
            </Stack>
          </SurveyQuestionsContainer>
        ))}
      </>
    );
  }

  return (
    <>
      <IconButton onClick={props.onClickBack}>
        <ArrowBackIcon sx={{ padding: 1 }} />
      </IconButton>
      <Box>
        <img src={Flower} width="130" height="110" alt="flower" />

        <Margin margin="30px 0 0 0" />

        <Typography variant="h3" sx={{ color: D.LIGHT_GREEN }}>
          ENTERTAINMENT
        </Typography>

        <Margin margin="12px 0 0 0" />

        <TypoGraphyContainer>
          <Typography variant="h6">
            Make a selection of the distance in minutes for the locations that are
            relevant to you
          </Typography>
        </TypoGraphyContainer>

        <Margin margin="55px 0 0 0" />

        <SurveyQuestions />

        <Margin margin="32px 0 0 0" />

        <Link to="/">
          <Button variant="contained" sx={{ width: "90vw" }}>
            Continue
          </Button>
        </Link>
      </Box>
    </>
  );
}

const Box = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 24px;
  position: fixed;
  top: 40px;
  bottom: 0;
  right: 0;
  left: 0;
`;

const TypoGraphyContainer = styled.div`
  text-align: center;
  max-width: 257px;
  color: ${D.PRIMARY_COLOR};
`;

const SurveyQuestionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

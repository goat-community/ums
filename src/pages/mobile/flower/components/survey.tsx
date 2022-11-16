import React from "react";
import { Link } from "react-router-dom";
import { Margin } from "@components/common";
import * as D from "@constants/design";
import Flower from "@images/flower.png";
import { Button, FormControlLabel, Radio, Stack, Typography } from "@mui/material";
import styled from "styled-components";

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

export default function Survey() {
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
    <Box>
      <img src={Flower} width="160" height="133" alt="flower" />

      <Margin margin="30px 0 0 0" />

      <Typography variant="h3" sx={{ color: D.LIGHT_GREEN }}>
        ENTERTAINMENT
      </Typography>

      <Margin margin="12px 0 0 0" />

      <TypoGraphyContainer>
        <Typography variant="h6">
          Make a selection of the distance in minutes for the locations that are relevant
          to you
        </Typography>
      </TypoGraphyContainer>

      <Margin margin="55px 0 0 0" />

      <SurveyQuestions />

      <Margin margin="32px 0 0 0" />

      <Link to="/map">
        <Button variant="contained">Continue</Button>
      </Link>
    </Box>
  );
}

const Box = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 70px 24px;
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

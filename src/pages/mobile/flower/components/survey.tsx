import React from "react";
import { Link } from "react-router-dom";
import { Margin } from "@components/common";
import * as D from "@constants/design";
import Flower from "@images/flower.png";
import { Box, Button, FormControlLabel, Radio, Stack, Typography } from "@mui/material";

import "../flower.scss";

const SURVEY_QUESTIONS = [
  "Theatre",
  "Cinema",
  "Bar",
  "Gym",
  "Swimming Pool",
  "Restaurant",
  "Place of worship",
];

const SURVEY_OPTIONS = [5, 15, 30];

export default function Survey() {
  return (
    <Box className="survey-form-container">
      <img src={Flower} width="160" height="133" alt="flower" />

      <Margin margin="30px 0 0 0" />

      <Typography variant="h3" sx={{ color: D.LIGHT_GREEN }}>
        ENTERTAINMENT
      </Typography>

      <Margin margin="12px 0 0 0" />

      <Typography variant="h6" className="sub-title">
        Make a selection of the distance in minutes for the locations that are relevant to
        you
      </Typography>

      <Margin margin="55px 0 0 0" />

      {SURVEY_QUESTIONS.map((question, index) => (
        <div className="survey-question" key={question}>
          <Typography variant="h5">{question}</Typography>
          <Stack direction="row">
            {SURVEY_OPTIONS.map((minutes) => {
              if (index !== 0) {
                return (
                  <Radio
                    key={question + minutes + index}
                    value={minutes}
                    sx={{ marginRight: "14px" }}
                  />
                );
              }
              if (index === 0) {
                return (
                  <FormControlLabel
                    key={question + minutes + index}
                    sx={{
                      padding: 0,
                      margin: 0,
                      marginRight: "14px",
                      marginTop: "-20px",
                    }}
                    control={<Radio />}
                    label={
                      <Typography variant="h6" sx={{ color: D.PRIMARY_COLOR }}>
                        {minutes} min
                      </Typography>
                    }
                    labelPlacement="top"
                  />
                );
              }
            })}
          </Stack>
        </div>
      ))}

      <Margin margin="32px 0 0 0" />

      <Link to="/map">
        <Button variant="contained">Continue</Button>
      </Link>
    </Box>
  );
}

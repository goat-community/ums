import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Amenities, FlowerMinutes } from "@types";
import styled from "styled-components";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";

import { convert_to_pascal } from "@utils";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { get_amenities, persist_amenities, set_amenity } from "@context/flower";

import * as D from "@constants/design";
import { AMENITIES_LIST, FLOWER_PROXIMITY } from "@constants/flower";

import { Margin } from "@components/common";
import { LinearProgressBar } from "@components/mobile/linear-progress";

interface SurveyProps {
  onClickBack: () => void;
}

function SurveyOptions(props: { index: number; on_change_value: (e: number) => void }) {
  const form_control_label_style = {
    padding: 0,
    margin: 0,
    marginRight: "14px",
    marginTop: "-20px",
  };
  const radio_button_style = { marginRight: "14px" };
  const typography_style = { color: D.PRIMARY_COLOR };
  return (
    <>
      {FLOWER_PROXIMITY.map((minutes) => {
        if (props.index !== 0) {
          return (
            <Radio
              key={minutes + props.index}
              value={minutes}
              sx={radio_button_style}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                props.on_change_value(parseInt(event.target.value))
              }
            />
          );
        }
        return (
          <FormControlLabel
            key={minutes + props.index}
            sx={form_control_label_style}
            control={
              <Radio
                value={minutes}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  props.on_change_value(parseInt(event.target.value))
                }
              />
            }
            labelPlacement="top"
            label={
              <Typography variant="h6" sx={typography_style}>
                {minutes} min
              </Typography>
            }
          />
        );
      })}
    </>
  );
}

function SurveyQuestions(props: {
  step: number;
  amentities_list: Amenities;
  amentities_filtered: string[];
  on_change: (e: Record<string, FlowerMinutes>) => void;
}) {
  return (
    <>
      {props.amentities_filtered.map((key: string, index: number) => (
        <SurveyQuestionsContainer key={key + index}>
          <Typography variant="h6">{convert_to_pascal(key)}</Typography>
          <RadioGroup
            defaultValue={props.amentities_list[key]}
            value={props.amentities_list[key]}
          >
            <Stack direction="row">
              <SurveyOptions
                index={index}
                on_change_value={(new_value) =>
                  props.on_change({ [key]: new_value } as Record<string, FlowerMinutes>)
                }
              />
            </Stack>
          </RadioGroup>
        </SurveyQuestionsContainer>
      ))}
    </>
  );
}

export default function Survey(props: SurveyProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<number>(1);
  const amentities_list = useAppSelector((state) => state.flower.amenities);

  // retrieve previous choices from localStorage
  useEffect(() => {
    dispatch(get_amenities());
  }, []);

  function on_back_clicked() {
    if (step > 1) {
      return setStep((currrent_step) => currrent_step - 1);
    }
    return props.onClickBack();
  }

  function continue_clicked() {
    if (step === 5) {
      dispatch(persist_amenities(amentities_list as Amenities));
      return navigate("/");
    }
    return setStep((currentStep) => currentStep + 1);
  }

  const step_multiplied = step * 8;
  const amentities_filtered = AMENITIES_LIST.slice(step_multiplied - 8, step_multiplied);
  return (
    <>
      <IconButton onClick={on_back_clicked}>
        <ArrowBackIcon sx={{ padding: 1 }} />
      </IconButton>

      <Box>
        <LinearProgressBar value={step * 20} />
        <Margin margin="30px 0 0 0" />
        <TypoGraphyContainer>
          <Typography variant="h6">
            Make a selection of the distance in minutes for the locations that are
            relevant to you
          </Typography>
        </TypoGraphyContainer>
        <Margin margin="55px 0 0 0" />
        <SurveyQuestions
          step={step}
          amentities_filtered={amentities_filtered}
          amentities_list={amentities_list}
          on_change={(changed_proximity) => {
            dispatch(set_amenity(changed_proximity));
          }}
        />
        <Margin margin="32px 0 0 0" />
        <BottomFloating>
          <Button variant="contained" sx={{ width: "90vw" }} onClick={continue_clicked}>
            Continue
          </Button>
        </BottomFloating>
      </Box>
    </>
  );
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 24px 0px;
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

const BottomFloating = styled.div`
  position: absolute;
  bottom: 40px;
  left: 5vw;
  right: 5vw;
`;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Amenities, FlowerMinutes } from "@types";
import styled from "styled-components";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, IconButton, Slider, Stack, Typography } from "@mui/material";

import { convert_to_pascal } from "@utils";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { get_amenities, persist_amenities, set_amenity } from "@context/flower";

import * as D from "@constants/design";
import { AMENITIES_GROUP, AMENITIES_LIST, FLOWER_PROXIMITY } from "@constants/flower";

import { Margin } from "@components/common";
import { LinearProgressBar } from "@components/mobile/linear-progress";

interface SurveyProps {
  onClickBack: () => void;
}

function SurveyQuestions(props: {
  amentities_list: Amenities;
  amentities_filtered: string[];
  on_change: (e: Record<string, FlowerMinutes>) => void;
}) {
  return (
    <>
      <SurveyQuestionsContainer>
        <Typography variant="h6" sx={{ width: 300 }}></Typography>
        <Stack direction="row" justifyContent="space-between" sx={{ width: "100%" }}>
          {FLOWER_PROXIMITY.map((proximity) => (
            <Typography key={proximity} variant="h6">
              {proximity}
            </Typography>
          ))}
        </Stack>
      </SurveyQuestionsContainer>
      {props.amentities_filtered.map((key: string, index: number) => (
        <SurveyQuestionsContainer key={key + index}>
          <Typography variant="h6" sx={{ width: 300 }}>
            {convert_to_pascal(key)}
          </Typography>
          <Slider
            value={props.amentities_list[key]}
            onChange={(_, value) =>
              props.on_change({ [key]: value } as Record<string, FlowerMinutes>)
            }
            min={5}
            max={15}
            valueLabelDisplay="auto"
            color={"secondary"}
          />
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
    if (step === Object.keys(AMENITIES_GROUP).length - 1) {
      dispatch(persist_amenities(amentities_list as Amenities));
      return navigate("/");
    }
    return setStep((currentStep) => currentStep + 1);
  }

  const amenity_group = Object.keys(AMENITIES_GROUP)[step];
  const amentities_filtered = AMENITIES_GROUP[amenity_group];
  const percentage_completed: number = Math.round(
    (step / Object.keys(AMENITIES_GROUP).length) * 100
  );

  return (
    <>
      <IconButton onClick={on_back_clicked}>
        <ArrowBackIcon sx={{ padding: 1 }} />
      </IconButton>

      <Box>
        <LinearProgressBar value={percentage_completed} />
        <Margin margin="30px 0 0 0" />
        <TypoGraphyContainer>
          <Typography variant="h6">
            Make a selection of the distance in minutes for the locations that are
            relevant for you (create your ideal city). The travel times are
            mode-independent
          </Typography>
        </TypoGraphyContainer>
        <Margin margin="25px 0 0 0" />
        <Typography variant="h3" fontWeight="bold">
          {convert_to_pascal(amenity_group)}
        </Typography>
        <Margin margin="20px 0 0 0" />
        <SurveyQuestions
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

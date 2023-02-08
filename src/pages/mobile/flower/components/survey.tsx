import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import type { Amenities, FlowerMinutes } from "@types";
import styled from "styled-components";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Checkbox, IconButton, Slider, Stack, Typography } from "@mui/material";

import { convert_to_pascal } from "@utils";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { get_amenities, persist_amenities, set_amenity } from "@context/flower";

import * as D from "@constants/design";
import { AMENITIES_GROUP, FLOWER_PROXIMITY_WITH_LABEL } from "@constants/flower";

import { Margin } from "@components/common";
import { LinearProgressBar } from "@components/mobile/linear-progress";

interface SurveyProps {
  onClickBack: () => void;
}

function SurveyQuestions(props: {
  amentities_list: Amenities;
  amentities_filtered: string[];
  category_color: string;
  on_change: (e: Record<string, FlowerMinutes>) => void;
}) {
  const { t } = useTranslation();

  return (
    <>
      {props.amentities_filtered.map((key: string, index: number) => (
        <SurveyQuestionsContainer key={key + index}>
          <Typography variant="h6" sx={{ width: 380, overflowWrap: "break-word" }}>
            {t(`amenities.${key}`)}
          </Typography>
          <Stack width={"100%"}>
            {index === 0 ? (
              <Stack direction="row" justifyContent="space-between" mt={"-20px"}>
                {FLOWER_PROXIMITY_WITH_LABEL.map((proximity) => (
                  <Typography key={proximity} variant="h6">
                    {proximity}
                  </Typography>
                ))}
              </Stack>
            ) : (
              <></>
            )}
            <Slider
              min={0}
              max={20}
              sx={{ color: props.category_color || "#ff0017" }}
              valueLabelDisplay="auto"
              value={props.amentities_list[key]}
              disabled={props.amentities_list[key] === null}
              onChange={(_, value) =>
                props.on_change({ [key]: value } as Record<string, FlowerMinutes>)
              }
            />
          </Stack>
          <Margin margin="0 0 0 10px" />
          <RoudedBG>
            <Checkbox
              size="small"
              sx={{ color: props.category_color || "#ff0017" }}
              defaultChecked={props.amentities_list[key] === null}
              onChange={() => {
                if (props.amentities_list[key] != false) {
                  // Disable the option
                  props.on_change({ [key]: null } as Record<string, FlowerMinutes>);
                }
                if (!props.amentities_list[key]) {
                  // Convert it back to default state
                  props.on_change({ [key]: 0 } as Record<string, FlowerMinutes>);
                }
              }}
            />
            <Typography fontSize={9} width={80}>
              {t("placeholders.howDoesYourCityScore")}
            </Typography>
          </RoudedBG>
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
  const { t } = useTranslation();

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
          <Typography variant="h6">{t("survey.surveyDescription")}</Typography>
        </TypoGraphyContainer>
        <Margin margin="25px 0 0 0" />
        <Typography variant="h3" fontWeight="bold">
          {t(`amenitiesGroup.${amenity_group}`)}
        </Typography>
        <Margin margin="50px 0 0 0" />
        <SurveyQuestions
          amentities_filtered={amentities_filtered}
          amentities_list={amentities_list}
          category_color={D.FLOWER_CATEGORIES_COLOR[amenity_group]}
          on_change={(changed_proximity) => {
            dispatch(set_amenity(changed_proximity));
          }}
        />
        <Margin margin="32px 0 0 0" />
        <BottomFloating>
          <Button variant="contained" sx={{ width: "90vw" }} onClick={continue_clicked}>
            {t("survey.continue")}
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

const RoudedBG = styled.div`
  background-color: #f5f5f5;
  border-radius: 20px;
  display: flex;
  align-items: center;
  width: 100px;
`;

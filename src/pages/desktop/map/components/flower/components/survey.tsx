import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Amenities, FlowerMinutes } from "@types";
import styled from "styled-components";

import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Checkbox,
  Container,
  Dialog,
  IconButton,
  Slider,
  Stack,
  Typography,
} from "@mui/material";

import { convert_to_pascal } from "@utils";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { get_amenities, persist_amenities, set_amenity } from "@context/flower";

import * as D from "@constants/design";
import { AMENITIES_GROUP, FLOWER_PROXIMITY_WITH_LABEL } from "@constants/flower";

import { Margin } from "@components/common";
import { PetalGenerator } from "@components/common/petal-generator";
import { LinearProgressBar } from "@components/mobile/linear-progress";

interface SurveyProps {
  onClickBack: () => void;
  onDone: () => void;
  onClose: () => void;
}

function SurveyQuestions(props: {
  amentities_list: Amenities;
  amentities_filtered: string[];
  on_change: (e: Record<string, FlowerMinutes>) => void;
}) {
  const { t } = useTranslation();

  return (
    <>
      <SurveyQuestionsContainer>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: "290px", marginLeft: "195px" }}
        >
          {FLOWER_PROXIMITY_WITH_LABEL.map((proximity) => (
            <Typography key={proximity} variant="h6">
              {proximity}
            </Typography>
          ))}
        </Stack>
      </SurveyQuestionsContainer>
      {props.amentities_filtered.map((key: string, index: number) => (
        <SurveyQuestionsContainer key={key + index}>
          <Typography variant="h4" sx={{ width: 300 }}>
            {t(`amenities.${key}`)}
          </Typography>
          <Slider
            min={5}
            max={15}
            sx={{ width: "450px" }}
            color={"secondary"}
            valueLabelDisplay="auto"
            value={props.amentities_list[key]}
            disabled={props.amentities_list[key] === 0}
            onChange={(_, value) =>
              props.on_change({ [key]: value } as Record<string, FlowerMinutes>)
            }
          />
          <Margin margin="0 0 0 40px" />
          <RoudedBG>
            <Checkbox
              size="small"
              color="secondary"
              defaultChecked={props.amentities_list[key] == 0}
              onChange={() => {
                if (props.amentities_list[key] != false) {
                  // Disable the option
                  props.on_change({ [key]: 0 } as Record<string, FlowerMinutes>);
                }
                if (!props.amentities_list[key]) {
                  // Convert it back to default state
                  props.on_change({ [key]: 5 } as Record<string, FlowerMinutes>);
                }
              }}
            />
            <Typography variant="h6" width={150}>
              Not relevant
            </Typography>
          </RoudedBG>
        </SurveyQuestionsContainer>
      ))}
    </>
  );
}

export default function Survey(props: SurveyProps) {
  // const navigate = useNavigate();
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
      return props.onDone();
    }
    return setStep((currentStep) => currentStep + 1);
  }

  const amenity_group = Object.keys(AMENITIES_GROUP)[step];
  const amentities_filtered = AMENITIES_GROUP[amenity_group];
  const percentage_completed: number = Math.round(
    (step / Object.keys(AMENITIES_GROUP).length) * 100
  );
  return (
    <Dialog open={true} maxWidth="xl">
      <IconButton
        onClick={() => props.onClose()}
        sx={{ position: "absolute", right: 10, top: 10 }}
      >
        <CloseIcon />
      </IconButton>
      <Container maxWidth="md">
        <Box>
          <Margin margin="30px 0 0 0" />
          <LinearProgressBar value={percentage_completed} />
          <Margin margin="30px 0 0 0" />
          <TypoGraphyContainer>
            <Typography variant="h4">
              Make a selection of the distance in minutes for the locations that are
              relevant for you (create your ideal city). The travel times are
              mode-independent.
            </Typography>
          </TypoGraphyContainer>
          <Margin margin="30px 0 0 0" />
          <Typography variant="h3" fontWeight="bold">
            {convert_to_pascal(amenity_group)}
          </Typography>
          <Margin margin="10px 0 0 0" />
          <PetalGenerator
            max_categories={amentities_filtered.length}
            category_color={D.FLOWER_CATEGORIES_COLOR[amenity_group]}
            list_of_minutes={amentities_filtered.map(
              (amenity: string) => amentities_list[amenity]
            )}
            width={90}
            height={90}
          />
          <Margin margin="20px 0 0 0" />
          <SurveyQuestions
            amentities_filtered={amentities_filtered}
            amentities_list={amentities_list}
            on_change={(changed_proximity) => {
              dispatch(set_amenity(changed_proximity));
            }}
          />
          <Stack direction="row" spacing={2} mt={4}>
            <Button variant="outlined" sx={{ width: "20vw" }} onClick={on_back_clicked}>
              {t("survey.back")}
            </Button>
            <Button variant="contained" sx={{ width: "20vw" }} onClick={continue_clicked}>
              {t("survey.continue")}
            </Button>
          </Stack>
        </Box>
      </Container>
    </Dialog>
  );
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 24px 0px;
  height: 800px;
  width: 800px;
`;

const TypoGraphyContainer = styled.div`
  text-align: center;
  color: ${D.PRIMARY_COLOR};
  max-width: 80%;
`;

const SurveyQuestionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin-top: 10px;
`;

const RoudedBG = styled.div`
  background-color: #f5f5f5;
  border-radius: 20px;
  display: flex;
  align-items: center;
  width: 120px;
`;

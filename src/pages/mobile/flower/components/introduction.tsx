import { Link } from "react-router-dom";
import styled from "styled-components";

import { Button, Stack, Typography } from "@mui/material";

import { useAppSelector } from "@hooks/context";

import { Margin } from "@components/common";

import FlowerImage from "@images/flower.jpg";

interface IntroductionProps {
  onClickContinue: () => void;
}

export default function Introduction(props: IntroductionProps) {
  const surevey_has_done = useAppSelector((state) => state.flower.survey_done_already);

  if (surevey_has_done) {
    return (
      <Box>
        <img src={FlowerImage} width="184" height="154" alt="flower" />
        <Margin margin="25px 0 0 0" />
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
              Go back
            </Button>
          </Link>
          <Button variant="contained" onClick={props.onClickContinue}>
            Edit Flower
          </Button>
        </Stack>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h3">
        The &apos;Proximity Flower&apos; helps map people&apos;s preferred city ammenities
        in relation to the distance to their homes
      </Typography>
      <Margin margin="25px 0 0 0" />
      <Typography variant="h3" fontWeight="bold">
        How does your flower looks like?
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
            Go back
          </Button>
        </Link>
        <Button variant="contained" onClick={props.onClickContinue}>
          Create Flower
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

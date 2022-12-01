import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Stack, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { get_amenities } from "@context/flower";

import * as D from "@constants/design";

import { Margin } from "@components/common";
import { Center } from "@components/common/center";

import { PaddingLayout } from "@layouts/mobile";

import Flower from "@images/flower2.png";

import { CustomizedAccordions } from "./components/accordion";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const amenities = useAppSelector((state) => state.flower.amenities);

  useEffect(() => {
    dispatch(get_amenities());
  }, []);

  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        padding={1}
        sx={{ backgroundColor: D.WHITE_COLOR }}
      >
        <IconButton onClick={() => navigate("/")}>
          <ArrowBackIcon sx={{ padding: 1 }} />
        </IconButton>
        <Typography variant="h2">My Personal Flower</Typography>
      </Stack>

      <PaddingLayout padding="10px 10px">
        <PaddingLayout padding="18px 24px">
          <Center>
            <img src={Flower} width="350" height="311" alt="flower" />
          </Center>
          <Margin margin="47px 0 0" />
          <CustomizedAccordions
            titles={Object.keys(amenities)}
            values={Object.values(amenities)}
          />
        </PaddingLayout>
      </PaddingLayout>
    </>
  );
}

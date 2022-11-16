import React from "react";

import { Typography } from "@mui/material";

import { Margin } from "@components/common";
import { Center } from "@components/common/center";

import { PaddingLayout } from "@layouts/mobile";

import Flower from "@images/flower2.png";

import { CustomizedAccordions } from "./components/accordion";

export default function Profile() {
  return (
    <>
      <PaddingLayout padding="10px 10px">
        <Typography variant="h1">My Personal Flower</Typography>
        <PaddingLayout padding="18px 24px">
          <Center>
            <img src={Flower} width="350" height="311" alt="flower" />
          </Center>
          <Margin margin="47px 0 0" />
          <CustomizedAccordions />
        </PaddingLayout>
      </PaddingLayout>
    </>
  );
}

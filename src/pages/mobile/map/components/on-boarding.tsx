import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Button, Stack, Typography } from "@mui/material";

import * as D from "@constants/design";

import { Margin } from "@components/common";

import FifteenMinute from "@images/15-min.jpg";
import BrandingImage from "@images/branding.jpg";
import IsochroneImage from "@images/isochrone.jpg";
import M4CImage from "@images/m4c-big.png";

const USER_SEEN_ONBOARDING = "USER_SEEN_ONBOARDING";

export function Onboarding() {
  const [open, set_open] = useState<boolean>(false);
  const { t } = useTranslation();

  const [user_seen_onboarding] = useState<string | null>(
    () => localStorage.getItem(USER_SEEN_ONBOARDING) || null
  );
  useEffect(() => {
    if (!user_seen_onboarding) {
      set_open(true);
    }
  }, [user_seen_onboarding]);

  function skip_onboarding() {
    localStorage.setItem(USER_SEEN_ONBOARDING, "yes");
    set_open(false);
  }

  const [page_index, set_page_index] = useState<number>(0);
  const pages = [
    {
      title: t("tutorial.welcomeMap4Citizens"),
      text: t("tutorial.Map4CitizensminuteDesc"),
      image: M4CImage,
      radius: 0,
    },
    {
      title: t("tutorial.15-minCity"),
      text: t("tutorial.15-minCityDesc"),
      image: FifteenMinute,
      radius: "5%",
    },
    {
      title: t("tutorial.isochrones"),
      text: t("tutorial.isochronesDesc"),
      image: IsochroneImage,
      radius: "10%",
    },
    {
      title: t("tutorial.readyToUse"),
      text: t("tutorial.readyToUseDesc"),
      image: BrandingImage,
      radius: "5%",
    },
  ];

  return (
    <Box visible={open}>
      <img
        src={pages[page_index].image}
        alt={pages[page_index].title}
        width="320px"
        style={{ borderRadius: pages[page_index].radius || 0 }}
      />
      <Margin margin="140px 0" />
      <Section>
        <Typography variant="h2" fontWeight="bold" color="white">
          {pages[page_index].title}
        </Typography>
        <Margin margin="20px 0" />
        <Typography variant="h5" color="white">
          {pages[page_index].text}
        </Typography>

        <Stack
          justifyContent="space-between"
          alignItems="center"
          direction="row"
          sx={{ position: "absolute", bottom: 20, left: 10, right: 20 }}
        >
          <Link to="/">
            <Button variant="text" sx={{ color: "white" }} onClick={skip_onboarding}>
              Skip
            </Button>
          </Link>
          <Button
            variant="contained"
            color="secondary"
            sx={{ color: "white" }}
            onClick={() => {
              if (page_index === pages.length - 1) {
                // Done scrolling
                localStorage.setItem(USER_SEEN_ONBOARDING, "yes");
                return set_open(false);
              }

              set_page_index((currPage) => currPage + 1);
            }}
          >
            {page_index === pages.length - 1 ? "Let's go!" : "Continue"}
          </Button>
        </Stack>
      </Section>
    </Box>
  );
}

const Box = styled.div<{ visible: boolean }>`
  display: ${(props) => (props.visible ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  padding: 100px 50px;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 4;
  background-color: white;
`;

const Section = styled.section`
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  height: 280px;
  background-color: ${D.PRIMARY_COLOR};
  padding: 60px 20px 0;
  border-radius: 28px 28px 0 0;
`;

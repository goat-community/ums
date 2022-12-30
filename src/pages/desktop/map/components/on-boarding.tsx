import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Button, Stack, Typography } from "@mui/material";

import * as D from "@constants/design";

import { Margin } from "@components/common";

import FifteenMinute from "@images/15-min.jpg";
import BrandingImage from "@images/branding.jpg";
import FakeMapDesktopImage from "@images/fakemapdesktop.png";
import IsochroneImage from "@images/isochrone.png";
import M4CImage from "@images/m4c-big.png";

const USER_SEEN_ONBOARDING = "USER_SEEN_ONBOARDING";

export function Onboarding() {
  const [open, set_open] = useState<boolean>(false);

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
      title: "Welcome to Map4Citizens!",
      text: "The aim of this application is to provide citizens with detailed information about their sustainable mobility options and local accessibility.",
      image: BrandingImage,
      radius: "5%",
      shadow: true,
    },
    {
      title: "Customized 15-min-city",
      text: "This is strongly linked to the concept of the 15-min-city. To assist you in finding your perfect 15-min-city location, which fulfills all your needs, you can create your personal “flower-of-proximity”. The application then shows you how well different locations in the city can serve your needs.",
      image: FifteenMinute,
      radius: "5%",
      shadow: true,
    },
    {
      title: "Isochrones",
      text: "By calculating isochrones, you can get a feeling how far you can travel by foot, bike and public transport, and which amenities you can reach. Furthermore, you can activate additional layers such as Noise Levels, Population Density, Land use and Public Transport Qualities.",
      image: IsochroneImage,
      radius: "5%",
      shadow: true,
    },
    {
      title: "Ready to use?",
      text: "With this application, we want assist citizens in getting a better understanding for their city and foster sustainable decisions. \r\n Have fun!",
      image: M4CImage,
      shadow: false,
    },
  ];

  return (
    <Box
      visible={open}
      style={{
        backgroundImage: ` linear-gradient(#ffffff7f, rgba(255,255,255,0.5)), url(${FakeMapDesktopImage})`,
      }}
    >
      <img
        src={pages[page_index].image}
        alt="onboard"
        width="35%"
        style={{
          borderRadius: pages[page_index].radius || 0,
          boxShadow: pages[page_index].shadow
            ? "0px 10px 15px -3px rgba(0,0,0,0.1)"
            : "none",
        }}
      />
      <Margin margin="130px 0" />
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
  background-size: cover;
  background-position: center;
  filter: blur(0.3);
`;

const Section = styled.section`
  position: fixed;
  right: 30%;
  left: 30%;
  bottom: 0;
  height: 250px;
  background-color: ${D.PRIMARY_COLOR};
  padding: 20px 20px 0;
  border-radius: 28px 28px 0 0;
`;

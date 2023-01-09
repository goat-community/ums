import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Button, Dialog, Stack, Typography } from "@mui/material";

import { Margin } from "@components/common";

import FifteenMinute from "@images/15-min.jpg";
import BrandingImage from "@images/branding.jpg";
import IsochroneImage from "@images/isochrone.jpg";
import M4CImage from "@images/m4c-pattern.png";

const USER_SEEN_ONBOARDING = "USER_SEEN_ONBOARDING";

interface OnboardingProps {
  force_open: boolean;
  close_onboarding_force: CallableFunction;
}

const pages = [
  {
    title: "Welcome to Map4Citizens!",
    text: "The aim of this application is to provide citizens with detailed information about their sustainable mobility options and local accessibility.",
    image: M4CImage,
    radius: 0,
    top: 70,
  },
  {
    title: "Customized 15-min-city",
    text: "This is strongly linked to the concept of the 15-min-city. To assist you in finding your perfect 15-min-city location, which fulfills all your needs, you can create your personal “flower-of-proximity”. The application then shows you how well different locations in the city can serve your needs.",
    image: FifteenMinute,
    radius: 0,
    top: 50,
  },
  {
    title: "Isochrones",
    text: "By calculating isochrones, you can get a feeling how far you can travel by foot, bike and public transport, and which amenities you can reach. Furthermore, you can activate additional layers such as Noise Levels, Population Density, Land use and Public Transport Qualities.",
    image: IsochroneImage,
    radius: "10%",
    top: 70,
  },
  {
    title: "Ready to use?",
    text: "With this application, we want assist citizens in getting a better understanding for their city and foster sustainable decisions. \r\n Have fun!",
    image: BrandingImage,
    radius: 0,
    width: "550px",
    top: 50,
  },
];

export function Onboarding(props: OnboardingProps) {
  const [open, set_open] = useState<boolean>(false);
  const [page_index, set_page_index] = useState<number>(0);

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
    props.close_onboarding_force();
    set_open(false);
  }

  return (
    <Dialog open={open || props.force_open} onClose={() => set_open(false)} maxWidth="xl">
      <Box>
        <img
          src={pages[page_index].image}
          alt="onboard"
          style={{
            borderRadius: pages[page_index].radius || 0,
            maxWidth: pages[page_index].width || "450px",
            margin: "auto",
            position: "absolute",
            top: pages[page_index].top || "15px",
          }}
        />

        <Section>
          <Typography variant="h2" fontWeight="bold" color="black" textAlign="left">
            {pages[page_index].title}
          </Typography>
          <Margin margin="20px 0" />
          <Typography variant="h4" color="black">
            {pages[page_index].text}
          </Typography>
        </Section>

        <Stack
          justifyContent="space-between"
          alignItems="center"
          direction="row"
          sx={{ position: "absolute", bottom: 20, left: 10, right: 20 }}
        >
          <Link to="/">
            <Button variant="text" sx={{ color: "black" }} onClick={skip_onboarding}>
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
                props.close_onboarding_force();
                return set_open(false);
              }

              set_page_index((currPage) => currPage + 1);
            }}
          >
            {page_index === pages.length - 1 ? "Let's go!" : "Continue"}
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  height: 500px;
  padding: 100px 0 70px;
  text-align: left;
`;

const Section = styled.section`
  position: absolute;
  bottom: 70px;
  height: 180px;
  padding: 0 45px;
`;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { ArrowBack } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { Margin } from "@components/common";

import FifteenMinute from "@images/15-min.jpg";
import EITLogo from "@images/eit.png";
import HumankindLogo from "@images/humankind.png";
import IsochroneImage from "@images/isochrone.jpg";
import M4CImage from "@images/logo-horizontal-black.png";
import Plan4BetterLogo from "@images/p4b.png";
import M4CImageSimplified from "@images/simplified_logo_primary.jpg";
import TumLogo from "@images/tum.png";

const USER_SEEN_ONBOARDING = "USER_SEEN_ONBOARDING";

interface OnboardingProps {
  force_open: boolean;
  close_onboarding_force: CallableFunction;
}

function About() {
  return (
    <Container>
      <img src={M4CImage} width="200px" style={{ marginLeft: -23 }} />
      <Margin margin="30px 0" />
      <Typography fontSize="16px" color="black">
        The application was developed by:
      </Typography>
      <Stack direction="row" spacing={2} mt={2}>
        <img src={Plan4BetterLogo} width="auto" height="30vh" alt="p4b-logo" />
        <img src={HumankindLogo} width="auto" height="30vh" alt="humankind-logo" />
        <img src={TumLogo} width="auto" height="30vh" alt="tum-logo" />
      </Stack>
      <Margin margin="20px 10px" />
      <Typography fontSize="16px" color="black">
        This project is funded by EIT Urban Mobility, an initiative of the European
        Institute of Innovation and Technology (EIT), a body of the European Union. EIT
        Urban Mobility acts to accelerate positive change on mobility to make urban spaces
        more liveable. Learn more:{" "}
        <a href="eiturbanmobility.eu" style={{ color: "blue" }}>
          eiturbanmobility.eu
        </a>
      </Typography>
      <Margin margin="10px 0" />
      <img src={EITLogo} width="auto" height="50vh" />
    </Container>
  );
}

const pages = [
  {
    title: "Welcome to Map4Citizens!",
    text: "The aim of this application is to provide citizens with detailed information about their sustainable mobility options and local accessibility.",
    image: M4CImageSimplified,
    radius: 0,
    top: 140,
  },
  {
    title: "Customized 15-min-city",
    text: "This is strongly linked to the concept of the 15-min-city. To assist you in finding your perfect 15-min-city location, which fulfills all your needs, you can create your personal “flower-of-proximity”. The application then shows you how well different locations in the city can serve your needs.",
    image: FifteenMinute,
    radius: 0,
    top: 60,
    width: "50vh",
  },
  {
    title: "Isochrones",
    text: "By calculating isochrones, you can get a feeling how far you can travel by foot, bike and public transport, and which amenities you can reach. Furthermore, you can activate additional layers such as Noise Levels, Population Density, Land use and Public Transport Qualities.",
    image: IsochroneImage,
    radius: "10%",
    top: 70,
    width: "50vh",
  },
  {
    title: "Ready to use?",
    text: "With this application, we want assist citizens in getting a better understanding for their city and foster sustainable decisions. \r\n Have fun!",
    component: <About />,
    radius: 0,
    top: 0,
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

  function go_back() {
    set_page_index(page_index - 1);
  }

  return (
    <Dialog open={open || props.force_open} onClose={() => set_open(false)} maxWidth="xl">
      {page_index > 0 && (
        <DialogTitle>
          <IconButton onClick={go_back}>
            <ArrowBack />
          </IconButton>
        </DialogTitle>
      )}
      <Box>
        {pages[page_index]?.image ? (
          <img
            src={pages[page_index].image}
            alt="onboard"
            style={{
              borderRadius: pages[page_index].radius || 0,
              maxWidth: pages[page_index].width || "450px",
            }}
          />
        ) : (
          <>{pages[page_index]?.component}</>
        )}

        <Section>
          <Typography variant="h2" fontWeight="bold" color="black" textAlign="left">
            {pages[page_index].title}
          </Typography>
          <Margin margin="20px 0" />
          <Typography fontSize="16px" color="black">
            {pages[page_index].text}
          </Typography>
        </Section>

        <Stack
          justifyContent="space-between"
          alignItems="center"
          direction="row"
          width={"85%"}
        >
          <Link to="/">
            <Button variant="outlined" sx={{ color: "black" }} onClick={skip_onboarding}>
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
  width: 550px;
  height: 650px;
  text-align: left;
`;

const Section = styled.section`
  padding: 40px 45px;
`;

const Container = styled.section`
  padding: 0 45px;
`;

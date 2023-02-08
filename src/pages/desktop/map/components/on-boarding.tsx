import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
import TumLogo from "@images/tum.png";

const USER_SEEN_ONBOARDING = "USER_SEEN_ONBOARDING";

interface OnboardingProps {
  force_open: boolean;
  close_onboarding_force: CallableFunction;
}

function About() {
  const { t } = useTranslation();

  return (
    <Container>
      <img src={M4CImage} width="200px" style={{ marginLeft: -23 }} />
      <Margin margin="30px 0" />
      <Typography fontSize="1.7vh" color="black">
        {t("introduction.wasDevelopedBy")}
      </Typography>
      <Stack direction="row" spacing={2} mt={2}>
        <img src={Plan4BetterLogo} width="auto" height="30vh" alt="p4b-logo" />
        <img src={HumankindLogo} width="auto" height="30vh" alt="humankind-logo" />
        <img src={TumLogo} width="auto" height="30vh" alt="tum-logo" />
      </Stack>
      <Margin margin="20px 10px" />
      <Typography fontSize="1.7vh" color="black">
        {t("introduction.projectDescription")}{" "}
        <a
          href="https://eiturbanmobility.eu"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "blue" }}
        >
          eiturbanmobility.eu
        </a>
      </Typography>
      <Margin margin="10px 0" />
      <img src={EITLogo} width="auto" height="50vh" />
    </Container>
  );
}

export function Onboarding(props: OnboardingProps) {
  const [open, set_open] = useState<boolean>(false);
  const [page_index, set_page_index] = useState<number>(0);
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
    props.close_onboarding_force();
    set_open(false);
  }
  const pages = [
    {
      title: t("tutorial.welcomeMap4Citizens"),
      text: t("tutorial.Map4CitizensminuteDesc"),
      image: M4CImage,
      radius: 0,
      top: 140,
    },
    {
      title: t("tutorial.15-minCity"),
      text: t("tutorial.15-minCityDesc"),
      image: FifteenMinute,
      radius: 0,
      top: 60,
      width: "50vh",
    },
    {
      title: t("tutorial.isochrones"),
      text: t("tutorial.isochronesDesc"),
      image: IsochroneImage,
      radius: "10%",
      top: 70,
      width: "50vh",
    },
    {
      title: t("tutorial.readyToUse"),
      text: t("tutorial.readyToUseDesc"),
      component: <About />,
      radius: 0,
      top: 0,
    },
  ];

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
            {page_index === pages.length - 1
              ? t("tutorial.letsGo")
              : t("tutorial.continue")}
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

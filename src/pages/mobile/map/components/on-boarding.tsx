import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { ArrowBack } from "@mui/icons-material";
import { Button, IconButton, Stack, Typography } from "@mui/material";

import * as D from "@constants/design";

import { Margin } from "@components/common";

import FifteenMinute from "@images/15-min.jpg";
import EITLogo from "@images/eit.png";
import HumankindLogo from "@images/humankind.png";
import IsochroneImage from "@images/isochrone.jpg";
import M4CLogoSmall from "@images/logo-horizontal-black.png";
import Plan4BetterLogo from "@images/p4b.png";
import M4CImage from "@images/simplified_logo_primary.jpg";
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
      <img src={M4CLogoSmall} width="200px" style={{ marginLeft: -23 }} />
      <Margin margin="15px 0" />
      <Typography variant="h6" color="black">
        {t("introduction.wasDevelopedBy")}
      </Typography>
      <Stack direction="row" spacing={2} mt={2}>
        <img src={Plan4BetterLogo} width="auto" height="28px" alt="p4b-logo" />
        <img src={HumankindLogo} width="auto" height="28px" alt="humankind-logo" />
        <img src={TumLogo} width="auto" height="28px" alt="tum-logo" />
      </Stack>
      <Margin margin="15px 5px" />
      <Typography fontSize={13} color="black">
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
      <img src={EITLogo} width="100%" />
    </Container>
  );
}

function Feedback() {
  const { t } = useTranslation();

  return (
    <>
      <img src={M4CLogoSmall} width="280px" />
      <Container>
        <Typography fontSize="15px" color="black" fontWeight="bold" textAlign="left">
          {t("tutorial.giveUsFeedback")}
        </Typography>
        <Margin margin="10px 0" />
        <Typography fontSize="15px" color="black">
          {t("tutorial.giveUsFeedbackDesc")}{" "}
          <BlueLink>
            <a href={t("tutorial.giveUsFeedbackLink")} target="_blank" rel="noreferrer">
              {t("tutorial.giveUsFeedbackLink")}
            </a>{" "}
          </BlueLink>{" "}
          {t("tutorial.giveUsFeedbackDescHelper")}
        </Typography>
      </Container>
    </>
  );
}

export function Onboarding(props: OnboardingProps) {
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
    props.close_onboarding_force();
    set_open(false);
  }

  const [page_index, set_page_index] = useState<number>(0);
  const pages = [
    {
      title: t("tutorial.welcomeMap4Citizens"),
      text: t("tutorial.Map4CitizensminuteDesc"),
      image: M4CImage,
      radius: 0,
      size: "280px",
    },
    {
      title: t("tutorial.15-minCity"),
      text: t("tutorial.15-minCityDesc"),
      image: FifteenMinute,
      radius: 0,
      size: "350px",
    },
    {
      title: t("tutorial.isochrones"),
      text: t("tutorial.isochronesDesc"),
      image: IsochroneImage,
      radius: "10%",
      size: "330px",
    },
    {
      title: t("tutorial.readyToUse"),
      text: t("tutorial.readyToUseDesc"),
      component: <About />,
    },
    {
      title: t("tutorial.readyToUse"),
      text: t("tutorial.readyToUseDesc"),
      component: <Feedback />,
    },
  ];

  function go_back() {
    set_page_index(page_index - 1);
  }

  return (
    <Box visible={open || props.force_open}>
      {pages[page_index]?.component ? (
        <>{pages[page_index]?.component}</>
      ) : (
        <img
          src={pages[page_index].image}
          alt={pages[page_index].title}
          width={pages[page_index].size}
          style={{ borderRadius: pages[page_index].radius || 0 }}
        />
      )}
      <Margin margin="140px 0" />
      <Section>
        <Typography variant="h2" fontWeight="bold" color="white">
          {pages[page_index].title}
        </Typography>
        <Margin margin="20px 0" />
        <Typography fontSize={13} color="white">
          {pages[page_index].text}
        </Typography>

        <Stack
          justifyContent="space-between"
          alignItems="center"
          direction="row"
          sx={{ position: "absolute", bottom: 20, left: 10, right: 20 }}
        >
          {page_index > 0 ? (
            <IconButton onClick={go_back}>
              <ArrowBack color="secondary" />
            </IconButton>
          ) : (
            <Link to="/">
              <Button variant="text" sx={{ color: "white" }} onClick={skip_onboarding}>
                {t("tutorial.skip")}
              </Button>
            </Link>
          )}

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
  padding: 100px 20px;
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
  height: 250px;
  background-color: ${D.PRIMARY_COLOR};
  padding: 60px 20px 0;
  border-radius: 28px 28px 0 0;
`;

const Container = styled.section`
  max-width: 100%;
  padding: 0 5px;
`;

const BlueLink = styled.a`
  color: blue;
`;

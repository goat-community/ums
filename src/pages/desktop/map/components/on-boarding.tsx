import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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
      <Typography fontSize="1rem" color="black">
        {t("introduction.wasDevelopedBy")}
      </Typography>
      <Stack direction="row" spacing={2} mt={2}>
        <img src={Plan4BetterLogo} width="auto" height="45vh" alt="p4b-logo" />
        <img
          src={HumankindLogo}
          width="auto"
          height="30vh"
          alt="humankind-logo"
          style={{ marginTop: 10 }}
        />
        <img
          src={TumLogo}
          width="auto"
          height="30vh"
          alt="tum-logo"
          style={{ marginTop: 10 }}
        />
      </Stack>
      <Margin margin="20px 10px" />
      <Typography fontSize="1rem" color="black">
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

function Feedback() {
  const { t } = useTranslation();

  return (
    <>
      <img src={M4CImage} width="400px" />
      <Margin margin="10px 0" />
      <Section>
        <Typography variant="h2" fontWeight="bold" color="black" textAlign="left">
          {t("tutorial.readyToUse")}
        </Typography>
        <Margin margin="20px 0" />
        <Typography fontSize="1rem" color="black">
          {t("tutorial.readyToUseDesc")}
        </Typography>
      </Section>
      <Margin margin="10px 0" />
      <Section no_padding>
        <Typography variant="h2" fontWeight="bold" color="black" textAlign="left">
          {t("tutorial.giveUsFeedback")}
        </Typography>
        <Margin margin="20px 0" />
        <Typography fontSize="1rem" color="black">
          {t("tutorial.giveUsFeedbackDesc")}{" "}
          <BlueLink>
            <a href={t("tutorial.giveUsFeedbackLink")} target="_blank" rel="noreferrer">
              {t("tutorial.giveUsFeedbackLink")}
            </a>{" "}
          </BlueLink>{" "}
          {t("tutorial.giveUsFeedbackDescHelper")}
        </Typography>
      </Section>
    </>
  );
}

export function Onboarding(props: OnboardingProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [page_index, set_page_index] = useState<number>(0);
  const { t } = useTranslation();

  const [user_seen_onboarding] = useState<string | null>(
    () => localStorage.getItem(USER_SEEN_ONBOARDING) || null
  );

  useEffect(() => {
    if (!user_seen_onboarding) {
      setOpen(true);
    }
  }, [user_seen_onboarding]);

  function skip_onboarding() {
    localStorage.setItem(USER_SEEN_ONBOARDING, "yes");
    props.close_onboarding_force();
    setOpen(false);
    set_page_index(0);
  }
  const pages = [
    {
      title: t("tutorial.welcomeMap4Citizens"),
      text: t("tutorial.Map4CitizensminuteDesc"),
      image: M4CImage,
      radius: 0,
      padding: "15% 0",
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
      text: "",
      component: <About />,
      radius: 0,
      top: 0,
      no_text: true,
      is_component: true,
    },
    {
      title: "Feedback",
      text: "Feedback",
      component: <Feedback />,
      radius: 0,
      top: 0,
      no_text: true,
      is_component: true,
    },
  ];

  function go_back() {
    set_page_index(page_index - 1);
  }
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Dialog
      open={open || props.force_open}
      onClose={handleClose}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      PaperProps={{
        sx: {
          minHeight: "70%",
        },
      }}
    >
      <DialogContent dividers={scroll === "paper"}>
        <DialogTitle p={0} m={0}>
          <Stack
            direction="row"
            justifyContent="flex-end"
            style={{
              padding: 0,
              marginTop: -20,
              marginRight: -30,
            }}
          >
            <IconButton onClick={skip_onboarding}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef}>
          {pages[page_index]?.is_component ? (
            <>{pages[page_index]?.component}</>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 0 50px 0",
              }}
            >
              <img
                src={pages[page_index].image}
                alt="onboard"
                data-testid="test-onboarding-image"
                style={{
                  borderRadius: pages[page_index].radius || 0,
                  maxWidth: "70%",
                  alignSelf: "center",
                  padding: pages[page_index].padding || 0,
                }}
              />
            </div>
          )}

          {!pages[page_index].no_text && (
            <Section>
              <Typography
                variant="h2"
                fontSize="1.5rem"
                fontWeight="bold"
                color="black"
                textAlign="left"
              >
                {pages[page_index].title}
              </Typography>
              <Margin margin="20px 0" />
              <Typography color="black" fontSize="1rem">
                {pages[page_index].text}
              </Typography>
            </Section>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        style={{ justifyContent: "space-between", paddingInline: 50, paddingBlock: 15 }}
      >
        <Button
          data-testid="test-onboarding-previous-button"
          variant="outlined"
          sx={{ color: "black" }}
          onClick={go_back}
          disabled={page_index <= 0}
        >
          {t("tutorial.previous")}
        </Button>
        <Button
          data-testid="test-onboarding-continue-button"
          variant="contained"
          color="secondary"
          sx={{ color: "white" }}
          onClick={() => {
            if (page_index === pages.length - 1) {
              // Done scrolling
              localStorage.setItem(USER_SEEN_ONBOARDING, "yes");
              props.close_onboarding_force();
              set_page_index(0);
              return setOpen(false);
            }
            set_page_index((currPage) => currPage + 1);
          }}
        >
          {page_index === pages.length - 1
            ? t("tutorial.letsGo")
            : t("tutorial.continue")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const Section = styled.section<{ no_padding?: boolean }>`
  padding: ${(props) => (props.no_padding ? "0 35px" : "10px 35px")};
  font-size: calc(1rem + 1vw) !important;
`;

const Container = styled.section`
  padding: 0 45px;
`;

const BlueLink = styled.a`
  color: blue;
`;

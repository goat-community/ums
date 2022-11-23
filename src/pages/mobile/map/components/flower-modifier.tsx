import React, { useState } from "react";
import styled from "styled-components";

import { Chip, Slider, Stack, Typography } from "@mui/material";

import * as D from "@constants/design";

import artistpallete from "@images/artist-palette.png";
import Icon from "@images/icon.png";
import tree from "@images/tree.png";

const POI_LIST = [
  { label: "Personal", icon: <img src={Icon} width="18" height="18" /> },
  { label: "Nature lover", icon: <img src={tree} width="18" height="18" /> },
  { label: "Creative spirit", icon: <img src={artistpallete} width="18" height="18" /> },
];

export function FlowerModifier() {
  const [mode, setMode] = useState<string>("walking");

  const segmented_section_style = {
    overflowX: "scroll",
    paddingBottom: "30px",
    paddingRight: "30px",
  };
  const typography_style = { fontSize: "11px", width: 130 };

  return (
    <Section>
      <Stack direction="row" maxWidth={250} alignItems="center">
        <Typography variant="h6" sx={typography_style}>
          Distance (min.)
        </Typography>
        <Slider defaultValue={5} max={15} valueLabelDisplay="auto" />
      </Stack>
      <SegmentedSection>
        {["walking", "running", "driving"].map((i) => (
          <SegementedButton key={i} active={mode === i} onClick={() => setMode(i)}>
            <Typography variant="h6">{i}</Typography>
          </SegementedButton>
        ))}
      </SegmentedSection>
      <Stack
        direction="row"
        width={"90vw"}
        spacing={1}
        alignItems="center"
        marginTop={"17px"}
        sx={segmented_section_style}
      >
        {POI_LIST.map((i, index) => (
          <Chip
            key={i.label}
            icon={i.icon}
            label={i.label}
            color={index === 0 ? "primary" : "default"}
          />
        ))}
      </Stack>
    </Section>
  );
}

const Section = styled.section`
  position: fixed;
  left: 20px;
  bottom: calc(${D.BOTTOM_BAR_HEIGHT}px);
  padding-left: env(safe-area-inset-left, 20px);
  padding-bottom: env(safe-area-inset-bottom, 100px);
  border-radius: 16px;
  z-index: -1;
`;

const SegmentedSection = styled.section`
  border-radius: 12px;
  background-color: ${D.LIGHT_PRIMARY};
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 75%;
  height: 28px;
`;

const SegementedButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  width: 100%;
  border: 1px solid black;
  background-color: ${(props) => (props.active ? D.LIGHT_PRIMARY : D.WHITE_COLOR)};

  &:nth-child(1) {
    border-radius: 12px 0 0 12px;
    border-right: none;
  }

  &:nth-child(3) {
    border-radius: 0 12px 12px 0;
    border-left: none;
  }
`;

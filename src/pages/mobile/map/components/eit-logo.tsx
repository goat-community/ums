import React from "react";
import styled from "styled-components";

import { useAppSelector } from "@hooks/context";

import * as D from "@constants/design";

import EITLOGO from "@images/eit.png";
import EITWHITELOGO from "@images/eit-white.png";

export function EITLogo() {
  const mapStyleUrl = useAppSelector((state) => state.map.style);

  const base_layers = {
    "streets-v12": { logo: EITLOGO },
    "satellite-streets-v12": { logo: EITWHITELOGO },
    "light-v11": { logo: EITLOGO },
    "dark-v11": { logo: EITWHITELOGO },
    "navigation-day-v1": { logo: EITLOGO },
  };

  const current_style = mapStyleUrl?.split("/")?.pop();
  const EIT_logo = base_layers[current_style]?.logo || EITLOGO;

  return (
    <LogoWrapper>
      <img src={EIT_logo} alt="EIT Logo" height={32} />
    </LogoWrapper>
  );
}

const LogoWrapper = styled.div`
  position: fixed;
  left: 10px;
  padding-left: env(safe-area-inset-right, 10px);
  padding-bottom: env(safe-area-inset-bottom, 80px);
  bottom: calc(${D.BOTTOM_BAR_HEIGHT}px + 20px);
`;

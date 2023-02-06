import React from "react";

import { useAppSelector } from "@hooks/context";

import EITLOGO from "@images/eit.png";
import EITWHITELOGO from "@images/eit-white.png";

export function EitLogo() {
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

  return <img src={EIT_logo} alt="EIT" width="auto" height={55} />;
}

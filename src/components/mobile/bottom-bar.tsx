import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import BarChartIcon from "@mui/icons-material/BarChart";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { Typography } from "@mui/material";

import * as D from "@constants/design";

export function BottomBar() {
  const location = useLocation().pathname;

  /** Inlince styles of buttons */
  const icon_style = {
    fontSize: "24px",
    marginBottom: "8px",
    color: "currentColor",
  };
  const icon_style_active = {
    color: D.PRIMARY_COLOR,
    backgroundColor: D.HOVER_COLOR,
    width: "64px",
    padding: "4px 0",
    borderRadius: "16px",
  };

  const navigation_items = [
    {
      path: "/map",
      name: "Map",
      icon: <FmdGoodIcon sx={location === "/map" ? icon_style_active : icon_style} />,
    },
    {
      path: "/insights",
      name: "Insights",
      icon: (
        <BarChartIcon sx={location === "/insights" ? icon_style_active : icon_style} />
      ),
    },
  ];

  return (
    <Section>
      {navigation_items.map(({ path, name, icon }) => (
        <NavigationItem key={path}>
          <Link to={path}>
            <NavigationItem>
              {icon}
              <Typography variant="h6">{name}</Typography>
            </NavigationItem>
          </Link>
        </NavigationItem>
      ))}
    </Section>
  );
}

const Section = styled.section`
  width: 100vw;
  height: ${D.BOTTOM_BAR_HEIGHT}px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  z-index: 2;
  background: linear-gradient(0deg, rgba(103, 80, 164, 0.08), rgba(103, 80, 164, 0.08)),
    #fffbfe;
`;

const NavigationItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: ${D.BLACK_COLOR};
`;

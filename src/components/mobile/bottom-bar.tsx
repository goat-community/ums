import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import MapIcon from "@mui/icons-material/Map";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import { Typography } from "@mui/material";

import * as D from "@constants/design";

export function BottomBar() {
  const path = useLocation().pathname;
  const { t } = useTranslation();

  const navigation_items = [
    {
      path: "/",
      name: t("bars.map"),
      icon: <MapIcon sx={path === "/" ? icon_active : icon_style} />,
    },
    {
      path: "/insights",
      name: t("bars.insights"),
      icon: (
        <TableChartOutlinedIcon sx={path === "/insights" ? icon_active : icon_style} />
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
  padding-bottom: env(safe-area-inset-bottom, 0px);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  z-index: 2;
  background: ${D.WHITE_COLOR};
`;

const NavigationItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: ${D.BLACK_COLOR};
  width: 64px;
  padding: 4px 0;
`;

/** Inlince styles of buttons */
const icon_style = {
  fontSize: "24px",
  color: "currentColor",
  width: "64px",
  padding: "4px 0",
};

const icon_active = {
  color: D.BLACK_COLOR,
  backgroundColor: D.GREEN_PRIMARY_LIGHT,
  width: "64px",
  padding: "4px 0",
  borderRadius: "16px",
};

import { useTranslation } from "react-i18next";
import { type LngLat } from "react-map-gl";
import MatGeocoder from "react-mui-mapbox-geocoder";
import styled from "styled-components";

import { Stack, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { get_point_isochrone } from "@context/isochrones";
import { setAddress, setPickingMode } from "@context/map";
import { view_bounds_selector } from "@context/map/maps-selector";
import { temprorary_open } from "@context/openers";

import { MAPBOX_TOKEN } from "@constants";

import { Margin } from "@components/common";

import M4CLOGO_WHITE from "@images/logo-horizontal.png";
import M4CLOGO from "@images/logo-horizontal-black.png";

import { FlowerButton } from "./floating-flower";
import { IsochroneButton } from "./isochrone-button";

export function Header(props: { position?: string; dark_theme?: boolean }) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const viewBounds = useAppSelector(view_bounds_selector);
  const survey_has_done = useAppSelector((state) => state.flower.survey_done_already);
  const mapStyleUrl = useAppSelector((state) => state.map.style);

  const onSelectHandler = (result) => {
    if (survey_has_done) {
      const point = {
        lng: result.center[0],
        lat: result.center[1],
      } as LngLat;
      dispatch(setPickingMode(true));
      dispatch(get_point_isochrone(point));
      dispatch(setAddress(result?.place_name));
    } else {
      // Open the flower modal
      dispatch(temprorary_open("flower_open"));
    }
  };

  const base_layers = {
    "streets-v12": { logo: M4CLOGO, color: "black", marginLeft: -30 },
    "satellite-streets-v12": { logo: M4CLOGO_WHITE, color: "white", marginLeft: 0 },
    "light-v11": { logo: M4CLOGO, color: "black", marginLeft: -30 },
    "dark-v11": { logo: M4CLOGO_WHITE, color: "white", marginLeft: 0 },
    "navigation-day-v1": { logo: M4CLOGO, color: "black", marginLeft: -30 },
  };

  const current_style = mapStyleUrl?.split("/")?.pop();
  const M4C_logo = base_layers[current_style]?.logo || M4CLOGO;
  const M4C_logotext_color = base_layers[current_style]?.color || "black";
  const marginLeft = base_layers[current_style]?.marginLeft || 0;

  return (
    <Section position={props.position || "fixed"}>
      <img
        src={props.dark_theme ? M4CLOGO : M4C_logo}
        height="60px"
        style={{ marginLeft: marginLeft }}
      />

      <Typography variant="h6" color={props.dark_theme ? "black" : M4C_logotext_color}>
        {t("placeholders.howDoesYourCityScore")}
      </Typography>
      <Margin margin="13px 0 0" />
      <MatGeocoder
        key={0}
        inputPlaceholder={t("placeholders.addressSearch")}
        accessToken={MAPBOX_TOKEN}
        onSelect={onSelectHandler}
        showLoader={true}
        country="de"
        bbox={viewBounds}
        inputPaperProps={{
          style: {
            width: "290px",
            padding: "0 10px",
            minHeight: "56px",
            height: "56px",
            boxShadow: "none",
            borderRadius: "4px 4px 0 0",
            borderBottom: "1px solid black",
            backgroundColor: "white",
          },
        }}
        suggestionsPaperProps={{
          style: {
            zIndex: 2,
          },
        }}
      />
      <Stack spacing={1} direction="row" mt={2} mb={2}>
        <IsochroneButton />
        <FlowerButton />
      </Stack>
    </Section>
  );
}

const Section = styled.section<{ position: string }>`
  position: ${(props) => props.position};
  margin: ${(props) => (props.position != "fixed" ? "50px 50px 0" : "0")};
  padding-left: env(safe-area-inset-right, 50px);
  padding-top: env(safe-area-inset-bottom, 50px);
  top: 50px;
  left: 50px;
`;

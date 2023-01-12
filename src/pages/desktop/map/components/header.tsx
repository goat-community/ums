import { useTranslation } from "react-i18next";
import { type LngLat } from "react-map-gl";
import MatGeocoder from "react-mui-mapbox-geocoder";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Stack, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { get_point_isochrone } from "@context/isochrones";
import { setAddress, setPickingMode } from "@context/map";
import { view_bounds_selector } from "@context/map/maps-selector";

import { MAPBOX_TOKEN } from "@constants";

import { Margin } from "@components/common";

import M4CLOGO from "@images/m4c-big.png";
import M4CLOGO_WHITE from "@images/m4c-white.png";

import { FlowerButton } from "./floating-flower";
import { IsochroneButton } from "./isochrone-button";

export function Header(props: { position?: string }) {
  const navigate = useNavigate();
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
      navigate("/flower");
    }
  };

  const base_layers = {
    "streets-v12": { logo: M4CLOGO, color: "black" },
    "satellite-streets-v12": { logo: M4CLOGO_WHITE, color: "white" },
    "light-v11": { logo: M4CLOGO, color: "black" },
    "dark-v11": { logo: M4CLOGO_WHITE, color: "white" },
    "navigation-day-v1": { logo: M4CLOGO, color: "black" },
  };

  const current_style = mapStyleUrl?.split("/")?.pop();
  const M4C_logo = base_layers[current_style]?.logo || M4CLOGO;
  const M4C_logotext_color = base_layers[current_style]?.color || "black";

  return (
    <Section position={props.position || "fixed"}>
      <img src={M4C_logo} height="25px" />

      <Typography variant="h6" color={M4C_logotext_color}>
        How does your city score in terms of accessibility?
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

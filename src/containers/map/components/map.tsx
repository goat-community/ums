import { memo } from "react";
import { useTranslation } from "react-i18next";
import Map, { type LngLat, Popup } from "react-map-gl";

import { Close } from "@mui/icons-material";
import {
  Box,
  Chip,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

import { MapView } from "@types";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { setPopupInfo } from "@context/map";

// import { isochrones_selector } from "@context/isochrones/isochrones-selector";
import { API_TOKEN, MAPBOX_TOKEN } from "@constants";

// import { GeocoderControl } from "@components/common";
// import PinIcon from "@images/pin.png";
import Isochrones from "./isochrones";
import Layers from "./layers";
import MaskLayer from "./mask";
import PoiLayer from "./pois";
import ScoreLayer from "./score-layer";

import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
  view: MapView;
  viewBounds: [number, number, number, number] | null;
  picking_mode: boolean;
  on_click_point: (e: LngLat) => void;
}

function MapComponent(props: MapProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const mapStyle = useAppSelector((state) => state.map.style);
  const popupInfo = useAppSelector((state) => state.map.popupInfo);
  const cursor_mode = props.picking_mode ? "crosshair" : "default";
  return (
    <Map
      id="map"
      cursor={cursor_mode}
      initialViewState={props.view}
      maxBounds={props.viewBounds}
      mapboxAccessToken={MAPBOX_TOKEN}
      mapStyle={mapStyle}
      style={{ top: 0, left: 0, bottom: 0, right: 0, zIndex: -1, position: "fixed" }}
      onClick={(e) => props.on_click_point(e.lngLat as LngLat)}
      transformRequest={(url) => {
        if (url.startsWith("https://goat") || url.startsWith("http://localhost")) {
          return {
            url: url,
            headers: { Authorization: "Bearer " + API_TOKEN },
          };
        }
      }}
    >
      {/** Score Layer */}
      <ScoreLayer />
      {/** Isochrones */}
      <Isochrones />
      {/** Layers */}
      <Layers />
      {/** POIS */}
      <PoiLayer />
      <MaskLayer />
      {/** Popup */}
      {popupInfo && (
        <Popup
          style={{
            zIndex: 20,
            minWidth: "220px",
            padding: "0px",
          }}
          maxWidth="320px"
          anchor="bottom"
          longitude={Number(popupInfo.longitude)}
          latitude={Number(popupInfo.latitude)}
          closeButton={false}
          onClose={() => dispatch(setPopupInfo(null))}
        >
          <Paper
            elevation={0}
            sx={{
              maxWidth: 300,
            }}
          >
            <Box position="absolute" top={5} right={5}>
              <IconButton onClick={() => dispatch(setPopupInfo(null))}>
                <Close />
              </IconButton>
            </Box>
            <Typography sx={{ m: 1 }} variant="h4">
              {popupInfo.title}
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <Table size="small">
              <TableBody>
                {popupInfo.content &&
                  Object.keys(popupInfo.content)
                    .filter((k) => k !== "color")
                    .map((key) => (
                      <TableRow key={popupInfo.uid}>
                        <TableCell align="left" component="th" scope="row">
                          {t(`popup.${key}`).toUpperCase()}
                        </TableCell>
                        {!popupInfo.content["score"] && (
                          <TableCell align="left">{popupInfo.content[key]}</TableCell>
                        )}
                        {popupInfo.content["score"] && (
                          <Chip
                            label={popupInfo.content[key]}
                            clickable={false}
                            sx={{
                              mb: 1,
                            }}
                            style={{
                              backgroundColor: `rgb(${popupInfo.content[
                                "color"
                              ].toString()})`,
                            }}
                          />
                        )}
                        <Divider />
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </Paper>
        </Popup>
      )}
    </Map>
  );
}

export const MemoiezedMap = memo(MapComponent);

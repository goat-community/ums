import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Close } from "@mui/icons-material";
import MapIcon from "@mui/icons-material/Map";
import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import Fab from "@mui/material/Fab";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { set_map_style } from "@context/map";

import * as D from "@constants/design";

import { ListTile } from "@components/common";
import { ArrowPopper } from "@components/common/arrow-popper";

export function BaseMapSelector() {
  const dispatch = useAppDispatch();
  const mapStyleUrl = useAppSelector((state) => state.map.style);
  const { t } = useTranslation();

  const styles = {
    mapbox_streets: "mapbox://styles/mapbox/streets-v12",
    mapbox_satellite: "mapbox://styles/mapbox/satellite-streets-v12",
    mapbox_light: "mapbox://styles/mapbox/light-v11",
    mapbox_dark: "mapbox://styles/mapbox/dark-v11",
    mapbox_navigation: "mapbox://styles/mapbox/navigation-day-v1",
  };

  const items = [
    {
      value: "mapbox_streets",
      title: t("baseMaps.highFidelity"),
      subtitle: t("baseMaps.highFidelityDescription"),
      thumbnail: "https://i.imgur.com/aVDMUKAm.png",
    },
    {
      value: "mapbox_satellite",
      title: t("baseMaps.sateliteStreets"),
      subtitle: t("baseMaps.sateliteStreetsDescription"),
      thumbnail: "https://i.imgur.com/JoMGuUOm.png",
    },
    {
      value: "mapbox_light",
      title: t("baseMaps.light"),
      subtitle: t("baseMaps.lightDescription"),
      thumbnail: "https://i.imgur.com/jHFGEEQm.png",
    },
    {
      value: "mapbox_dark",
      title: t("baseMaps.dark"),
      subtitle: t("baseMaps.darkDescription"),
      thumbnail: "https://i.imgur.com/PaYV5Gjm.png",
    },
    {
      value: "mapbox_navigation",
      title: t("baseMaps.traffic"),
      subtitle: t("baseMaps.trafficDescription"),
      thumbnail: "https://i.imgur.com/lfcARxZm.png",
    },
  ];

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(() => {
    const selectedMapStyle = Object.keys(styles).find(
      (key) => styles[key] === mapStyleUrl
    );
    return [items.findIndex((item) => item.value === selectedMapStyle)];
  });

  return (
    <>
      <ArrowPopper
        content={
          <Paper sx={{ maxWidth: 400, overflow: "auto" }}>
            <Box position="absolute" top={5} right={5}>
              <IconButton onClick={() => setOpen(false)}>
                <Close />
              </IconButton>
            </Box>

            <Typography sx={{ m: 2 }} variant="h4">
              {t("baseMaps.title")}
            </Typography>
            <ListTile
              items={items}
              selected={selected}
              thumbnailBorder="rounded"
              onChange={(value) => {
                setSelected(value);
                const selectedMapStyle = items[value[0]].value;
                dispatch(set_map_style(styles[selectedMapStyle]));
              }}
            />
          </Paper>
        }
        open={open}
        placement="top"
        arrow={true}
        onClose={() => setOpen(false)}
      >
        <Tooltip title={t("tooltips.openBaseMap")} arrow placement="left">
          <Fab
            onClick={() => setOpen(!open)}
            size="large"
            sx={{ backgroundColor: D.WHITE_COLOR, color: D.BLACK_COLOR }}
          >
            <MapIcon />
          </Fab>
        </Tooltip>
      </ArrowPopper>
    </>
  );
}

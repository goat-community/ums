import { useState } from "react";

import { Close } from "@mui/icons-material";
import MapIcon from "@mui/icons-material/Map";
import { Box, Drawer, IconButton, Paper, Typography } from "@mui/material";
import Fab from "@mui/material/Fab";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { setStyle } from "@context/map";

import * as D from "@constants/design";

import { ListTile } from "@components/common/list-tile";

export function BaseMapSelector() {
  const dispatch = useAppDispatch();
  const mapStyleUrl = useAppSelector((state) => state.map.style);
  const [drawerOpen, toggleDrawer] = useState<boolean>(false);

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
      title: "High Fidelity",
      subtitle: "Great for public presentations",
      thumbnail: "https://i.imgur.com/aVDMUKAm.png",
    },
    {
      value: "mapbox_satellite",
      title: "Satellite Streets",
      subtitle: "As seen from space",
      thumbnail: "https://i.imgur.com/JoMGuUOm.png",
    },
    {
      value: "mapbox_light",
      title: "Light",
      subtitle: "For highlighting the data overlays",
      thumbnail: "https://i.imgur.com/jHFGEEQm.png",
    },
    {
      value: "mapbox_dark",
      title: "Dark",
      subtitle: "For highlighting the data overlays",
      thumbnail: "https://i.imgur.com/PaYV5Gjm.png",
    },
    {
      value: "mapbox_navigation",
      title: "Traffic",
      subtitle: "Live traffic data",
      thumbnail: "https://i.imgur.com/lfcARxZm.png",
    },
  ];

  const [selected, setSelected] = useState(() => {
    const selectedMapStyle = Object.keys(styles).find(
      (key) => styles[key] === mapStyleUrl
    );
    return [items.findIndex((item) => item.value === selectedMapStyle)];
  });

  return (
    <>
      <Drawer anchor={"bottom"} open={drawerOpen} onClose={() => toggleDrawer(false)}>
        <Paper>
          <Box position="absolute" top={5} right={5}>
            <IconButton onClick={() => toggleDrawer(false)}>
              <Close />
            </IconButton>
          </Box>

          <Typography sx={{ m: 2 }} variant="h4">
            Map Style
          </Typography>
          <ListTile
            items={items}
            selected={selected}
            thumbnailBorder="rounded"
            onChange={(value) => {
              setSelected(value);
              const selectedMapStyle = items[value[0]].value;
              dispatch(setStyle(styles[selectedMapStyle]));
            }}
          />
        </Paper>
      </Drawer>
      <Fab
        onClick={() => toggleDrawer(!drawerOpen)}
        size="small"
        sx={{ backgroundColor: D.WHITE_COLOR, color: D.BLACK_COLOR }}
      >
        <MapIcon />
      </Fab>
    </>
  );
}
import { useState } from "react";

import { Close } from "@mui/icons-material";
import MapIcon from "@mui/icons-material/Map";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import Fab from "@mui/material/Fab";

import { useAppDispatch } from "@hooks/context";

import { setStyle } from "@context/map";

import * as D from "@constants/design";

import ArrowPopper from "@pages/common/map/arrow-popper";

import ListTile from "./list-tile";

export function BaseMapSelector() {
  const dispatch = useAppDispatch();
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
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([3]);

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
        }
        open={open}
        placement="top"
        arrow={false}
        onClose={() => setOpen(false)}
      >
        <Fab
          onClick={() => setOpen(!open)}
          size="small"
          sx={{ backgroundColor: D.WHITE_COLOR, color: D.BLACK_COLOR }}
        >
          <MapIcon />
        </Fab>
      </ArrowPopper>
    </>
  );
}

import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Close, List } from "@mui/icons-material";
import { Box, Drawer, IconButton, Paper, Typography } from "@mui/material";
import Fab from "@mui/material/Fab";

import { useAppSelector } from "@hooks/context";

import { map_layers_visible } from "@context/map";

import * as D from "@constants/design";

import { SkeletonImage } from "@components/common";

export function Legend() {
  const { t } = useTranslation();
  const activeLayers = useAppSelector(map_layers_visible);
  const scoreLayerVisible = useAppSelector((state) => state.flower.score_layer_visible);
  const [drawerOpen, toggleDrawer] = useState(false);

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
            Legend
          </Typography>
          {scoreLayerVisible && (
            <Box sx={{ m: 2 }}>
              <Typography variant="h5">{t("layers.building_score_layer")}</Typography>
              <SkeletonImage
                src="https://i.imgur.com/nx2Ff6U.png"
                style={{ maxWidth: "210px" }}
                border="rectangular"
              ></SkeletonImage>
            </Box>
          )}
          {Object.keys(activeLayers).map((layer) => (
            <Box key={layer} sx={{ m: 2 }}>
              <Typography variant="h5">{t(`layers.${layer}`)}</Typography>
              {activeLayers[layer].legend && (
                <SkeletonImage
                  src={activeLayers[layer].legend}
                  alt={activeLayers[layer].title}
                  style={{ maxWidth: "210px" }}
                  border="rectangular"
                ></SkeletonImage>
              )}
            </Box>
          ))}
          {Object.keys(activeLayers).length === 0 && !scoreLayerVisible && (
            <Box sx={{ m: 2 }}>
              <Typography variant="body1">No layers selected</Typography>
            </Box>
          )}
        </Paper>
      </Drawer>
      <Fab
        onClick={() => toggleDrawer(true)}
        size="small"
        sx={{ backgroundColor: D.WHITE_COLOR, color: D.BLACK_COLOR }}
      >
        <List />
      </Fab>
    </>
  );
}

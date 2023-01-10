import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Close, List } from "@mui/icons-material";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import Fab from "@mui/material/Fab";

import { useAppSelector } from "@hooks/context";

import { map_layers_visible } from "@context/map";

import * as D from "@constants/design";

import ArrowPopper from "@pages/common/map/arrow-popper";

import SkeletonImage from "./skeleton-image";

export function Legend() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const activeLayers = useAppSelector(map_layers_visible);
  return (
    <>
      <ArrowPopper
        content={
          <Paper sx={{ maxWidth: 400, minWidth: 250, overflow: "auto" }}>
            <Box position="absolute" top={5} right={5}>
              <IconButton onClick={() => setOpen(false)}>
                <Close />
              </IconButton>
            </Box>
            <Typography sx={{ m: 2 }} variant="h4">
              Legend
            </Typography>

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
            {Object.keys(activeLayers).length === 0 && (
              <Box sx={{ m: 2 }}>
                <Typography variant="body1">No layers selected</Typography>
              </Box>
            )}
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
          <List />
        </Fab>
      </ArrowPopper>
    </>
  );
}

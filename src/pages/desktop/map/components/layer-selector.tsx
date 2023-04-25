import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Close } from "@mui/icons-material";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import { Box, Fab, IconButton, Paper, Tooltip, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { getIndicator, toggleLayer, toggleOffAllLayers } from "@context/map";
import {
  map_indicators_selector,
  map_layers_list_selector,
  map_layers_selector,
} from "@context/map/maps-selector";

import * as D from "@constants/design";

import { ArrowPopper } from "@components/common/arrow-popper";
import { ListTile } from "@components/common/list-tile";

export function LayerSelector() {
  const dispatch = useAppDispatch();
  const layers = useAppSelector(map_layers_selector);
  const layersList = useAppSelector(map_layers_list_selector);
  const { t } = useTranslation();
  const items = layersList.map((layer) => {
    return {
      value: layer.value,
      title: t(`layers.${layer.label}`),
      subtitle: "",
    };
  });
  // Add a "None" option to the list of layers
  items.push({
    value: "none",
    title: t("layers.none"),
    subtitle: "",
  });
  const indicatorsList = useAppSelector(map_indicators_selector);
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState(() => {
    const index = layersList.findIndex((i) => i.visibility != "none");
    return [index === -1 ? items.length - 1 : index];
  });

  const handleChange = (value) => {
    setSelected(value);
    dispatch(toggleOffAllLayers());
    if (value[0] === selected[0] || value[0] === items.length - 1) {
      setSelected(value);
      return;
    }
    if (value[0] !== null) {
      const checked = layersList[value[0]].value;
      dispatch(toggleLayer(checked));
      if (indicatorsList[checked] && layers[checked].source.data.features.length === 0) {
        dispatch(getIndicator(indicatorsList[checked], checked));
      }
    }
  };

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
              Layers
            </Typography>
            <ListTile items={items} selected={selected} onChange={handleChange} />
          </Paper>
        }
        open={open}
        placement="top"
        arrow={true}
        onClose={() => setOpen(false)}
      >
        <Tooltip title={t("tooltips.openLayers")} arrow placement="left">
          <Fab
            onClick={() => setOpen(!open)}
            size="large"
            sx={{ backgroundColor: D.WHITE_COLOR, color: D.BLACK_COLOR }}
          >
            <LayersOutlinedIcon />
          </Fab>
        </Tooltip>
      </ArrowPopper>
    </>
  );
}

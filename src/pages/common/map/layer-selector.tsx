import { useState } from "react";

import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Radio,
  RadioGroup,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { getIndicator, toggleLayer, toggleOffAllLayers } from "@context/map";
import {
  map_indicators_selector,
  map_layers_list_selector,
  map_layers_selector,
} from "@context/map/maps-selector";

import * as D from "@constants/design";

function LayersList(props: {
  layers_list: ReturnType<typeof map_layers_list_selector>;
  current_layer: string;
  radio_clicked: (layer_name: string) => void;
  on_change: (e: string) => void;
}) {
  return (
    <RadioGroup
      value={props.current_layer}
      onChange={(e) => props.on_change(e.target.value)}
    >
      {props.layers_list.map((i) => {
        const labelId = `label-${i.value}`;
        return (
          <ListItem
            key={i.value}
            disablePadding
            secondaryAction={
              <Radio
                edge="end"
                inputProps={{ "aria-labelledby": labelId }}
                value={i.value}
                onClick={() => props.radio_clicked(i.value)}
              />
            }
            sx={{ marginTop: 1 }}
          >
            <ListItemButton>
              <ListItemText id={labelId} primary={i.label} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </RadioGroup>
  );
}

export function LayerSelector() {
  const dispatch = useAppDispatch();
  const layers = useAppSelector(map_layers_selector);
  const layersList = useAppSelector(map_layers_list_selector);
  const indicatorsList = useAppSelector(map_indicators_selector);
  const [open, setOpen] = useState<boolean>(false);
  const [checked, setChecked] = useState<string>(
    () => layersList.find((i) => i.visibility != "none")?.value || ""
  );

  const handleChange = () => {
    dispatch(toggleOffAllLayers());
    if (checked) {
      dispatch(toggleLayer(checked));
      if (indicatorsList[checked] && layers[checked].source.data.features.length === 0) {
        dispatch(getIndicator(indicatorsList[checked], checked));
      }
    }
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Fab
        size="small"
        sx={{ backgroundColor: D.WHITE_COLOR, color: D.BLACK_COLOR }}
        onClick={handleClickOpen}
      >
        <LayersOutlinedIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose} maxWidth="xl" sx={{ marginTop: 2 }}>
        <Box p={1}>
          <DialogTitle variant="h4">Layers</DialogTitle>
          <DialogContent sx={{ padding: 0, maxHeight: 200 }}>
            <List dense sx={{ width: "100%" }}>
              <LayersList
                layers_list={layersList}
                current_layer={checked}
                on_change={(new_layer: string) => setChecked(new_layer)}
                radio_clicked={(layer_name: string) => {
                  if (checked.includes(layer_name)) {
                    setChecked("");
                  }
                }}
              />
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleChange}>Apply</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}

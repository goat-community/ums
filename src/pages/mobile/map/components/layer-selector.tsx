import React, { useState } from "react";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { toggleLayer, toggleOffAllLayers } from "@context/map";
import { map_layers_list_selector } from "@context/map/map-selector";

import { Selector } from "@components/mobile";

export function LayerSelector() {
  const [location] = useState<string | number>("");
  const dispatch = useAppDispatch();
  const layersList = useAppSelector(map_layers_list_selector);
  const handleChange = (layer: string | number) => {
    dispatch(toggleOffAllLayers());
    if (layer) {
      dispatch(toggleLayer(layer));
    }
  };
  return (
    <Selector
      label="Layers"
      items={layersList}
      value={location}
      handleChange={(e) => handleChange(e.target.value)}
    />
  );
}

import React, { useState } from "react";

import { useAppDispatch } from "@hooks/context";

import { toggleLayer, toggleOffAllLayers } from "@context/map";

import { Selector } from "@components/mobile";

export function LayerSelector() {
  const [location] = useState<string | number>("");
  const dispatch = useAppDispatch();
  const handleChange = (layer: string | number) => {
    layer === "none" ? dispatch(toggleOffAllLayers()) : dispatch(toggleLayer(layer));
  };
  return (
    <Selector
      label="Layers"
      items={[
        { label: "none", value: "none" },
        { label: "Population density", value: "population_density" },
        { label: "Noise levels", value: "noise_levels" },
        { label: "Connectivity", value: "connectivity" },
      ]}
      value={location}
      handleChange={(e) => handleChange(e.target.value)}
    />
  );
}

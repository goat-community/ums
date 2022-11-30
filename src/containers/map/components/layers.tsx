import React from "react";
import { Layer, Source } from "react-map-gl";

import { useAppSelector } from "@hooks/context";

import { map_layers_selector } from "@context/map/map-selector";

export default function Layers() {
  const mapLayers = useAppSelector(map_layers_selector);
  return Object.keys(mapLayers).map((layerKey) => {
    const layer = mapLayers[layerKey];
    return (
      <Source key={layerKey + "-source"} {...layer.source}>
        <Layer key={layerKey + "-layer"} {...layer.layer} />
      </Source>
    );
  });
}

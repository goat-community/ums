import { Layer, Source } from "react-map-gl";

import { useAppSelector } from "@hooks/context";

import { map_layers_selector } from "@context/map/maps-selector";

export default function Layers() {
  const mapLayers = useAppSelector(map_layers_selector);
  const layers = Object.keys(mapLayers).map((layerKey) => {
    const layer = mapLayers[layerKey];
    if (layer.visibility === "none") return null;
    const layers = [];
    layer.layers.forEach((layer) => {
      layers.push(<Layer key={layerKey + "-" + layer.id} {...layer} />);
    });
    return (
      <Source key={layerKey + "-source"} {...layer.source}>
        {layers}
      </Source>
    );
  });
  return <>{layers}</>;
}

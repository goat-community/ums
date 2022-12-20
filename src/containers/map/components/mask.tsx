// create mapbox mask layer

import { useEffect } from "react";
import { FillLayer, Layer, Source } from "react-map-gl";
import { useSelector } from "react-redux";

import { useAppDispatch } from "@hooks/context";

import { getStudyArea } from "@context/map";
import { study_area_selector } from "@context/map/maps-selector";

const maskFillStyle: FillLayer = {
  id: "isochrone-fill",
  type: "fill",
  paint: {
    "fill-color": "#606062",
    "fill-opacity": 0.8,
  },
};

export default function MaskLayer() {
  const studyAreaData = useSelector(study_area_selector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getStudyArea());
  }, [dispatch]);
  return (
    <Source type="geojson" data={studyAreaData || null}>
      <Layer {...maskFillStyle} />
    </Source>
  );
}

import React, { useEffect, useMemo } from "react";
import { Layer, LayerProps, Source, useMap } from "react-map-gl";
import { point } from "@turf/turf";

import { object_is_empty } from "@utils";

import { useAppSelector } from "@hooks/context";

import { AMENITIES_GROUP, AMENITIES_LIST } from "@constants/flower";

export const clusterLayer = (id: string): LayerProps => {
  return {
    id: "clusters " + id,
    type: "circle",
    source: "clusters " + id,
    filter: ["has", "point_count"],
    paint: {
      "circle-color": [
        "step",
        ["get", "point_count"],
        "#51bbd6",
        100,
        "#f1f075",
        750,
        "#f28cb1",
      ],
      "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
    },
  };
};

export const clusterCountLayer = (id: string): LayerProps => {
  return {
    id: "cluster-count " + id,
    type: "symbol",
    source: "cluster-count " + id,
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
    },
  };
};

export const unclusteredPointLayer = (
  id: string,
  poi_feature_group: string
): LayerProps => {
  return {
    id: id,
    type: "symbol",
    source: id,
    filter: ["!", ["has", "point_count"]],
    layout: {
      "icon-image": poi_feature_group,
      "icon-size": 0.02,
    },
  };
};

export default function Pois() {
  const mapRef = useMap();
  const pois = useAppSelector((state) => state.poi.poi_features);
  const active_pois = useAppSelector((state) => state.poi.active_pois);

  useEffect(() => {
    AMENITIES_LIST.forEach(async (name_of_amenity) => {
      // await import(
      //   /* @vite-ignore */ "../../../images/amenities/" + name_of_amenity + ".svg"
      // ).then((svg_icon) => {
      // if (mapRef.current.hasImage(name_of_amenity)) {
      //   return false;
      // }
      mapRef.current.loadImage(
        `https://raw.githubusercontent.com/cinaaaa/reado/main/${name_of_amenity}.svg.png`,
        (error, image) => {
          if (error) console.log(error);

          mapRef.current.addImage(name_of_amenity, image);
        }
      );
      // });
    });
  }, []);

  const memomiezed_pois = useMemo(() => {
    if (active_pois.length && !object_is_empty(pois)) {
      let poi_sub_groups = [];

      active_pois.forEach((poi_group) => {
        poi_sub_groups = [...poi_sub_groups, ...AMENITIES_GROUP[poi_group]];
      });

      return poi_sub_groups.map((poi_sub_group) => {
        return {
          group: poi_sub_group,
          data: {
            type: "FeatureCollection",
            features: pois[poi_sub_group].map((poi_features) =>
              point(poi_features.coordinates, poi_features)
            ),
          },
        };
      });
    }
  }, [pois, active_pois]);

  return (
    <>
      {memomiezed_pois?.map((poi_feature_group, index) => {
        return (
          <Source
            key={`poi-layer-${index}`}
            id={`poi-layer-${index}`}
            type="geojson"
            // cluster={true}
            // clusterMaxZoom={14}
            // clusterMinPoints={4}
            // clusterRadius={50}
            data={poi_feature_group.data as GeoJSON.FeatureCollection}
          >
            {/* <Layer {...clusterLayer(`poi-layer-${index}`)} />
            <Layer {...clusterCountLayer(`poi-layer-${index}`)} /> */}
            <Layer
              {...unclusteredPointLayer(`poi-layer-${index}`, poi_feature_group.group)}
            />
          </Source>
        );
      })}
    </>
  );
}

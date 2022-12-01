import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { LatandLang, MapView } from "@types";

/** Reducer */
const initialState = {
  picking_mode: false as boolean,
  picked_point: null as LatandLang | null,
  view: {
    bounds: [
      11.327192290815145, 48.03915718648435, 11.756388821971976, 48.27059464660387,
    ],
    bearing: 0,
    pitch: 0,
  } as MapView,
  viewBounds: null, // defined by study area when fetched
  layers: {
    noise_levels: {
      title: "Noise Levels",
      visibility: "none",
      source: {
        type: "raster",
        tiles: [
          "https://www.lfu.bayern.de/gdi/wms/laerm/ballungsraeume?LAYERS=aggroadlden&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&CRS=EPSG%3A3857&STYLES=&WIDTH=2264&HEIGHT=792&BBOX={bbox-epsg-3857}",
        ],
        tileSize: 256,
      },
      layers: [
        {
          type: "raster",
          paint: {
            "raster-opacity": 0.8,
          },
        },
      ],
    },
    population_density: {
      title: "Population Density",
      visibility: "none",
      source: {
        type: "geojson",
        data: "./api/indicators/population?modus=default&return_type=geojson",
      },
      layers: [
        {
          filter: [
            "all",
            ["!=", "modus", "comparison"],
            ["==", "percentile_population", 0],
          ],
          id: "NoPopulation",
          type: "fill",
          paint: {
            "fill-opacity": 0.4,
            "fill-color": "#ffffff",
            "fill-outline-color": "#ffffff",
          },
        },
        {
          filter: [
            "all",
            ["!=", "modus", "comparison"],
            ["==", "percentile_population", 1],
          ],
          id: "1to80Inhabitants",
          type: "fill",
          paint: {
            "fill-opacity": 0.4,
            "fill-color": "#fdccb8",
            "fill-outline-color": "#ffffff",
          },
        },
        {
          filter: [
            "all",
            ["!=", "modus", "comparison"],
            ["==", "percentile_population", 2],
          ],
          id: "80to200Inhabitants",
          type: "fill",
          paint: {
            "fill-opacity": 0.4,
            "fill-color": "#fc8f6f",
            "fill-outline-color": "#ffffff",
          },
        },
        {
          filter: [
            "all",
            ["!=", "modus", "comparison"],
            ["==", "percentile_population", 3],
          ],
          id: "200to500Inhabitants",
          type: "fill",
          paint: {
            "fill-opacity": 0.4,
            "fill-color": "#f44d37",
            "fill-outline-color": "#ffffff",
          },
        },
        {
          filter: [
            "all",
            ["!=", "modus", "comparison"],
            ["==", "percentile_population", 4],
          ],
          id: "500to1000Inhabitants",
          type: "fill",
          paint: {
            "fill-opacity": 0.4,
            "fill-color": "#c5161b",
            "fill-outline-color": "#ffffff",
          },
        },
        {
          filter: [
            "all",
            ["!=", "modus", "comparison"],
            ["==", "percentile_population", 5],
          ],
          id: "More1000Inhabitants",
          type: "fill",
          paint: {
            "fill-opacity": 0.4,
            "fill-color": "#67000d",
            "fill-outline-color": "#ffffff",
          },
        },
      ],
    },
  },
  studyArea: null as GeoJSON.FeatureCollection | null,
};

export const map = createSlice({
  name: "map",
  initialState,
  reducers: {
    setPickingMode: (state: typeof initialState, action: PayloadAction<boolean>) => {
      state.picking_mode = action.payload;
    },
    setPickedPoint: (
      state: typeof initialState,
      action: PayloadAction<LatandLang | null>
    ) => {
      state.picked_point = action.payload;
    },
    setMapView: (
      state: typeof initialState,
      action: PayloadAction<typeof initialState.view>
    ) => {
      state.view = action.payload;
    },
    setStudyArea: (
      state: typeof initialState,
      action: PayloadAction<GeoJSON.FeatureCollection | null>
    ) => {
      state.studyArea = action.payload;
      state.viewBounds = action.payload.features[0].properties.bounds;
    },
    toggleOffAllLayers: (state: typeof initialState) => {
      Object.keys(state.layers).forEach((key) => {
        state.layers[key].visibility = "none";
      });
    },
    toggleLayer: (state: typeof initialState, action: PayloadAction<string | number>) => {
      const layer = state.layers[action.payload];
      const visibility = layer.visibility;
      layer.visibility = visibility === "visible" ? "none" : "visible";
    },
  },
});

export const {
  setPickingMode,
  setPickedPoint,
  setMapView,
  setStudyArea,
  toggleLayer,
  toggleOffAllLayers,
} = map.actions;
export default map.reducer;

import { LngLat } from "react-map-gl";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { MapView } from "@types";

/** Reducer */
const initialState = {
  picking_mode: false as boolean,
  picked_point: null as LngLat | null,
  current_point_address: "" as string,
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
        data: "https://goat-dev.plan4better.de/api/v1/indicators/population?modus=default&return_type=geojson",
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
    landuse_atkis: {
      title: "Landuse Atkis",
      visibility: "none",
      source: {
        type: "vector",
        tiles: [
          "https://goat-dev.plan4better.de/api/v1/layers/tiles/landuse_atkis/{z}/{x}/{y}.pbf",
        ],
      },
      layers: [
        {
          filter: ["==", "landuse", "AX_SportFreizeitUndErholungsflaeche"],
          id: "AX_SportFreizeitUndErholungsflaeche",
          "source-layer": "default",
          type: "fill",
          paint: {
            "fill-color": "#32932b",
            "fill-outline-color": "#232323",
          },
        },
        {
          filter: ["==", "landuse", "AX_Friedhof"],
          id: "AX_Friedhof",
          "source-layer": "default",
          type: "fill",
          paint: {
            "fill-color": "#e2ce30",
            "fill-outline-color": "#232323",
          },
        },
        {
          filter: ["==", "landuse", "AX_Wohnbauflaeche"],
          id: "AX_Wohnbauflaeche",
          "source-layer": "default",
          type: "fill",
          paint: {
            "fill-color": "#e9a029",
            "fill-outline-color": "#232323",
          },
        },
        {
          filter: ["==", "landuse", "AX_FlaecheGemischterNutzung"],
          id: "AX_FlaecheGemischterNutzung",
          "source-layer": "default",
          type: "fill",
          paint: {
            "fill-color": "#b4381f",
            "fill-outline-color": "#232323",
          },
        },
        {
          filter: ["==", "landuse", "AX_FlaecheBesondererFunktionalerPraegung"],
          id: "AX_FlaecheBesondererFunktionalerPraegung",
          "source-layer": "default",
          type: "fill",
          paint: {
            "fill-color": "#4881c2",
            "fill-outline-color": "#232323",
          },
        },
        {
          filter: [
            "any",
            [
              "||",
              ["==", "landuse", "AX_IndustrieUndGewerbeflaeche"],
              ["==", "landuse", "AX_Halde"],
            ],
            ["==", "landuse", "AX_TagebauGrubeSteinbruch"],
          ],
          id: "AX_IndustrieUndGewerbeflaeche",
          "source-layer": "default",
          type: "fill",
          paint: {
            "fill-color": "#b6b6b6",
            "fill-outline-color": "#232323",
          },
        },
        {
          filter: [
            "any",
            [
              "||",
              ["||", ["==", "landuse", "AX_Bahnverkehr"], ["==", "landuse", "AX_Platz"]],
              ["==", "landuse", "AX_Strassenverkehr"],
            ],
            ["==", "landuse", "AX_Flugverkehr"],
          ],
          id: "AX_Verkehrsflaechen",
          "source-layer": "default",
          type: "fill",
          paint: {
            "fill-color": "#707070",
            "fill-outline-color": "#232323",
          },
        },
        {
          filter: ["==", "landuse", "AX_Wald"],
          id: "AX_Wald",
          "source-layer": "default",
          type: "fill",
          paint: {
            "fill-color": "#146614",
            "fill-outline-color": "#232323",
          },
        },
        {
          filter: [
            "any",
            [
              "||",
              [
                "||",
                ["||", ["==", "landuse", "AX_Gehoelz"], ["==", "landuse", "AX_Heide"]],
                ["==", "landuse", "AX_Moor"],
              ],
              ["==", "landuse", "AX_Sumpf"],
            ],
            ["==", "landuse", "AX_UnlandVegetationsloseFlaeche"],
          ],
          id: "AX_Natur",
          "source-layer": "default",
          type: "fill",
          paint: {
            "fill-color": "#8dc05c",
            "fill-outline-color": "#232323",
          },
        },
        {
          filter: ["==", "landuse", "AX_Landwirtschaft"],
          id: "AX_Landwirtschaft",
          "source-layer": "default",
          type: "fill",
          paint: {
            "fill-color": "#c1ce44",
            "fill-outline-color": "#232323",
          },
        },
        {
          filter: [
            "any",
            [
              "||",
              ["==", "landuse", "AX_Fließgewaesser"],
              ["==", "landuse", "AX_Hafenbecken"],
            ],
            ["==", "landuse", "AX_StehendesGewaesser"],
          ],
          id: "AX_Gewaesser",
          "source-layer": "default",
          type: "fill",
          paint: {
            "fill-color": "#4fa7e1",
            "fill-outline-color": "#232323",
          },
        },
      ],
    },
    // pt_oev_gueteklassen: {},
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
      action: PayloadAction<LngLat | null>
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
      console.log(layer);
      const visibility = layer.visibility;
      layer.visibility = visibility === "visible" ? "none" : "visible";
    },
    setAddress: (state: typeof initialState, action: PayloadAction<string>) => {
      state.current_point_address = action.payload;
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
  setAddress,
} = map.actions;
export default map.reducer;

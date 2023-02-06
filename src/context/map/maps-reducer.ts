import { LngLat } from "react-map-gl";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IndicatorConfig, MapView, popupInfo, ReverseAddress } from "@types";

/** Reducer */
const initialState = {
  style: "mapbox://styles/mapbox/dark-v11",
  popupInfo: null as popupInfo,
  picking_mode: false as boolean,
  picked_point: null as LngLat | null,
  current_point_address: {} as ReverseAddress,
  view: {
    bounds: [
      11.327192290815145, 48.03915718648435, 11.756388821971976, 48.27059464660387,
    ],
    bearing: 0,
    pitch: 0,
  } as MapView,
  viewBounds: null, // defined by study area when fetched
  layers: {
    noise_levels_day: {
      title: "noise_levels_day",
      legend:
        "https://www.lfu.bayern.de/gdi/wms/laerm/ballungsraeume?request=GetLegendGraphic&version=1.3.0&format=image/png&layer=aggroadlden&SERVICE=WMS&SLD_VERSION=1.1.0&STYLE=&TRANSPARENT=true",
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
    noise_levels_night: {
      title: "noise_levels_night",
      legend:
        "https://www.lfu.bayern.de/gdi/wms/laerm/ballungsraeume?request=GetLegendGraphic&version=1.3.0&format=image/png&layer=aggroadln&SERVICE=WMS&SLD_VERSION=1.1.0&STYLE=&TRANSPARENT=true",
      visibility: "none",
      source: {
        type: "raster",
        tiles: [
          "https://www.lfu.bayern.de/gdi/wms/laerm/ballungsraeume?LAYERS=aggroadln&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&CRS=EPSG%3A3857&STYLES=&WIDTH=2264&HEIGHT=792&BBOX={bbox-epsg-3857}",
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
      title: "population_density",
      legend: "https://i.imgur.com/XlOc1Yd.png",
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
      title: "landuse_atkis",
      legend: "https://i.imgur.com/Kf19YfY.png",
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
            "fill-opacity": 0.4,
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
            "fill-opacity": 0.4,
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
            "fill-opacity": 0.4,
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
            "fill-opacity": 0.4,
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
            "fill-opacity": 0.4,
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
            "fill-opacity": 0.4,
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
            "fill-opacity": 0.4,
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
            "fill-opacity": 0.4,
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
            "fill-opacity": 0.4,
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
            "fill-opacity": 0.4,
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
            "fill-opacity": 0.4,
            "fill-color": "#4fa7e1",
            "fill-outline-color": "#232323",
          },
        },
      ],
    },
    pt_oev_gueteklassen: {
      title: "pt_oev_gueteklassen",
      legend: "https://i.imgur.com/W07YBc0.png",
      visibility: "none",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      },
      layers: [
        {
          filter: ["all", ["==", "class", "A"]],
          id: "A",
          type: "fill",
          paint: {
            "fill-opacity": 0.4,
            "fill-color": "#1a9641",
            "fill-outline-color": "rgba(0, 0, 255, 0.0)",
          },
        },
        {
          filter: ["all", ["==", "class", "B"]],
          id: "B",
          type: "fill",
          paint: {
            "fill-opacity": 0.4,
            "fill-color": "#8acc62",
            "fill-outline-color": "rgba(0, 0, 255, 0.0)",
          },
        },
        {
          filter: ["all", ["==", "class", "C"]],
          id: "C",
          type: "fill",
          paint: {
            "fill-opacity": 0.4,
            "fill-color": "#dcf09e",
            "fill-outline-color": "rgba(0, 0, 255, 0.0)",
          },
        },
        {
          filter: ["all", ["==", "class", "D"]],
          id: "D",
          type: "fill",
          paint: {
            "fill-opacity": 0.4,
            "fill-color": "#ffdf9a",
            "fill-outline-color": "rgba(0, 0, 255, 0.0)",
          },
        },
        {
          filter: ["all", ["==", "class", "E"]],
          id: "E",
          type: "fill",
          paint: {
            "fill-opacity": 0.4,
            "fill-color": "#f69053",
            "fill-outline-color": "rgba(0, 0, 255, 0.0)",
          },
        },
        {
          filter: ["all", ["==", "class", "F"]],
          id: "F",
          type: "fill",
          paint: {
            "fill-opacity": 0.4,
            "fill-color": "#d7191c",
            "fill-outline-color": "rgba(0, 0, 255, 0.0)",
          },
        },
      ],
    },
  },
  studyArea: [],
  indicators: {
    pt_oev_gueteklassen: {
      payload: {
        start_time: 25200,
        end_time: 32400,
        weekday: 1,
        return_type: "geobuf",
        station_config: {
          groups: {
            "0": "B",
            "1": "A",
            "2": "A",
            "3": "C",
            "4": "B",
            "5": "B",
            "6": "B",
            "7": "B",
            "11": "B",
            "12": "B",
          },
          time_frequency: [0, 4, 10, 19, 39, 60, 119],
          categories: [
            { A: 1, B: 1, C: 2 },
            { A: 1, B: 2, C: 3 },
            { A: 2, B: 3, C: 4 },
            { A: 3, B: 4, C: 5 },
            { A: 4, B: 5, C: 6 },
            { A: 5, B: 6, C: 6 },
          ],
          classification: {
            "1": { "300": "A", "500": "A", "750": "B", "1000": "C" },
            "2": { "300": "A", "500": "B", "750": "C", "1000": "D" },
            "3": { "300": "B", "500": "C", "750": "D", "1000": "E" },
            "4": { "300": "C", "500": "D", "750": "E", "1000": "F" },
            "5": { "300": "D", "500": "E", "750": "F" },
            "6": { "300": "E", "500": "F" },
            "7": { "300": "F" },
          },
        },
      },
      requestMethod: "POST",
      url: "pt-oev-gueteklassen",
    } as IndicatorConfig,
  },
};

export const map = createSlice({
  name: "map",
  initialState,
  reducers: {
    setStyle: (state: typeof initialState, action: PayloadAction<string>) => {
      state.style = action.payload;
    },
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
      state.studyArea = action.payload.features;
      state.viewBounds = action.payload.features[0].properties.bounds;
    },
    setIndicator: (
      state: typeof initialState,
      action: PayloadAction<{ features: unknown; layer: string } | null>
    ) => {
      state.layers[action.payload.layer].source.data.features = action.payload.features;
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
    setAddress: (state: typeof initialState, action: PayloadAction<ReverseAddress>) => {
      state.current_point_address = action.payload;
    },
    setPopupInfo: (state: typeof initialState, action: PayloadAction<popupInfo>) => {
      state.popupInfo = action.payload;
    },
  },
});

export const {
  setStyle,
  setPickingMode,
  setPickedPoint,
  setMapView,
  setStudyArea,
  setIndicator,
  toggleLayer,
  toggleOffAllLayers,
  setAddress,
  setPopupInfo,
} = map.actions;
export default map.reducer;

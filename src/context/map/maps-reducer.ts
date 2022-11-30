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
    test: {
      source: {
        type: "raster",
        tiles: [
          "https://www.lfu.bayern.de/gdi/wms/laerm/ballungsraeume?LAYERS=aggroadlden&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&CRS=EPSG%3A3857&STYLES=&WIDTH=2264&HEIGHT=792&BBOX={bbox-epsg-3857}",
        ],
        tileSize: 256,
      },
      layer: {
        type: "raster",
        paint: {
          "raster-opacity": 0.8,
        },
      },
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
  },
});

export const { setPickingMode, setPickedPoint, setMapView, setStudyArea } = map.actions;
export default map.reducer;

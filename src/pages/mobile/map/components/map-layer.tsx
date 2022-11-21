// Fake map layer to shown in background of the app
import React from "react";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { pick_point } from "@context/map";

import FakeMapImage from "@images/fakemap.png";
import FakePickedMapImage from "@images/fakepickedmap.jpg";

export function MapLayer() {
  const dispatch = useAppDispatch();
  const map_selector = useAppSelector((state) => state.map);

  // Picked stat
  if (map_selector.picked_point) {
    return (
      <img
        src={FakePickedMapImage}
        alt="fake map"
        width="100%"
        height="100%"
        style={{ zIndex: -1, position: "absolute", top: 0, bottom: 0, right: 0, left: 0 }}
      />
    );
  }

  // Picking state
  if (map_selector.picking_mode === true) {
    return (
      <img
        src={FakeMapImage}
        alt="fake map"
        width="100%"
        height="100%"
        onClick={() => dispatch(pick_point({ lat: 1, lng: 1 }))}
        style={{ zIndex: -1, position: "absolute", top: 0, bottom: 0, right: 0, left: 0 }}
      />
    );
  }

  // NOT PICKED ANY POINTS
  return (
    <img
      src={FakeMapImage}
      alt="fake map"
      width="100%"
      height="100%"
      style={{ zIndex: -1, position: "absolute", top: 0, bottom: 0, right: 0, left: 0 }}
    />
  );
}

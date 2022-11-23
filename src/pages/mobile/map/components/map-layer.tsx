// Fake map layer to shown in background of the app
import React from "react";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { pick_point } from "@context/map";

import FakeMapImage from "@images/fakemap.png";
import FakePickedMapImage from "@images/fakepickedmap.jpg";

import { FlowerModifier } from "./flower-modifier";

export function MapLayer() {
  const dispatch = useAppDispatch();
  const map_selector = useAppSelector((state) => state.map);

  // Picked stat
  if (map_selector.picked_point) {
    return (
      <>
        <div
          style={{
            backgroundImage: `url(${FakePickedMapImage})`,
            zIndex: -1,
            position: "fixed",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
          }}
        ></div>
        <FlowerModifier />
      </>
    );
  }

  // Picking state
  if (map_selector.picking_mode === true) {
    return (
      <div
        onClick={() => dispatch(pick_point({ lat: 1, lng: 1 }))}
        style={{
          backgroundImage: `url(${FakeMapImage})`,
          zIndex: -1,
          position: "fixed",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
        }}
      ></div>
    );
  }

  // NOT PICKED ANY POINTS
  return (
    <div
      style={{
        backgroundImage: `url(${FakeMapImage})`,
        zIndex: -1,
        position: "fixed",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
    ></div>
  );
}

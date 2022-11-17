// Fake map layer to shown in background of the app
import React from "react";

import FakeMapImage from "@images/fakemap.png";

export function MapLayer() {
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

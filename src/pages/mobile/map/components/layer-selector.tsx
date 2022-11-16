import React, { useState } from "react";

import { Selector } from "@components/mobile";

export function LayerSelector() {
  const [location, setLocation] = useState<string | number>();

  return (
    <Selector
      label="Layers"
      items={[
        { label: "Population density", value: "Population density" },
        { label: "Noise levels", value: "Noise levels" },
        { label: "Connectivity", value: "Connectivity" },
        { label: "Nature", value: "Nature" },
      ]}
      value={location}
      handleChange={(e) => setLocation(e.target.value)}
    />
  );
}

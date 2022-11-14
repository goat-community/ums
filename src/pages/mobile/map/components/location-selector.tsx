import React, { useState } from "react";
import { Selector } from "@components/mobile";

export function LocationSelector() {
  const [location, setLocation] = useState<string | number>("");

  return (
    <Selector
      label="Locations"
      items={[
        { label: "Germany", value: "Germany" },
        { label: "Albania", value: "Albania" },
        { label: "Turkey", value: "Turkey" },
        { label: "United states", value: "United states" },
      ]}
      value={location}
      handleChange={(e) => setLocation(e.target.value)}
    />
  );
}

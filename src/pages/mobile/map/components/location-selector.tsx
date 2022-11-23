import React, { useState } from "react";

import { Selector } from "@components/mobile";

export function LocationSelector() {
  const [location, setLocation] = useState<string | number>("");

  return (
    <Selector
      label="Locations"
      items={[
        { label: "Commerce", value: "Commerce" },
        { label: "Food & Drink", value: "Food & Drink" },
        { label: "Education", value: "Education" },
        { label: "Health", value: "Health" },
      ]}
      value={location}
      handleChange={(e) => setLocation(e.target.value)}
    />
  );
}

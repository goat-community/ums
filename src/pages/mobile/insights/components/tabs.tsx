import * as React from "react";

import { Box, Tab, Tabs } from "@mui/material";

export function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", marginTop: "50px" }}>
      <Tabs value={value} onChange={handleChange} variant="fullWidth">
        <Tab label="Nearby" />
        <Tab label="Transportation" />
      </Tabs>
    </Box>
  );
}

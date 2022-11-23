import * as React from "react";
import styled from "styled-components";

import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";

import * as D from "@constants/design";

import pallete from "@images/artist-palette.png";
import tree from "@images/tree.png";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const POI_LIST = [
  { label: "National theatre", score: "5 min", icon: pallete },
  { label: "Hofgarden", score: "15 min", icon: tree },
];

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", marginTop: "50px" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        sx={{ backgroundColor: D.WHITE_COLOR }}
      >
        <Tab label="Nearby" />
        <Tab label="Transportation" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Stack>
          {POI_LIST.map((i) => (
            <ScoreItem key={i.label}>
              <img src={i.icon} width="24" height="24" />
              <div style={{ flex: 1, marginLeft: 15 }}>
                <Typography variant="h5" color="black">
                  {i.label}
                </Typography>
                <Typography variant="h6" color="black">
                  Supporting text
                </Typography>
              </div>
              <Typography variant="h6" color="#49454F">
                {i.score}
              </Typography>
            </ScoreItem>
          ))}
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </Box>
  );
}

const ScoreItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 8px;
`;

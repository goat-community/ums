import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface PaletteProps {
  children: React.ReactNode;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#6750a4",
    },
    secondary: {
      main: "#6750a414",
    },
  },
  typography: {
    h1: {
      color: "#6750a4",
      fontSize: 32,
      fontWeight: 700,
    },
    h2: {
      color: "#6750a4",
    },
    h3: {
      color: "#6750a4",
    },
    h4: {
      color: "#6750a4",
    },
    h5: {
      color: "#6750a4",
    },
    h6: {
      color: "#6750a4",
    },
  },
});

export function Palette(props: PaletteProps) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}

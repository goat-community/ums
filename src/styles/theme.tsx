import React from "react";

import { createTheme, ThemeProvider } from "@mui/material";

import * as D from "@constants/design";

interface PaletteProps {
  children: React.ReactNode;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#283648",
    },
    secondary: {
      main: "#283648",
    },
  },
  typography: {
    h1: {
      color: "#283648",
      fontSize: 32,
      fontWeight: 700,
    },
    h2: {
      color: "#283648",
      fontSize: 26,
    },
    h3: {
      color: "#283648",
      fontSize: 22,
      lineHeight: "28px",
    },
    h4: {
      color: "#283648",
      fontSize: 18,
    },
    h5: {
      color: "#283648",
      fontSize: 16,
    },
    h6: {
      fontSize: 12,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant && {
            borderRadius: 100,
            fontSize: "14px",
            fontWeight: 500,
            textTransform: "none",
            minWidth: 105,
            minHeight: 40,
            boxShadow: "none",
          }),
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color == "default" && {
            backgroundColor: D.WHITE_COLOR,
            borderRadius: "8px",
            boxShadow:
              "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
          }),
          ...(ownerState.color == "primary" && {
            borderRadius: "8px",
            boxShadow:
              "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
          }),
        }),
      },
    },
  },
});

export function Palette(props: PaletteProps) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}

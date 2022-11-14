import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";

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
      fontSize: 26,
    },
    h3: {
      color: "#6750a4",
      fontSize: 22,
      lineHeight: "28px",
    },
    h4: {
      color: "#6750a4",
      fontSize: 18,
    },
    h5: {
      color: "#6750a4",
      fontSize: 14,
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
  },
});

export function Palette(props: PaletteProps) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}

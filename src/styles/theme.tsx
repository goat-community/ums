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
      fontSize: 24,
    },
    h3: {
      color: "#6750a4",
      fontSize: 20,
    },
    h4: {
      color: "#6750a4",
      fontSize: 16,
    },
    h5: {
      color: "#6750a4",
      fontSize: 14,
    },
    h6: {
      color: "#6750a4",
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
            fontWeight: "lighter",
            textTransform: "none",
            minWidth: 105,
            minHeight: 40,
          }),
        }),
      },
    },
  },
});

export function Palette(props: PaletteProps) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}

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
});

export function Palette(props: PaletteProps) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}

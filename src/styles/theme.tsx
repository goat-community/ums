import React from "react";
import { purple } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface PaletteProps {
  children: React.ReactNode;
}

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: "#11cb5f",
    },
  },
});

export function Palette(props: PaletteProps) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}

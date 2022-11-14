import React, { type CSSProperties } from "react";
import * as D from "@constants/design";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";

export function SearchInput() {
  return (
    <Paper component="form" sx={styles.container}>
      <IconButton sx={styles.iconButton} aria-label="search">
        <SearchIcon sx={styles.icon} />
      </IconButton>
      <InputBase
        sx={styles.inputBase}
        placeholder="Location"
        inputProps={{ "aria-label": "Location" }}
      />
    </Paper>
  );
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    height: 56,
    padding: "0 4px",
    display: "flex",
    alignItems: "center",
    borderRadius: "4px 4px 0 0",
    borderBottom: `1px solid ${D.THIRD_DARK_COLOR}`,
    backgroundColor: D.WHITE_COLOR,
    marginTop: "17px",
  },
  inputBase: {
    marginLeft: 1,
    flex: 1,
    color: D.BLACK_COLOR,
  },
  iconButton: {
    padding: "10px",
    color: D.BLACK_COLOR,
  },
  icon: {
    fontSize: 24,
  },
};

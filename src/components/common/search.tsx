import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";

import * as D from "@constants/design";

interface SearchInputProps {
  variant: "filled" | "outlined";
}

export function SearchInput(props: SearchInputProps) {
  const paper_style = {
    height: 56,
    padding: "0 4px",
    display: "flex",
    alignItems: "center",
    borderRadius: "4px 4px 0 0",
    borderBottom: `1px solid ${D.THIRD_DARK_COLOR}`,
    backgroundColor: props.variant === "outlined" ? "transparent" : D.WHITE_COLOR,
    boxShadow: "none",
  };
  const input_base_style = {
    marginLeft: 1,
    flex: 1,
    color: D.BLACK_COLOR,
  };
  const icon_button_style = {
    padding: "10px",
    color: D.BLACK_COLOR,
  };
  const icon_style = {
    fontSize: 24,
  };

  return (
    <Paper component="form" sx={paper_style}>
      <IconButton sx={icon_button_style} aria-label="search">
        <SearchIcon sx={icon_style} />
      </IconButton>
      <InputBase
        sx={input_base_style}
        placeholder="Location"
        inputProps={{ "aria-label": "Location" }}
      />
    </Paper>
  );
}

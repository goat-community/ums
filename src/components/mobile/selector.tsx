import * as React from "react";

import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";

import * as D from "@constants/design";

interface SelectorProps {
  label: string;
  value: string | number;
  items: { label: string; value: number | string }[];
  handleChange: (e: { target: { value: string | number } }) => void;
}

export function Selector(props: SelectorProps) {
  return (
    <div>
      <FormControl variant="standard">
        <Select
          value={props.value}
          onChange={props.handleChange}
          displayEmpty
          input={<BootstrapInput />}
          renderValue={() => {
            if (!props.value) {
              return <p>{props.label}</p>;
            } else {
              return props.value;
            }
          }}
        >
          <MenuItem disabled value="">
            <em>{props.label}</em>
          </MenuItem>
          {props.items.map((item) => (
            <MenuItem value={item.value} key={item.label}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

/** Except case for styling pattern */
/** Customized the material style */
const BootstrapInput = styled(InputBase)(() => ({
  "& .MuiInputBase-input": {
    borderRadius: 8,
    position: "relative",
    backgroundColor: D.WHITE_COLOR,
    fontSize: 14,
    padding: "6px 16px",
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
    "&:focus": {
      borderRadius: 8,
      backgroundColor: D.WHITE_COLOR,
      border: "none !important",
      outline: "none !important",
    },
  },
}));

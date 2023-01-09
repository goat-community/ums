import { Fragment } from "react";

import {
  Box,
  Checkbox,
  DialogContent,
  FormControlLabel,
  FormGroup,
  ListItemButton,
  ListItemText,
  Radio,
  RadioGroup,
} from "@mui/material";

import SkeletonImage from "@pages/common/map/skeleton-image";

import Wrap from "./conditional-wrap";

interface Items {
  title: string;
  subtitle?: string;
  thumbnail?: string;
}

interface Props {
  /**
   * The list of item objects to display
   */
  items: Items[];
  /**
   * The index of the selected item or items.
   */
  selected: number[];
  /**
   * If true, the list will be displayed as a checkbox list.
   */
  multiple?: boolean;
  /**
   * The thumbnail border style
   */
  thumbnailBorder?: "rectangular" | "rounded";

  /**
   * Reverse the thumbnail position. If true, the thumbnail will be displayed on the left side and control on the right side.
   */
  reverse?: boolean;

  /**
   * Callback function to handle the change of the selected list.
   *
   * @param {string} value The value of the selected radio/checkbox button.
   * If the value is not provided the items will be displayed as normal list .
   * @returns void
   */
  onChange?: (value: number[]) => void;
}

function ListTileLabel({
  item,
  thumbnailBorder = "rectangular",
  reverse = false,
}: {
  item: Items;
  thumbnailBorder?: "rectangular" | "rounded";
  reverse: boolean;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: reverse ? "row-reverse" : "row",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
        mr: 2,
      }}
    >
      <ListItemText
        sx={reverse ? { ml: 2, mr: 1 } : { mr: 2, ml: 1 }}
        primary={item.title}
        secondary={item.subtitle || " "}
      />
      {item.thumbnail && (
        <SkeletonImage
          width={65}
          height={50}
          src={item.thumbnail}
          border={thumbnailBorder}
        />
      )}
    </Box>
  );
}

function ButtonList({
  items,
  selected,
  multiple,
  onChange,
  thumbnailBorder,
  reverse,
}: Props) {
  const handleCheckboxToggle = (value: number) => () => {
    const currentIndex = selected.indexOf(value);
    const newChecked = [...selected];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    onChange(newChecked);
  };
  return (
    <Fragment>
      {items.map((item, index) => (
        <ListItemButton
          role={undefined}
          selected={!multiple && index === selected[0] && onChange !== undefined}
          key={index}
          sx={{ py: 0, px: 1 }}
        >
          {onChange && (
            <FormControlLabel
              value={index}
              disableTypography={true}
              sx={{
                width: "100%",
                mx: 0,
                py: 1,
              }}
              labelPlacement={reverse ? "start" : "end"}
              label={
                <ListTileLabel
                  item={item}
                  thumbnailBorder={thumbnailBorder}
                  reverse={reverse}
                />
              }
              control={
                multiple ? (
                  <Checkbox
                    disableRipple
                    checked={selected.indexOf(index) !== -1}
                    onChange={handleCheckboxToggle(index)}
                  />
                ) : (
                  <Radio disableRipple />
                )
              }
            />
          )}
          {!onChange && (
            <ListTileLabel
              item={item}
              thumbnailBorder={thumbnailBorder}
              reverse={reverse}
            />
          )}
        </ListItemButton>
      ))}
    </Fragment>
  );
}

export default function ListTile({
  items = [],
  selected,
  multiple = false,
  thumbnailBorder = "rectangular",
  reverse = true,
  onChange,
}: Props) {
  return (
    <DialogContent
      sx={{
        px: 0,
        pb: 1,
        pt: 0,
        m: 0,
      }}
    >
      <Wrap
        with={multiple ? FormGroup : RadioGroup}
        wrapperProps={
          multiple
            ? {}
            : {
                value: selected[0],
                onChange: (e) => {
                  if (onChange) onChange([parseInt(e.target.value)]);
                },
              }
        }
      >
        <ButtonList
          items={items}
          selected={selected}
          multiple={multiple}
          onChange={onChange}
          thumbnailBorder={thumbnailBorder}
          reverse={reverse}
        />
      </Wrap>
    </DialogContent>
  );
}

import { useEffect, useState } from "react";

import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { setScoreLayerMode } from "@context/flower";

import * as D from "@constants/design";

const actions = [
  { icon: <PersonIcon />, name: "Personalized", value: "personal" },
  { icon: <FilterVintageIcon />, name: "Standard", value: "standard" },
];

export function FloatingFlowerButton() {
  // set mode to personal or standard or not active
  const mode = useAppSelector((state) => state.flower.score_layer_mode);
  const dispatch = useAppDispatch();
  // set icon based on mode (personal -> PersonIcon, standard -> FilterVintageIcon, none -> FilterVintageIcon)
  const [icon, setIcon] = useState<JSX.Element>(<FilterVintageIcon />);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    mode === "personal" ? setIcon(<PersonIcon />) : setIcon(<FilterVintageIcon />);
  }, [mode]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = (action) => () => {
    dispatch(setScoreLayerMode(action.value));
    setOpen(false);
  };

  const handleClick = () => {
    open ? setOpen(false) : setOpen(true);
  };

  return (
    <SpeedDial
      ariaLabel="15 Min Score Layer"
      direction={"left"}
      onOpen={handleOpen}
      open={open}
      onClick={handleClick}
      sx={{
        position: "absolute",
        bottom: 100,
        right: 10,
      }}
      FabProps={{
        style: {
          borderRadius: "16px",
        },
        sx: {
          color: mode === "none" ? D.PRIMARY_COLOR : D.WHITE_COLOR,
          backgroundColor: mode === "none" ? D.WHITE_COLOR : D.GREEN_PRIMARY,
          "&:hover": {
            backgroundColor: mode === "none" ? D.WHITE_COLOR : D.GREEN_PRIMARY,
          },
        },
      }}
      icon={icon}
    >
      {actions.map(
        (action) =>
          mode !== action.value && (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={handleClose(action)}
              FabProps={{
                style: {
                  borderRadius: "12px",
                },
              }}
            />
          )
      )}
      {/* Close SpeedDial only if mode is not none */}
      {mode !== "none" && (
        <SpeedDialAction
          key={"close"}
          icon={<VisibilityOffIcon />}
          tooltipTitle={"Close"}
          FabProps={{
            style: {
              borderRadius: "12px",
            },
          }}
          onClick={handleClose({ value: "none" })}
        />
      )}
    </SpeedDial>
  );
}

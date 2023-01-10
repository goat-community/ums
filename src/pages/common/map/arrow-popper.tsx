import { ReactElement, useState } from "react";
import React from "react";

import { Box, ClickAwayListener, Grow } from "@mui/material";
import Paper from "@mui/material/Paper";
import MuiPopper, { PopperPlacementType } from "@mui/material/Popper";
import { styled } from "@mui/material/styles";

interface Props {
  content: ReactElement;
  children: ReactElement;
  open: boolean;
  onClose?: () => void;
  arrow?: boolean;
  placement?: PopperPlacementType;
}

const Popper = styled(MuiPopper, {
  shouldForwardProp: (prop) => prop !== "arrow",
})(({ theme }) => ({
  zIndex: 2,
  "& > div": {
    position: "relative",
  },
  // eslint-disable-next-line quotes
  '&[data-popper-placement*="bottom"]': {
    "& > div": {
      marginTop: 4,
    },
    "& .MuiPopper-arrow": {
      top: 0,
      left: 0,
      marginTop: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "0 1em 1em 1em",
        borderColor: `transparent transparent ${theme.palette.background.paper} transparent`,
      },
    },
  },
  // eslint-disable-next-line quotes
  '&[data-popper-placement*="top"]': {
    "& > div": {
      marginBottom: 4,
    },
    "& .MuiPopper-arrow": {
      bottom: 0,
      left: 0,
      marginBottom: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "1em 1em 0 1em",
        borderColor: `${theme.palette.background.paper} transparent transparent transparent`,
      },
    },
  },
  // eslint-disable-next-line quotes
  '&[data-popper-placement*="right"]': {
    "& > div": {
      marginLeft: 4,
    },
    "& .MuiPopper-arrow": {
      left: 0,
      marginLeft: "-0.9em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 1em 1em 0",
        borderColor: `transparent ${theme.palette.background.paper} transparent transparent`,
      },
    },
  },
  // eslint-disable-next-line quotes
  '&[data-popper-placement*="left"]': {
    "& > div": {
      marginRight: 4,
    },
    "& .MuiPopper-arrow": {
      right: 0,
      marginRight: "-0.9em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 0 1em 1em",
        borderColor: `transparent transparent transparent ${theme.palette.background.paper}`,
      },
    },
  },
}));

const Arrow = styled("div")({
  position: "absolute",
  fontSize: 7,
  width: "3em",
  height: "3em",
  "&::before": {
    // eslint-disable-next-line quotes
    content: '""',
    margin: "auto",
    display: "block",
    width: 0,
    height: 0,
    borderStyle: "solid",
  },
});

export default function ArrowPopper({
  placement = "top",
  arrow = true,
  open,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose = () => {},
  content,
  children,
}: Props) {
  const [arrowRef, setArrowRef] = useState<HTMLElement | null>(null);
  const [childNode, setChildNode] = useState<HTMLElement | null>(null);

  return (
    <div>
      {React.cloneElement(children, { ...children.props, ref: setChildNode })}
      <Popper
        open={open}
        anchorEl={childNode}
        placement={placement}
        transition
        disablePortal={false}
        modifiers={[
          {
            name: "flip",
            enabled: false,
            options: {
              altBoundary: true,
              rootBoundary: "viewport",
              padding: 8,
            },
          },
          {
            name: "preventOverflow",
            enabled: true,
            options: {
              altAxis: true,
              altBoundary: true,
              tether: false,
              rootBoundary: "viewport",
              padding: 8,
            },
          },
          {
            name: "arrow",
            enabled: true,
            options: {
              element: arrowRef,
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} timeout={150}>
            <Paper
              sx={{
                boxShadow: "none",
              }}
            >
              <ClickAwayListener onClickAway={onClose}>
                <Paper elevation={0}>
                  {arrow ? <Arrow ref={setArrowRef} className="MuiPopper-arrow" /> : null}
                  <Box>{content}</Box>
                </Paper>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

import { useState } from "react";
import { useTranslation } from "react-i18next";

import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import {
  Box,
  Checkbox,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { convert_to_pascal } from "@utils";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { setActivePois } from "@context/pois";

import * as D from "@constants/design";
import { AMENITIES_GROUP } from "@constants/flower";

function BuildingButton(props: { onClick: () => void }) {
  return (
    <Fab
      size="small"
      sx={{ backgroundColor: D.WHITE_COLOR, color: D.BLACK_COLOR }}
      onClick={() => props.onClick()}
    >
      <HomeWorkOutlinedIcon />
    </Fab>
  );
}

function AmenitiesGroupList(props: {
  handleToggle: (group: string) => void;
  active_pois: string[];
}) {
  const { t } = useTranslation();

  return (
    <>
      {Object.keys(AMENITIES_GROUP)
        .slice(0, 4)
        .map((group: string) => {
          const labelId = `label-${group}`;
          return (
            <ListItem
              key={group}
              disablePadding
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={() => props.handleToggle(group)}
                  defaultChecked={props.active_pois.includes(group)}
                  inputProps={{ "aria-labelledby": labelId }}
                />
              }
              sx={{ marginTop: 1 }}
            >
              <ListItemButton>
                <ListItemText
                  id={t("amenities.labelId")}
                  primary={convert_to_pascal(group)}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
    </>
  );
}

export function PoisSelector() {
  const dispatch = useAppDispatch();
  const active_pois = useAppSelector((state) => state.poi.active_pois);

  const [open, setOpen] = useState<boolean>(false);
  const [checked, setChecked] = useState<string[]>(() => active_pois);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = (value: string) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleApply = () => {
    dispatch(setActivePois(checked));
    setOpen(false);
  };

  const { t } = useTranslation();

  return (
    <>
      <BuildingButton onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose} maxWidth="xl" sx={{ marginTop: 2 }}>
        <Box p={1}>
          <DialogTitle variant="h4">Locations</DialogTitle>
          <DialogContent sx={{ padding: 0, maxHeight: 200 }}>
            <List dense sx={{ width: "100%" }}>
              <AmenitiesGroupList
                active_pois={active_pois}
                handleToggle={(group) => handleToggle(group)}
              />
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{t("actions.cancel")}</Button>
            <Button onClick={handleApply}>{t("actions.apply")}</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}

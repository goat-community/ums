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
import { get_poi_groups } from "@context/pois/pois-selector";

import * as D from "@constants/design";

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
  active_poi_groups: string[];
  poi_groups: {
    [key: string]: {
      icon: string;
      color: string;
    };
  };
}) {
  const { t } = useTranslation();

  return (
    <>
      {Object.keys(props.poi_groups).map((group: string) => {
        const labelId = `label-${group}`;
        return (
          <ListItem
            key={group}
            disablePadding
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={() => props.handleToggle(group)}
                defaultChecked={props.active_poi_groups.includes(group)}
                inputProps={{ "aria-labelledby": labelId }}
              />
            }
            sx={{ marginTop: 1 }}
          >
            <ListItemButton>
              <ListItemText id={labelId} primary={t(`amenitiesGroup.${group}`)} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </>
  );
}

export function PoisSelector() {
  const dispatch = useAppDispatch();
  const active_poi_groups = useAppSelector((state) => state.poi.active_poi_groups);
  const poi_groups = useAppSelector(get_poi_groups);
  const [open, setOpen] = useState<boolean>(false);
  const [checked, setChecked] = useState<string[]>(() => active_poi_groups);

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
      <Dialog open={open} onClose={handleClose} sx={{ marginTop: 2 }}>
        <Box p={1} sx={{ width: 300 }}>
          <DialogTitle variant="h4">Locations</DialogTitle>
          <DialogContent sx={{ padding: 0, maxHeight: 200 }}>
            <List dense sx={{ width: "100%" }}>
              <AmenitiesGroupList
                active_poi_groups={active_poi_groups}
                poi_groups={poi_groups}
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

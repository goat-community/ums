import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Close } from "@mui/icons-material";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import { Box, Fab, IconButton, Paper, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { setActivePois } from "@context/pois";
import { get_poi_groups } from "@context/pois/pois-selector";

import * as D from "@constants/design";

import { ArrowPopper } from "@components/common/arrow-popper";
import { ListTile } from "@components/common/list-tile";

export function PoisSelector() {
  const dispatch = useAppDispatch();
  const active_poi_groups = useAppSelector((state) => state.poi.active_poi_groups);
  const poi_groups = useAppSelector(get_poi_groups);
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const items = Object.keys(poi_groups).map((group) => {
    return {
      value: group,
      title: t(`amenitiesGroup.${group}`),
      subtitle: "",
    };
  });
  const [selected, setSelected] = useState(() => {
    const index = [];
    active_poi_groups.forEach((group) => {
      if (items.findIndex((item) => item.value === group) !== -1) {
        index.push(group);
      }
    });
    return index;
  });

  const handleChange = (value) => {
    setSelected(value);
    const active = [];
    value.forEach((group) => {
      if (items[group]) {
        active.push(items[group].value);
      }
    });
    dispatch(setActivePois(active));
  };

  return (
    <>
      <ArrowPopper
        content={
          <Paper sx={{ maxWidth: 400, overflow: "auto" }}>
            <Box position="absolute" top={5} right={5}>
              <IconButton onClick={() => setOpen(false)}>
                <Close />
              </IconButton>
            </Box>

            <Typography sx={{ m: 2 }} variant="h4">
              {t("amenitiesGroup.amenities")}
            </Typography>
            <ListTile
              items={items}
              selected={selected}
              thumbnailBorder="rounded"
              onChange={handleChange}
              multiple={true}
            />
          </Paper>
        }
        open={open}
        placement="top"
        arrow={true}
        onClose={() => setOpen(false)}
      >
        <Fab
          onClick={() => setOpen(!open)}
          size="large"
          sx={{ backgroundColor: D.WHITE_COLOR, color: D.BLACK_COLOR }}
        >
          <HomeWorkOutlinedIcon />
        </Fab>
      </ArrowPopper>
    </>
  );
}

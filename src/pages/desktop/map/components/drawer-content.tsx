import { Divider } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { clearIsochrone } from "@context/isochrones";
import { close_picking_mode } from "@context/map";

import { Drawer } from "@components/desktop";

import { Header } from "./header";
import Insights from "./insights";
import { IsochroneModifier } from "./isochrone-modifier";

export default function DrawerContent() {
  const dispatch = useAppDispatch();
  const travel_time_surface = useAppSelector(
    (state) => state.isochrones.travel_time_surface
  );

  const drawer_is_open = travel_time_surface;

  const close_drawer = () => {
    dispatch(clearIsochrone());
    dispatch(close_picking_mode());
  };

  return (
    <>
      {drawer_is_open ? (
        <Drawer open={travel_time_surface} on_close={close_drawer}>
          <Header position="static" dark_theme />
          <IsochroneModifier />
          <br />
          <Divider sx={{ width: "100%" }} />
          <Insights />
        </Drawer>
      ) : (
        <Header />
      )}
    </>
  );
}

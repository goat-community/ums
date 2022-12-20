import { Divider } from "@mui/material";

import { useAppSelector } from "@hooks/context";

import { Drawer } from "@components/desktop";

import { Header } from "./header";
import Insights from "./insights";
import { IsochroneModifier } from "./isochrone-modifier";

export default function DrawerContent() {
  //   const loading = useAppSelector((state) => state.network.loading);
  const travel_time_surface = useAppSelector(
    (state) => state.isochrones.travel_time_surface
  );

  const drawer_is_open = travel_time_surface;

  return (
    <>
      {drawer_is_open ? (
        <Drawer open={travel_time_surface}>
          <Header position="static" />
          <IsochroneModifier />
          {/* <hr style={{ border: "1px solid black", width: "100%" }} /> */}
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

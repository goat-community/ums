import { useEffect } from "react";
import styled from "styled-components";

import { Stack } from "@mui/material";

import { useAppDispatch } from "@hooks/context";

import { get_amenities } from "@context/flower";

import { BaseMapSelector } from "./base-map-selector";
// import { FlowerButton } from "./floating-flower";
import { LayerSelector } from "./layer-selector";
import { PoisSelector } from "./pois-selector";

// import LightIcon from "@images/icon.png";
// import PurpleIcon from "@images/purple_icon.png";

export function FloatingActions() {
  const dispatch = useAppDispatch();

  // fetch survey from localstorage
  // to state the filling status
  useEffect(() => {
    dispatch(get_amenities());
  }, []);

  return (
    <Container>
      <Stack direction="column" spacing={2}>
        <LayerSelector />
        <PoisSelector />
        <BaseMapSelector />
      </Stack>
    </Container>
  );
}

const Container = styled.section`
  z-index: 2;
  position: fixed;
  padding-right: env(safe-area-inset-right, 50px);
  padding-bottom: env(safe-area-inset-bottom, 50px);
  bottom: 50px;
  right: 50px;
`;

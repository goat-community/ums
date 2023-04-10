import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { get_signed_url_flower } from "@context/flower";

export default function Flower() {
  const dispatch = useAppDispatch();
  const { flowerKey } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const signed_flower_link = useAppSelector(
    (state) => state.flower.signed_shareable_flower_link
  );

  useEffect(() => {
    if (flowerKey) {
      dispatch(get_signed_url_flower(flowerKey));
    }
  }, [flowerKey]);

  useEffect(() => {
    if (signed_flower_link) {
      setIsLoading(false);
    }
  }, [signed_flower_link]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h1">Please Wait...</Typography>
      </div>
    );
  } else {
    return <img src={signed_flower_link} width={"100%"} height={"100%"} />;
  }
}

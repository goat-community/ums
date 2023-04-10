import { useEffect } from "react";

import { useAppDispatch } from "@hooks/context";

import { clear_signed_urls } from "@context/flower";

import ShareableFlower from "./components/share-flower";

export default function Flower() {
  // reset all signed url and signed keys
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clear_signed_urls());
  }, []);

  return <ShareableFlower />;
}

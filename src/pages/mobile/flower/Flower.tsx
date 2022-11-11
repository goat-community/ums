import React from "react";
import Introduction from "./components/introduction";

export default function Flower() {
  const pages = [<Introduction key={"introduction"} />];
  const pageIndex = 0;

  return pages[pageIndex];
}

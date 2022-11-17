import React, { useState } from "react";

import Introduction from "./components/introduction";
import Survey from "./components/survey";

export default function Flower() {
  const [pageIndex, setPageIndex] = useState<0 | 1>(0);
  const pages = [
    <Introduction key={"introduction"} onClickContinue={() => setPageIndex(1)} />,
    <Survey key="survey" />,
  ];

  return pages[pageIndex];
}

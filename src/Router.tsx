import React from "react";
import { createBrowserRouter } from "react-router-dom";
/** Pages */
import { Sample } from "@pages/sample/Sample";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Sample />,
  },
]);

export default router;

import React from "react";
import { createBrowserRouter } from "react-router-dom";
/** Pages */
import { Splash } from "@pages/splash/Splash";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Splash />,
  },
]);

export default router;

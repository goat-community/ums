import React, { lazy } from "react";
/** Components */
import { createBrowserRouter } from "react-router-dom";

import Notfound from "@pages/common/404";
import Flower from "@pages/mobile/flower/Flower";
import Insights from "@pages/mobile/insights/Insights";
import Map from "@pages/mobile/map/Map";
import Profile from "@pages/mobile/profile/Profile";

let router: ReturnType<typeof createBrowserRouter>;
// Mobile
if (window.screen.width <= 780) {
  router = createBrowserRouter([
    {
      path: "/",
      element: <Map />,
    },
    {
      path: "/flower",
      element: <Flower />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/insights",
      element: <Insights />,
    },
    {
      path: "*",
      element: <Notfound />,
    },
  ]);
} else {
  const Map = lazy(() => import("@pages/desktop/map/Map"));
  router = createBrowserRouter([
    {
      path: "/",
      element: <Map />,
    },
    {
      path: "*",
      element: <Notfound />,
    },
  ]);
}

export default router;

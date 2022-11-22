import React, { lazy } from "react";
/** Components */
import { createBrowserRouter } from "react-router-dom";

import Notfound from "@pages/common/404/404";

let router: ReturnType<typeof createBrowserRouter>;
// Mobile
if (window.screen.width <= 780) {
  const Flower = lazy(() => import("@pages/mobile/flower/Flower"));
  const Map = lazy(() => import("@pages/mobile/map/Map"));
  const Profile = lazy(() => import("@pages/mobile/profile/Profile"));
  const Insights = lazy(() => import("@pages/mobile/insights/Insights"));

  router = createBrowserRouter([
    {
      path: "/",
      element: <Flower />,
    },
    {
      path: "/map",
      element: <Map />,
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

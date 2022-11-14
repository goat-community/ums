import React, { lazy } from "react";
/** Components */
import { createBrowserRouter } from "react-router-dom";
import Notfound from "@pages/common/404/404";
/** Must have pages */
import Splash from "@pages/mobile/splash/Splash";

let router: ReturnType<typeof createBrowserRouter>;
// Mobile
if (window.screen.width <= 780) {
  const Flower = lazy(() => import("@pages/mobile/flower/Flower"));
  const Map = lazy(() => import("@pages/mobile/map/Map"));
  router = createBrowserRouter([
    {
      path: "/",
      element: <Flower />,
    },
    {
      path: "/splash",
      element: <Splash />,
    },
    {
      path: "/map",
      element: <Map />,
    },
    {
      path: "*",
      element: <Notfound />,
    },
  ]);
} else {
  // Desktop and bigger
  router = createBrowserRouter([
    {
      path: "/",
      element: <>{window.screen.width}</>,
    },
    {
      path: "*",
      element: <Notfound />,
    },
  ]);
}

export default router;

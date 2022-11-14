import React, { lazy } from "react";
/** Components */
import { createBrowserRouter } from "react-router-dom";
import Splash from "@pages/mobile/splash/Splash";

let router: ReturnType<typeof createBrowserRouter>;
// Mobile
if (window.screen.width <= 780) {
  const Flower = lazy(() => import("@pages/mobile/flower/Flower"));
  const Map = lazy(() => import("@pages/mobile/map/Map"));
  router = createBrowserRouter([
    {
      path: "/",
      element: <Splash />,
    },
    {
      path: "/flower",
      element: <Flower />,
    },
    {
      path: "/map",
      element: <Map />,
    },
  ]);
} else {
  // Desktop and bigger
  router = createBrowserRouter([
    {
      path: "/",
      element: <>{window.screen.width}</>,
    },
  ]);
}

export default router;

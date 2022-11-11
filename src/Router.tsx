import React, { lazy } from "react";
/** Components */
import { createBrowserRouter } from "react-router-dom";

let router: ReturnType<typeof createBrowserRouter>;
// Mobile
if (window.screen.width <= 780) {
  const Splash = lazy(() => import("@pages/mobile/splash/Splash"));
  const Flower = lazy(() => import("@pages/mobile/flower/Flower"));
  router = createBrowserRouter([
    {
      path: "/",
      element: <Splash />,
    },
    {
      path: "/flower",
      element: <Flower />,
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

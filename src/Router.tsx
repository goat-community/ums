import React, { lazy } from "react";
/** Components */
import { createBrowserRouter } from "react-router-dom";

let router: ReturnType<typeof createBrowserRouter>;

// Mobile
if (window.screen.width <= 780) {
  // pages
  const Splash = lazy(() => import("@pages/mobile/splash/Splash"));

  // construct the router
  router = createBrowserRouter([
    {
      path: "/",
      element: <Splash />,
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

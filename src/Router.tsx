import { lazy } from "react";
/** Components */
import { createBrowserRouter } from "react-router-dom";

import Notfound from "@pages/common/404";

const MOBILE_SCREEN_SIZE = 830;

let router: ReturnType<typeof createBrowserRouter>;
// Mobile
if (window.screen.width <= MOBILE_SCREEN_SIZE) {
  const Flower = lazy(() => import("@pages/mobile/flower/Flower"));
  const Map = lazy(() => import("@pages/mobile/map/Map"));
  const Profile = lazy(() => import("@pages/mobile/profile/Profile"));
  const Insights = lazy(() => import("@pages/mobile/insights/Insights"));

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
  const ShareableFlower = lazy(() => import("@components/desktop/shareable-flower-svg"));
  const Flower = lazy(() => import("@pages/desktop/flower/Flower"));

  router = createBrowserRouter([
    {
      path: "/",
      element: <Map />,
    },
    {
      path: "/sr",
      element: <ShareableFlower />,
    },
    {
      path: "/flower/:flowerKey",
      element: <Flower />,
    },
    {
      path: "*",
      element: <Notfound />,
    },
  ]);
}

export default router;

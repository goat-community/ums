import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ErrorBoundary, NotifierWrapper } from "@components/common";
import { store } from "@context";
import Splash from "@pages/mobile/splash/Splash";
import { Palette } from "@styles/theme";

import router from "./Router";

import "@styles/variables.scss";
import "@styles/root.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <Palette>
          <NotifierWrapper />
          <Suspense fallback={<Splash />}>
            <RouterProvider router={router} />
          </Suspense>
        </Palette>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

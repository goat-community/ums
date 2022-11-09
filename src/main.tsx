import React from "react";
import ReactDOM from "react-dom/client";
/** Store Providers */
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
/** Another Providers */
import { ErrorBoundary, NotifierWrapper } from "@components";
import { store } from "@context";
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
          <RouterProvider router={router} />
        </Palette>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

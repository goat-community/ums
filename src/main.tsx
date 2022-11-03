import React from "react";
import ReactDOM from "react-dom/client";
/** Store Providers */
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
/** Another Providers */
import { ErrorBoundary, NotifierWrapper } from "@components";
import { store } from "@context";

import router from "./Router";

import "@styles/variables.scss";
import "@styles/root.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <NotifierWrapper />
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ErrorBoundary, NotifierWrapper } from "@components/common";
import { store } from "@context";
import { CircularProgress } from "@mui/material";
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
          <Suspense fallback={<CircularProgress />}>
            <RouterProvider router={router} />
          </Suspense>
        </Palette>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

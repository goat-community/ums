import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import * as Sentry from "@sentry/react";
import { Palette } from "@styles/theme";

import { store } from "@context";
import { get_pois_config } from "@context/pois";

import { ErrorBoundary, NotifierWrapper } from "@components/common";

import Splash from "@pages/common/splash";

import "@i18n";

import router from "./Router";

import "@styles/variables.scss";
import "@styles/root.scss";

Sentry.init({
  dsn: "https://459691ddeea644a483881c17dd0262bf@o328034.ingest.sentry.io/4504932954996736",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});

store.dispatch(get_pois_config());

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
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
);

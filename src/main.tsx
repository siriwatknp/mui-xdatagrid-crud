import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { worker } from "./mocks/browser.ts";

async function prepare() {
  if (import.meta.env.DEV) {
    return worker.start();
  }
}

prepare().then(() => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});

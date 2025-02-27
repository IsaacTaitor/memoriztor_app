import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App";
import { SnackbarProvider } from "notistack";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
      <App />
    </SnackbarProvider>
  </StrictMode>
);

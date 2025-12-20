import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Login from "./components/Login/index.tsx";
import { GlobalStyle } from "./components/Style/style.ts";
import "./i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyle />
    <Login />
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Login from "./components/Login/index.tsx";
import { GlobalStyle } from "./components/Style/style.ts";
import "./i18n";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// TODO: alterar tema do toast conforme seleção

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyle />
    <Login />
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      closeOnClick
      pauseOnHover
      draggable
      theme="dark"
    />
  </StrictMode>
);

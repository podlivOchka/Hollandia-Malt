import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HollandiaSite from "./components/HollandiaSite";
import "./globals.css";
import "./refinements.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HollandiaSite />
  </StrictMode>,
);

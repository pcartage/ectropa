import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Golf from "./Golf";
import "./styles.css";
import "./golf.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Golf />
  </StrictMode>,
);

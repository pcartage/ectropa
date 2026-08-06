import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import LockupStudies from "./LockupStudies";
import MarkStudies from "./MarkStudies";
import MarkRefinementStudies from "./MarkRefinementStudies";
import LettermarkStudies from "./LettermarkStudies";
import "./styles.css";

const isLockupStudy = new URLSearchParams(window.location.search).get("view") === "lockups";
const isMarkStudy = new URLSearchParams(window.location.search).get("view") === "marks";
const isMarkRefinementStudy = new URLSearchParams(window.location.search).get("view") === "mark-refinements";
const isLettermarkStudy = new URLSearchParams(window.location.search).get("view") === "lettermarks";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isLettermarkStudy ? <LettermarkStudies /> : isMarkRefinementStudy ? <MarkRefinementStudies /> : isMarkStudy ? <MarkStudies /> : isLockupStudy ? <LockupStudies /> : <App />}
  </StrictMode>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LazyMotion, domMax } from "motion/react";
import { App } from "./App";
import "./index.css";

// MotionConfig (reducedMotion "user", or "always" with Calm motion on) lives in App, next to the setting.
// domMax: the sheets drag and the tab indicator uses a shared layout animation.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LazyMotion features={domMax} strict>
      <App />
    </LazyMotion>
  </StrictMode>,
);

import * as React from "react";
import { MotionConfig } from "motion/react";
import { go, tabOf, useRoute, type Route } from "./app/router";
import { useStore } from "./app/store";
import { Rail, TabBar, Transition } from "./components/app/shell";
import { FigureBoundary } from "./components/app/figure-preview";
import { Today } from "./pages/Today";
import { Learn } from "./pages/Learn";
import { TicketPage } from "./pages/TicketPage";
import { LessonDone } from "./pages/LessonDone";
import { Practice } from "./pages/Practice";
import { PortMatch } from "./pages/PortMatch";
import { Progress } from "./pages/Progress";
import { Profile } from "./pages/Profile";
import { SignIn, Welcome } from "./pages/Welcome";
import { LessonSkeleton, NotFound } from "./pages/NotFound";

// Screens that bring in a figure load on demand, behind a skeleton of their own layout.
const LessonOne = React.lazy(() => import("./lessons/l1/LessonOne").then((mod) => ({ default: mod.LessonOne })));
const Quiz = React.lazy(() => import("./pages/Quiz").then((mod) => ({ default: mod.Quiz })));
const FigurePage = React.lazy(() => import("./pages/FigurePage").then((mod) => ({ default: mod.FigurePage })));

function useTheme() {
  const theme = useStore((s) => s.settings.theme);
  React.useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const dark = theme === "dark" || (theme === "system" && media.matches);
      document.documentElement.classList.toggle("dark", dark);
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [theme]);
}

function screen(route: Route): { node: React.ReactNode; kind: "tab" | "push" | "modal" | "full" } {
  switch (route.name) {
    case "today":
      return { node: <Today />, kind: "tab" };
    case "learn":
      return { node: <Learn />, kind: "tab" };
    case "practice":
      return { node: <Practice />, kind: "tab" };
    case "progress":
      return { node: <Progress />, kind: "tab" };
    case "ticket":
      return { node: <TicketPage no={route.no} />, kind: "push" };
    case "done":
      return { node: <LessonDone no={route.no} />, kind: "push" };
    case "profile":
      return { node: <Profile />, kind: "push" };
    case "lesson":
      if (route.no !== "1041") return { node: <TicketPage no={route.no} />, kind: "push" };
      return { node: <LessonOne />, kind: "full" };
    case "quiz":
      return { node: <Quiz no={route.no} />, kind: "full" };
    case "ports":
      return { node: <PortMatch />, kind: "full" };
    case "share":
      return { node: <FigurePage />, kind: "full" };
    case "welcome":
      return { node: <Welcome />, kind: "full" };
    case "signin":
      return { node: <SignIn />, kind: "full" };
    default:
      return { node: <NotFound />, kind: "push" };
  }
}

export function App() {
  useTheme();
  const route = useRoute();
  const onboarded = useStore((s) => s.onboarded);
  const calm = useStore((s) => s.settings.calm);

  // First visit to the app's home goes through the welcome screen. Shared links open directly.
  React.useEffect(() => {
    if (!onboarded && route.name === "today") go("/welcome");
  }, [onboarded, route.name]);

  const tab = tabOf(route);
  const { node, kind } = screen(route);
  const chrome = kind === "tab" || kind === "push";
  const key = route.name + ("no" in route ? route.no : "");

  // After a route change, move focus to the new screen so screen readers start there.
  const mainRef = React.useRef<HTMLElement>(null);
  const first = React.useRef(true);
  React.useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [key]);

  return (
    <MotionConfig reducedMotion={calm ? "always" : "user"}>
      {chrome ? <Rail active={tab} route={route} /> : null}
      <main ref={mainRef} tabIndex={-1} className={chrome ? "outline-none lg:pl-[248px]" : "outline-none"}>
        <FigureBoundary>
          <React.Suspense fallback={<LessonSkeleton />}>
            {kind === "full" ? (
              <React.Fragment key={key}>{node}</React.Fragment>
            ) : (
              <Transition id={key} kind={kind === "tab" ? "tab" : "push"}>
                {node}
              </Transition>
            )}
          </React.Suspense>
        </FigureBoundary>
      </main>
      {kind === "tab" ? <TabBar active={tab} /> : null}
    </MotionConfig>
  );
}

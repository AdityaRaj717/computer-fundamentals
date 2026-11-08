import * as React from "react";

// A small hash router: shareable links work from any static host and from Capacitor later.

export type Route =
  | { name: "welcome" }
  | { name: "signin" }
  | { name: "today" }
  | { name: "learn" }
  | { name: "ticket"; no: string }
  | { name: "lesson"; no: string }
  | { name: "done"; no: string }
  | { name: "practice" }
  | { name: "quiz"; no: string }
  | { name: "ports" }
  | { name: "progress" }
  | { name: "profile" }
  | { name: "share"; fig: string }
  | { name: "missing"; path: string };

export type Tab = "today" | "learn" | "practice" | "progress";

export function parse(hash: string): Route {
  const path = hash.replace(/^#/, "") || "/";
  const parts = path.split("/").filter(Boolean);
  const [a, b, c] = parts;
  if (!a) return { name: "today" };
  if (a === "welcome") return { name: "welcome" };
  if (a === "signin") return { name: "signin" };
  if (a === "learn" && !b) return { name: "learn" };
  if (a === "ticket" && b) return { name: "ticket", no: b };
  if (a === "lesson" && b && c === "done") return { name: "done", no: b };
  if (a === "lesson" && b) return { name: "lesson", no: b };
  if (a === "practice" && !b) return { name: "practice" };
  if (a === "practice" && b === "ports") return { name: "ports" };
  if (a === "practice" && b) return { name: "quiz", no: b };
  if (a === "progress") return { name: "progress" };
  if (a === "profile") return { name: "profile" };
  if (a === "fig" || a === "share") return { name: "share", fig: b ?? "osi" };
  return { name: "missing", path };
}

/** Which tab a route belongs to (for the tab bar and the rail). */
export function tabOf(route: Route): Tab | null {
  switch (route.name) {
    case "today":
      return "today";
    case "learn":
    case "ticket":
      return "learn";
    case "practice":
      return "practice";
    case "progress":
      return "progress";
    default:
      return null;
  }
}

export function go(path: string) {
  if (window.location.hash === `#${path}`) return;
  window.location.hash = path;
}

export function useRoute(): Route {
  const [hash, setHash] = React.useState(() => window.location.hash);
  React.useEffect(() => {
    const changed = () => {
      setHash(window.location.hash);
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", changed);
    return () => window.removeEventListener("hashchange", changed);
  }, []);
  return React.useMemo(() => parse(hash), [hash]);
}

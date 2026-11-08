import * as React from "react";
import * as m from "motion/react-m";
import { ChartColumn, Dumbbell, House, Layers, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { go, type Route, type Tab } from "@/app/router";
import { EASE } from "./ui";

// Four tabs (Apple HIG and Material 3: 3–5 destinations, icon plus a one-word label, always visible on
// top-level screens). Profile lives behind the avatar in each tab's header, and in the rail on desktop.

const TABS: { id: Tab; label: string; path: string; Icon: typeof House }[] = [
  { id: "today", label: "Today", path: "/", Icon: House },
  { id: "learn", label: "Learn", path: "/learn", Icon: Layers },
  { id: "practice", label: "Practice", path: "/practice", Icon: Dumbbell },
  { id: "progress", label: "Progress", path: "/progress", Icon: ChartColumn },
];

function select(tab: { id: Tab; path: string }, active: Tab | null) {
  // Re-tapping the active tab scrolls to the top.
  if (tab.id === active && window.location.hash.replace(/^#/, "") === tab.path) window.scrollTo({ top: 0, behavior: "smooth" });
  else go(tab.path);
}

export function TabBar({ active }: { active: Tab | null }) {
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(10px,env(safe-area-inset-bottom))] lg:hidden"
    >
      <div className="sq mx-auto flex h-[68px] max-w-[520px] items-stretch gap-1 rounded-[26px] bg-[color-mix(in_oklab,var(--surf)_84%,transparent)] p-1.5 shadow-raised backdrop-blur-xl backdrop-saturate-150">
        {TABS.map((tab) => {
          const on = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              aria-current={on ? "page" : undefined}
              onClick={() => select(tab, active)}
              className={cn("relative flex min-w-0 flex-1 flex-col items-center justify-center gap-[3px] rounded-[20px] transition-colors", on ? "text-ink" : "text-ink-2 hover:text-ink")}
            >
              {on ? <m.span layoutId="tab-pill" className="absolute inset-0 rounded-[20px] bg-surf-2" transition={{ type: "spring", stiffness: 520, damping: 42 }} /> : null}
              <tab.Icon className="relative size-[23px]" strokeWidth={on ? 2.5 : 2} />
              <span className={cn("relative text-[12.5px] leading-none", on ? "font-extrabold" : "font-semibold")}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/** Desktop: a side rail instead of a bottom bar (Material 3: the nav bar is for compact windows). */
export function Rail({ active, route }: { active: Tab | null; route: Route }) {
  return (
    <nav aria-label="Main" className="fixed inset-y-0 left-0 z-40 hidden w-[248px] flex-col px-4 py-8 lg:flex">
      <Wordmark />
      <div className="mt-10 flex flex-col gap-1">
        {TABS.map((tab) => {
          const on = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              aria-current={on ? "page" : undefined}
              onClick={() => select(tab, active)}
              className={cn("relative flex h-12 items-center gap-3 rounded-[16px] px-3.5 text-body transition-colors", on ? "font-extrabold text-ink" : "font-semibold text-ink-2 hover:bg-surf-2/60 hover:text-ink")}
            >
              {on ? <m.span layoutId="rail-pill" className="absolute inset-0 rounded-[16px] bg-surf shadow-card" transition={{ type: "spring", stiffness: 520, damping: 42 }} /> : null}
              <tab.Icon className="relative size-[22px]" strokeWidth={on ? 2.5 : 2} />
              <span className="relative">{tab.label}</span>
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => go("/profile")}
        aria-current={route.name === "profile" ? "page" : undefined}
        className={cn("mt-auto flex h-14 items-center gap-3 rounded-[16px] px-3 text-left transition-colors hover:bg-surf-2/60", route.name === "profile" && "bg-surf shadow-card")}
      >
        <span className="grid size-9 place-items-center rounded-full bg-surf-3 text-ink">
          <UserRound className="size-5" strokeWidth={2.2} />
        </span>
        <span>
          <span className="block text-callout font-bold text-ink">Guest</span>
          <span className="block text-footnote text-ink-2">Profile and settings</span>
        </span>
      </button>
    </nav>
  );
}

/** Placeholder mark: the product name is still undecided (PRODUCT.md). */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="grid size-9 place-items-center rounded-[11px] bg-brand text-brand-ink" aria-hidden="true">
        <Layers className="size-5" strokeWidth={2.4} />
      </span>
      <span className="text-headline font-extrabold tracking-[-0.02em] text-ink">Network+ pilot</span>
    </span>
  );
}

/** The guest avatar button that opens profile and settings from each tab's header. */
export function ProfileButton() {
  return (
    <button
      type="button"
      onClick={() => go("/profile")}
      aria-label="Profile and settings"
      className="mt-1 grid size-11 flex-none place-items-center rounded-full bg-surf text-ink shadow-card transition-transform active:scale-95 lg:hidden"
    >
      <UserRound className="size-[22px]" strokeWidth={2.2} />
    </button>
  );
}

/** Tab screens fade through; pushed screens slide in from the side. */
export function Transition({ id, kind, children }: { id: string; kind: "tab" | "push" | "modal"; children: React.ReactNode }) {
  const from = kind === "tab" ? { opacity: 0, y: 8 } : kind === "push" ? { opacity: 0, x: 28 } : { opacity: 0, y: 24 };
  return (
    <m.div key={id} initial={from} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: kind === "tab" ? 0.22 : 0.3, ease: EASE }}>
      {children}
    </m.div>
  );
}

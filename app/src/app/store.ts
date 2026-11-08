import * as React from "react";
import type { ObjId, TicketNo } from "./content";

// Everything the learner does is kept on this device (FR-014: no account). One versioned key.

export type ThemePref = "system" | "light" | "dark";

export interface Settings {
  theme: ThemePref;
  /** Drill timers. Off means drills score accuracy only. */
  timer: boolean;
  /** Calm motion: turn off movement even when the device doesn't ask for it. */
  calm: boolean;
}

export interface ReviewItem {
  id: string;
  title: string;
  obj: ObjId;
  from: string;
}

export interface State {
  onboarded: boolean;
  /** Lesson step reached per ticket, so a learner resumes where they left off. */
  steps: Partial<Record<TicketNo, number>>;
  closed: Partial<Record<TicketNo, string>>;
  /** First-try result of every practice question answered. */
  answers: Record<string, { obj: ObjId; right: boolean }>;
  review: ReviewItem[];
  ports: { best: number | null; plays: number; missed: Record<string, number> };
  ratings: Record<string, number>;
  comments: Record<string, string>;
  email: string;
  /** Local dates (YYYY-MM-DD) with any learning activity. */
  days: string[];
  settings: Settings;
}

const KEY = "netplus.v1";

export const EMPTY: State = {
  onboarded: false,
  steps: {},
  closed: {},
  answers: {},
  review: [],
  ports: { best: null, plays: 0, missed: {} },
  ratings: {},
  comments: {},
  email: "",
  days: [],
  settings: { theme: "system", timer: true, calm: false },
};

function load(): State {
  // Dev only: `?guest` skips the welcome screen, so screenshot runs can open any tab in a fresh browser.
  if (import.meta.env.DEV && new URLSearchParams(window.location.search).has("guest")) {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
      localStorage.setItem(KEY, JSON.stringify({ ...saved, onboarded: true }));
    } catch {
      // storage blocked: the welcome screen shows
    }
  }
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const saved = JSON.parse(raw) as Partial<State>;
    return { ...EMPTY, ...saved, settings: { ...EMPTY.settings, ...saved.settings }, ports: { ...EMPTY.ports, ...saved.ports } };
  } catch {
    return EMPTY;
  }
}

let state: State = load();
const listeners = new Set<() => void>();

export function getState() {
  return state;
}

export function setState(update: (now: State) => State) {
  state = update(state);
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Private mode or full storage: keep working in memory.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useStore<T>(select: (s: State) => T): T {
  return React.useSyncExternalStore(subscribe, () => select(state));
}

export const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

/** Mark today as a day the learner studied. */
export function touchDay(s: State): State {
  const t = today();
  return s.days.includes(t) ? s : { ...s, days: [...s.days, t] };
}

export const actions = {
  onboard: () => setState((s) => ({ ...s, onboarded: true })),
  step: (no: TicketNo, step: number) => setState((s) => touchDay({ ...s, steps: { ...s.steps, [no]: step } })),
  close: (no: TicketNo) => setState((s) => touchDay({ ...s, closed: { ...s.closed, [no]: s.closed[no] ?? new Date().toISOString() }, steps: { ...s.steps, [no]: 0 } })),
  answer: (id: string, obj: ObjId, right: boolean, review?: Omit<ReviewItem, "id">) =>
    setState((s) => {
      const first = s.answers[id] ? s.answers : { ...s.answers, [id]: { obj, right } };
      const inReview = s.review.some((r) => r.id === id);
      // A miss goes into review; getting it right later takes it out again.
      const next = right ? s.review.filter((r) => r.id !== id) : inReview || !review ? s.review : [...s.review, { id, ...review }];
      return touchDay({ ...s, answers: first, review: next });
    }),
  clearReview: (id: string) => setState((s) => ({ ...s, review: s.review.filter((r) => r.id !== id) })),
  portsResult: (seconds: number | null, missed: string[]) =>
    setState((s) => {
      const tally = { ...s.ports.missed };
      missed.forEach((id) => (tally[id] = (tally[id] ?? 0) + 1));
      const clean = missed.length === 0 && seconds != null;
      const best = clean && (s.ports.best == null || seconds < s.ports.best) ? seconds : s.ports.best;
      return touchDay({ ...s, ports: { best, plays: s.ports.plays + 1, missed: tally } });
    }),
  rate: (key: string, value: number) => setState((s) => ({ ...s, ratings: { ...s.ratings, [key]: value } })),
  comment: (key: string, text: string) => setState((s) => ({ ...s, comments: { ...s.comments, [key]: text } })),
  email: (email: string) => setState((s) => ({ ...s, email: email.trim().toLowerCase() })),
  settings: (patch: Partial<Settings>) => setState((s) => ({ ...s, settings: { ...s.settings, ...patch } })),
  reset: () => setState((s) => ({ ...EMPTY, onboarded: true, settings: s.settings })),
};

export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

/** Ticket status from progress. */
export function statusOf(s: State, no: TicketNo, ready: boolean): "closed" | "progress" | "ready" | "soon" {
  if (s.closed[no]) return "closed";
  if (!ready) return "soon";
  return (s.steps[no] ?? 0) > 0 ? "progress" : "ready";
}

/** Practice accuracy for one objective: first-try right / answered. */
export function accuracy(s: State, obj: ObjId) {
  const all = Object.values(s.answers).filter((a) => a.obj === obj);
  return { right: all.filter((a) => a.right).length, total: all.length };
}

import * as React from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Check, RotateCcw, Timer, TimerOff, Trophy, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PORTS } from "@/app/content";
import { go } from "@/app/router";
import { actions, getState, useStore } from "@/app/store";
import { Bar, Btn, Card, EASE, Page } from "@/components/app/ui";

// Port Match (FR-010): 12 ports in two rounds of six. Tap a port, then its protocol. Ports you mixed up
// before come first next time. The timer can be turned off; then the drill scores accuracy only.

export const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

function deal() {
  const missed = getState().ports.missed;
  const shuffled = [...PORTS].sort(() => Math.random() - 0.5);
  // missed items show up more often: they lead round one
  shuffled.sort((a, b) => (missed[b.id] ?? 0) - (missed[a.id] ?? 0));
  const rounds = [shuffled.slice(0, 6), shuffled.slice(6, 12)];
  return { rounds, right: rounds.map((r) => [...r].sort(() => Math.random() - 0.5)) };
}

type Pick = { side: "port" | "proto"; id: string } | null;

export function PortMatch() {
  const timerOn = useStore((s) => s.settings.timer);
  const best = useStore((s) => s.ports.best);
  const [game, setGame] = React.useState(deal);
  const [round, setRound] = React.useState(0);
  const [done, setDone] = React.useState<Set<string>>(new Set());
  const [sel, setSel] = React.useState<Pick>(null);
  const [wrong, setWrong] = React.useState<{ a: string; b: string } | null>(null);
  const [missed, setMissed] = React.useState<Set<string>>(new Set());
  const [seconds, setSeconds] = React.useState(0);
  const [finished, setFinished] = React.useState<null | { time: number | null; missed: string[]; newBest: boolean }>(null);
  const [note, setNote] = React.useState<string>("");

  React.useEffect(() => {
    if (!timerOn || finished) return;
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [timerOn, finished]);

  const restart = () => {
    setGame(deal());
    setRound(0);
    setDone(new Set());
    setSel(null);
    setWrong(null);
    setMissed(new Set());
    setSeconds(0);
    setFinished(null);
    setNote("");
  };

  const tap = (side: "port" | "proto", id: string) => {
    if (done.has(id)) return;
    if (!sel || sel.side === side) return setSel(sel?.id === id && sel.side === side ? null : { side, id });
    if (sel.id === id) {
      const item = PORTS.find((p) => p.id === id)!;
      const next = new Set(done).add(id);
      setDone(next);
      setSel(null);
      setNote(`${item.port} is ${item.proto}: ${item.use}.`);
      const roundDone = game.rounds[round].every((p) => next.has(p.id));
      if (roundDone && round === 0) window.setTimeout(() => setRound(1), 450);
      if (roundDone && round === 1) {
        const time = timerOn ? seconds : null;
        const before = getState().ports.best;
        const miss = [...missed];
        actions.portsResult(time, miss);
        miss.forEach((mid) => {
          const p = PORTS.find((x) => x.id === mid)!;
          actions.answer(`ports-${mid}`, "o14", false, { title: `Port ${p.port} is ${p.proto}`, obj: "o14", from: "Port Match" });
        });
        window.setTimeout(() => setFinished({ time, missed: miss, newBest: time != null && miss.length === 0 && (before == null || time < before) }), 500);
      }
    } else {
      const portId = side === "port" ? id : sel.id;
      setMissed((now) => new Set(now).add(portId));
      setWrong({ a: sel.id, b: id });
      setSel(null);
      setNote("Not a pair. Try another.");
      window.setTimeout(() => setWrong(null), 650);
    }
  };

  const left = game.rounds[round];
  const right = game.right[round];

  return (
    <div data-obj="o14" className="min-h-dvh bg-[var(--bg)]">
      <header className="mx-auto flex h-[60px] w-full max-w-[640px] items-center gap-3 px-3 pt-[env(safe-area-inset-top)]">
        <button type="button" onClick={() => go("/practice")} aria-label="Close the drill" className="grid size-11 flex-none place-items-center rounded-full text-ink hover:bg-surf-2">
          <X className="size-6" strokeWidth={2.4} />
        </button>
        <p className="flex-1 text-headline font-extrabold text-ink">Port Match</p>
        <button
          type="button"
          onClick={() => actions.settings({ timer: !timerOn })}
          aria-label={timerOn ? "Turn the timer off" : "Turn the timer on"}
          aria-pressed={timerOn}
          className="num flex h-11 items-center gap-1.5 rounded-full bg-surf px-4 text-callout font-bold text-ink shadow-card"
        >
          {timerOn ? <Timer className="size-[18px]" /> : <TimerOff className="size-[18px]" />}
          {timerOn ? formatTime(seconds) : "Timer off"}
        </button>
      </header>

      <AnimatePresence mode="wait" initial={false}>
        {finished ? (
          <m.div key="done" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: EASE }}>
            <Results result={finished} best={best} onAgain={restart} />
          </m.div>
        ) : (
          <m.div key={`round-${round}`} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.26, ease: EASE }}>
            <Page className="!pb-10">
              <div className="flex items-center gap-3 pt-1">
                <Bar value={done.size / 12} className="flex-1" label="Pairs matched" />
                <span className="num text-callout font-bold text-ink-2">{done.size} of 12</span>
              </div>
              <h1 className="mt-5 text-[23px] font-extrabold leading-[1.18] tracking-[-0.02em] text-ink">Match each port to its protocol.</h1>
              <p className="mt-1 text-callout text-ink-2">Round {round + 1} of 2 · Objective 1.4</p>

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {left.map((p, i) => {
                  const q = right[i];
                  return (
                    <React.Fragment key={p.id}>
                      <MatchTile label={p.port} mono state={state(p.id, "port")} onClick={() => tap("port", p.id)} />
                      <MatchTile label={q.proto} state={state(q.id, "proto")} onClick={() => tap("proto", q.id)} />
                    </React.Fragment>
                  );
                })}
              </div>

              <p className="mt-5 min-h-[44px] px-1 text-callout font-semibold text-ink" role="status" aria-live="polite">
                {note}
              </p>
            </Page>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );

  function state(id: string, side: "port" | "proto") {
    if (done.has(id)) return "done" as const;
    if (wrong && (wrong.a === id || wrong.b === id)) return "wrong" as const;
    if (sel?.id === id && sel.side === side) return "sel" as const;
    return "idle" as const;
  }
}

function MatchTile({ label, state, onClick, mono }: { label: string; state: "idle" | "sel" | "done" | "wrong"; onClick: () => void; mono?: boolean }) {
  return (
    <m.button
      type="button"
      onClick={onClick}
      disabled={state === "done"}
      aria-pressed={state === "sel"}
      animate={state === "wrong" ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "flex h-[64px] items-center justify-center gap-2 rounded-2xl border-2 border-b-4 px-2 text-[18px] font-extrabold transition-[background,border-color,opacity] active:translate-y-[2px] active:border-b-2",
        mono && "num",
        state === "idle" && "border-[color-mix(in_oklab,var(--ink)_12%,transparent)] bg-surf text-ink",
        state === "sel" && "border-tint bg-tint-soft text-tint",
        state === "done" && "border-transparent bg-good-soft text-good",
        state === "wrong" && "border-bad bg-bad-soft text-bad",
      )}
    >
      {state === "done" ? <Check className="size-[18px]" strokeWidth={3} /> : null}
      {state === "wrong" ? <X className="size-[18px]" strokeWidth={3} /> : null}
      {label}
    </m.button>
  );
}

function Results({ result, best, onAgain }: { result: { time: number | null; missed: string[]; newBest: boolean }; best: number | null; onAgain: () => void }) {
  const right = 12 - result.missed.length;
  return (
    <Page className="!pb-12 pt-4">
      {result.newBest ? (
        <p className="inline-flex h-9 items-center gap-1.5 rounded-full bg-tint-soft px-3.5 text-callout font-bold text-tint">
          <Trophy className="size-[18px]" /> New personal best
        </p>
      ) : null}
      <h1 className="mt-3 text-display font-extrabold text-ink">
        <span className="num">{right}</span> of 12 first try
      </h1>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <Card className="p-4">
          <p className="text-footnote font-bold text-ink-2">Time</p>
          <p className="num mt-1 text-title font-extrabold text-ink">{result.time != null ? formatTime(result.time) : "Off"}</p>
        </Card>
        <Card className="p-4">
          <p className="text-footnote font-bold text-ink-2">Personal best</p>
          <p className="num mt-1 text-title font-extrabold text-ink">{best != null ? formatTime(best) : "None yet"}</p>
        </Card>
      </div>
      <p className="mt-3 px-1 text-footnote text-ink-2">A best counts when every pair is right first time with the timer on.</p>

      {result.missed.length ? (
        <Card className="mt-5 p-5">
          <h2 className="text-headline font-bold text-ink">Mixed up this time</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {result.missed.map((id) => {
              const p = PORTS.find((x) => x.id === id)!;
              return (
                <li key={id} className="flex items-baseline gap-3 text-body text-ink">
                  <span className="num w-[68px] flex-none font-extrabold">{p.port}</span>
                  <span>
                    <span className="font-bold">{p.proto}</span> <span className="text-ink-2">· {p.use}</span>
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-footnote text-ink-2">These come first next time, and wait in Review.</p>
        </Card>
      ) : null}

      <div className="mt-6 grid gap-2.5">
        <Btn variant="tint" onClick={onAgain}>
          <RotateCcw /> Play again
        </Btn>
        <Btn variant="ghost" onClick={() => go("/practice")}>
          Done
        </Btn>
      </div>
    </Page>
  );
}

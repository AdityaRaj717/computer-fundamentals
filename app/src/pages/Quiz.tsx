import * as React from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ArrowRight, Check, CircleCheckBig, CircleX, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LAYER_NAMES, PRACTICE_1041, TICKETS, type Question } from "@/app/content";
import { go } from "@/app/router";
import { actions } from "@/app/store";
import { Bar, Btn, Card, EASE, ObjChip, Page } from "@/components/app/ui";
import { FigureBoundary } from "@/components/app/figure-preview";
import { NotFound } from "./NotFound";
import type { OsiHandle } from "@/figures/osi/figure";
import type { LayerNo, Phase } from "@/figures/osi/model";

// Practice for a ticket: the same top bar, prompt, dock and feedback band as the lesson.
// Every question carries its objective (FR-008). A wrong figure answer replays on the figure (FR-009).

const OsiFigure = React.lazy(() => import("@/figures/osi/figure").then((mod) => ({ default: mod.OsiFigure })));

const rise = { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" }, transition: { type: "spring", stiffness: 420, damping: 38 } } as const;
const swap = { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -16 }, transition: { duration: 0.26, ease: EASE } };

type Result = { id: string; right: boolean };

export function Quiz({ no }: { no: string }) {
  const t = TICKETS.find((x) => x.no === no && x.ready);
  const [index, setIndex] = React.useState(0);
  const [results, setResults] = React.useState<Result[]>([]);
  if (!t) return <NotFound />;
  const questions = PRACTICE_1041;
  const q = questions[index];
  const finished = index >= questions.length;

  const record = (question: Question, right: boolean) => {
    setResults((now) => (now.some((r) => r.id === question.id) ? now : [...now, { id: question.id, right }]));
    actions.answer(question.id, question.obj, right, { title: question.review, obj: question.obj, from: `Ticket ${t.no} practice` });
  };

  return (
    <div data-obj={t.obj} className="flex min-h-dvh flex-col bg-[var(--bg)]">
      <header className="mx-auto flex h-[60px] w-full max-w-[720px] flex-none items-center gap-3 px-3 pt-[env(safe-area-inset-top)]">
        <button type="button" onClick={() => go("/practice")} aria-label="Close practice" className="grid size-11 flex-none place-items-center rounded-full text-ink hover:bg-surf-2">
          <X className="size-6" strokeWidth={2.4} />
        </button>
        <Bar value={finished ? 1 : (index + 0.4) / questions.length} className="flex-1" label="Practice progress" />
        <span className="num flex-none pr-2 text-callout font-bold text-ink-2">
          {Math.min(index + 1, questions.length)}/{questions.length}
        </span>
      </header>

      <AnimatePresence mode="wait" initial={false}>
        {finished ? (
          <m.div key="summary" {...swap} className="flex-1">
            <Summary results={results} questions={questions} onAgain={() => { setIndex(0); setResults([]); }} />
          </m.div>
        ) : q.kind === "place" ? (
          <m.div key={q.id} {...swap} className="flex flex-1 flex-col">
            <PlaceQuestion q={q} onChecked={(right) => record(q, right)} onNext={() => setIndex(index + 1)} />
          </m.div>
        ) : (
          <m.div key={q.id} {...swap} className="flex flex-1 flex-col">
            <ChooseQuestion q={q} onChecked={(right) => record(q, right)} onNext={() => setIndex(index + 1)} />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Prompt({ q }: { q: Question }) {
  return (
    <div className="px-5 pb-3 pt-1">
      <ObjChip obj={q.obj} />
      <h1 className="mt-2.5 text-balance text-[23px] font-extrabold leading-[1.18] tracking-[-0.02em] text-ink">{q.prompt}</h1>
    </div>
  );
}

/* ------------------------------------------------------------------ choose (with optional figure) */

function ChooseQuestion({ q, onChecked, onNext }: { q: Extract<Question, { kind: "choose" }>; onChecked: (right: boolean) => void; onNext: () => void }) {
  const fig = React.useRef<OsiHandle>(null);
  const [pick, setPick] = React.useState<number | null>(null);
  const [phase, setPhase] = React.useState<"choose" | "playing" | "result">("choose");
  const right = pick === q.answer;

  const check = () => {
    if (pick == null) return;
    if (!q.figure) {
      onChecked(pick === q.answer);
      setPhase("result");
      return;
    }
    onChecked(pick === q.answer);
    setPhase("playing");
    fig.current?.reset();
    fig.current?.send({ watch: pick as LayerNo });
  };

  const replay = () => {
    setPhase("playing");
    fig.current?.reset();
    fig.current?.send({ watch: pick as LayerNo });
  };

  const onSendDone = React.useCallback((p: Phase) => {
    if (p) setPhase("result");
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-[720px] flex-1 flex-col">
      <Prompt q={q} />
      {q.figure ? (
        <section className="min-h-[300px] flex-1 px-2" aria-label="Figure">
          <FigureBoundary fallbackText="The printer’s IP is wrong, so the job crosses the cable but stops at layer 3, Network.">
            <React.Suspense fallback={<div className="skeleton h-full min-h-[300px] rounded-[28px]" />}>
              <OsiFigure ref={fig} variant="stage" fault="ip" hint={phase === "playing" ? "Watch the lift" : "Tap a drawer"} onSendDone={onSendDone} />
            </React.Suspense>
          </FigureBoundary>
        </section>
      ) : (
        <div className="flex-1" />
      )}

      <div className="relative min-h-[176px]">
        <AnimatePresence mode="popLayout" initial={false}>
          {phase !== "result" ? (
            <m.div key="dock" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-3 px-5 pb-[max(16px,env(safe-area-inset-bottom))] pt-3">
              <div className={cn("grid gap-2", q.figure ? "grid-cols-4" : "grid-cols-1")} role="radiogroup" aria-label="Answers">
                {q.options.map((option) =>
                  q.figure ? (
                    <Tile key={option.value} on={pick === option.value} disabled={phase === "playing"} onPick={() => setPick(option.value)} big={String(option.value)} small={LAYER_NAMES[option.value]} />
                  ) : (
                    <OptionRow key={option.value} on={pick === option.value} onPick={() => setPick(option.value)} label={option.label} />
                  ),
                )}
              </div>
              {phase === "playing" ? (
                <p className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-tint-soft text-[15px] font-semibold text-tint" role="status">
                  <span className="size-2 animate-pulse rounded-full bg-tint" /> Playing your answer on the figure…
                </p>
              ) : (
                <Btn variant="tint" onClick={check} disabled={pick == null}>
                  {pick == null ? "Pick an answer" : q.figure ? "Play it" : "Check"}
                </Btn>
              )}
            </m.div>
          ) : (
            <Band key="band" right={right} title={right ? q.why : q.wrong(`${pick}, ${LAYER_NAMES[pick ?? 1]}`)} body={right ? undefined : q.why} onNext={onNext} onReplay={q.figure ? replay : undefined} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ place faults on layers (tap a fault, tap a layer) */

function PlaceQuestion({ q, onChecked, onNext }: { q: Extract<Question, { kind: "place" }>; onChecked: (right: boolean) => void; onNext: () => void }) {
  const [at, setAt] = React.useState<Record<string, number>>({});
  const [sel, setSel] = React.useState<string | null>(null);
  const [checked, setChecked] = React.useState(false);
  const all = q.faults.every((f) => at[f.id] != null);
  const right = q.faults.every((f) => at[f.id] === f.layer);

  const place = (layer: number) => {
    if (!sel || checked) return;
    setAt((now) => ({ ...now, [sel]: layer }));
    setSel(null);
  };

  return (
    <div className="mx-auto flex w-full max-w-[720px] flex-1 flex-col">
      <Prompt q={q} />
      <div className="flex-1 px-4">
        <ul className="flex flex-col gap-2.5" aria-label="Layers">
          {q.layers.map((layer) => {
            const here = q.faults.filter((f) => at[f.id] === layer);
            return (
              <li key={layer}>
                <div
                  role={sel ? "button" : undefined}
                  tabIndex={sel ? 0 : -1}
                  aria-label={sel ? `Put it on layer ${layer}, ${LAYER_NAMES[layer]}` : undefined}
                  onClick={() => place(layer)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), place(layer))}
                  className={cn(
                    "sq flex min-h-[72px] items-center gap-3 rounded-xl bg-surf p-3 shadow-card transition-[box-shadow,background]",
                    sel && "cursor-pointer ring-2 ring-[color-mix(in_oklab,var(--accent)_45%,transparent)] hover:bg-tint-soft",
                  )}
                >
                  <span className="num grid size-12 flex-none place-items-center rounded-[14px] bg-tint-soft text-[20px] font-extrabold text-tint">{layer}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-callout font-bold text-ink">{LAYER_NAMES[layer]}</span>
                    <span className="mt-1 flex flex-wrap gap-1.5">
                      {here.map((f) => {
                        const ok = f.layer === layer;
                        return (
                          <button
                            key={f.id}
                            type="button"
                            disabled={checked}
                            onClick={(e) => {
                              e.stopPropagation();
                              setAt((now) => {
                                const next = { ...now };
                                delete next[f.id];
                                return next;
                              });
                              setSel(f.id);
                            }}
                            className={cn(
                              "inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-footnote font-bold",
                              !checked && "bg-ink text-bg",
                              checked && ok && "bg-good-soft text-good",
                              checked && !ok && "bg-bad-soft text-bad line-through",
                            )}
                          >
                            {checked ? ok ? <Check className="size-4" strokeWidth={3} /> : <X className="size-4" strokeWidth={3} /> : null}
                            {f.label}
                          </button>
                        );
                      })}
                      {!here.length ? <span className="text-footnote text-ink-2">{sel ? "Tap to put it here" : "Empty"}</span> : null}
                    </span>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        {!checked ? (
          <div className="mt-4">
            <p className="mb-2 px-1 text-callout font-bold text-ink">{all ? "All placed" : "Tap a fault, then tap its layer"}</p>
            <div className="flex flex-wrap gap-2">
              {q.faults
                .filter((f) => at[f.id] == null)
                .map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={sel === f.id}
                    onClick={() => setSel(sel === f.id ? null : f.id)}
                    className={cn(
                      "min-h-12 rounded-full border-2 border-b-4 px-4 text-callout font-bold transition-[background,border-color,transform] active:translate-y-[2px] active:border-b-2",
                      sel === f.id ? "border-tint bg-tint-soft text-tint" : "border-[color-mix(in_oklab,var(--ink)_12%,transparent)] bg-surf text-ink",
                    )}
                  >
                    {f.label}
                  </button>
                ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="relative mt-4 min-h-[100px]">
        <AnimatePresence mode="popLayout" initial={false}>
          {!checked ? (
            <m.div key="dock" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-5 pb-[max(16px,env(safe-area-inset-bottom))] pt-3">
              <Btn
                variant="tint"
                disabled={!all}
                onClick={() => {
                  setChecked(true);
                  onChecked(right);
                }}
              >
                Check
              </Btn>
            </m.div>
          ) : (
            <Band
              key="band"
              right={right}
              title={right ? "All three in the right drawer." : "Some faults are on the wrong layer."}
              body={right ? "Cable is physical, the IP address is network, and a crashed service is application." : "Cable unplugged is layer 1, a wrong IP is layer 3, and a crashed print service is layer 7."}
              onNext={onNext}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ shared pieces */

function Tile({ on, disabled, onPick, big, small }: { on: boolean; disabled?: boolean; onPick: () => void; big: string; small: string }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={on}
      aria-label={`Layer ${big}, ${small}`}
      disabled={disabled}
      onClick={onPick}
      className={cn(
        "flex h-[68px] flex-col items-center justify-center gap-0.5 rounded-2xl border-2 border-b-4 px-1 transition-[background,border-color,transform] duration-150 active:translate-y-[2px] active:border-b-2",
        on ? "border-tint bg-tint-soft text-tint" : "border-[color-mix(in_oklab,var(--ink)_12%,transparent)] bg-surf text-ink",
      )}
    >
      <span className="num text-[22px] font-extrabold leading-none">{big}</span>
      <span className={cn("max-w-full truncate text-[12.5px] font-semibold leading-tight", on ? "text-tint" : "text-ink-2")}>{small}</span>
    </button>
  );
}

function OptionRow({ on, onPick, label }: { on: boolean; onPick: () => void; label: string }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={on}
      onClick={onPick}
      className={cn(
        "flex min-h-[60px] items-center gap-3 rounded-2xl border-2 border-b-4 px-4 text-left text-body font-bold transition-[background,border-color,transform] active:translate-y-[2px] active:border-b-2",
        on ? "border-tint bg-tint-soft text-tint" : "border-[color-mix(in_oklab,var(--ink)_12%,transparent)] bg-surf text-ink",
      )}
    >
      <span className={cn("grid size-6 flex-none place-items-center rounded-full border-2", on ? "border-tint bg-tint text-on-tint" : "border-[color-mix(in_oklab,var(--ink)_25%,transparent)]")}>
        {on ? <Check className="size-3.5" strokeWidth={3.5} /> : null}
      </span>
      {label}
    </button>
  );
}

function Band({ right, title, body, onNext, onReplay }: { right: boolean; title: string; body?: string; onNext: () => void; onReplay?: () => void }) {
  return (
    <m.div {...rise} className={cn("band", right ? "band--good" : "band--bad")} role="status">
      <div className="mx-auto max-w-[680px]">
        <div className="flex items-center gap-2.5">
          {right ? <CircleCheckBig className="size-7 flex-none text-good" strokeWidth={2.4} /> : <CircleX className="size-7 flex-none text-bad" strokeWidth={2.4} />}
          <p className={cn("text-[18px] font-extrabold leading-tight", right ? "text-good" : "text-bad")}>{right ? "Right!" : "Not quite"}</p>
        </div>
        <p className="mt-2 text-[15.5px] font-bold leading-snug text-ink">{title}</p>
        {body ? <p className="mt-1 text-[14.5px] leading-[1.45] text-ink-2">{body}</p> : null}
        <div className="mt-4 flex gap-2.5">
          {onReplay ? (
            <button type="button" onClick={onReplay} aria-label="Replay on the figure" className="grid size-14 flex-none place-items-center rounded-2xl bg-surf/70 text-ink hover:bg-surf">
              <RotateCcw className="size-5" />
            </button>
          ) : null}
          <Btn variant={right ? "tint" : "danger"} onClick={onNext}>
            Continue
          </Btn>
        </div>
      </div>
    </m.div>
  );
}

function Summary({ results, questions, onAgain }: { results: Result[]; questions: Question[]; onAgain: () => void }) {
  const right = results.filter((r) => r.right).length;
  const missed = results.length - right;
  return (
    <Page className="!pb-12 pt-4">
      <h1 className="text-display font-extrabold text-ink">
        <span className="num">{right}</span> of {questions.length} right first time
      </h1>
      <p className="mt-2 text-body text-ink-2">{missed ? `${missed === 1 ? "The one you missed is" : `The ${missed} you missed are`} in Review, so they come back later.` : "Nothing to review. That layer stack is sticking."}</p>
      <Card className="mt-6 overflow-hidden">
        <ul>
          {questions.map((q, i) => {
            const r = results.find((x) => x.id === q.id);
            return (
              <li key={q.id} className="relative flex min-h-[64px] items-center gap-3 px-4 py-3 [&+&]:before:absolute [&+&]:before:left-4 [&+&]:before:right-0 [&+&]:before:top-0 [&+&]:before:h-px [&+&]:before:bg-[var(--line)]">
                <span className={cn("grid size-8 flex-none place-items-center rounded-full", r?.right ? "bg-good-soft text-good" : "bg-bad-soft text-bad")}>
                  {r?.right ? <Check className="size-4" strokeWidth={3} /> : <X className="size-4" strokeWidth={3} />}
                </span>
                <span className="min-w-0 flex-1 text-callout text-ink">
                  <span className="font-bold">Q{i + 1}.</span> {q.prompt}
                </span>
                <span className="sr-only">{r?.right ? "right" : "missed"}</span>
              </li>
            );
          })}
        </ul>
      </Card>
      <div className="mt-6 grid gap-2.5">
        <Btn variant="tint" onClick={() => go("/practice/ports")}>
          Try the Port Match drill <ArrowRight />
        </Btn>
        <Btn variant="secondary" onClick={onAgain}>
          <RotateCcw /> Go again
        </Btn>
        <Btn variant="ghost" onClick={() => go("/")}>
          Back to Today
        </Btn>
      </div>
    </Page>
  );
}

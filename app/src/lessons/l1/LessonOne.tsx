import * as React from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Flag, Hand, Plug, RotateCcw, Send, X, XCircle } from "lucide-react";
import { go } from "@/app/router";
import { actions, getState } from "@/app/store";
import { ReportSheet } from "@/components/app/parts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OsiFigure, type OsiHandle } from "@/figures/osi/figure";
import { layer, type LayerNo, type Phase } from "@/figures/osi/model";
import { CLOSE, CLOSED, EXPLAIN, PREDICT, TICKET } from "./content";

// Layout (from Duolingo, Sololearn, Impulse and Elevate on Lazyweb): the question sits at the top, the figure
// fills the middle, the answers and one pinned button form a dock at the bottom, and feedback slides up from
// the bottom as a tinted band with the reason and a big Continue.

type Step = 0 | 1 | 2 | 3;
type PredictPhase = "choose" | "playing" | "result";
type ClosePhase = "plug" | "send" | "sending" | "printed";

const STEPS = 3;
const EASE = [0.32, 0.72, 0, 1] as const;
const swap = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 }, transition: { duration: 0.24, ease: EASE } };
const rise = { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" }, transition: { type: "spring", stiffness: 420, damping: 38 } } as const;

export function LessonOne() {
  const fig = React.useRef<OsiHandle>(null);
  // Resume where the learner left off (spec edge case: leaving mid-lesson).
  const [step, setStep] = React.useState<Step>(() => Math.min(2, getState().steps["1041"] ?? 0) as Step);
  const [report, setReport] = React.useState(false);
  const [pick, setPick] = React.useState<LayerNo | null>(null);
  const [predict, setPredict] = React.useState<PredictPhase>("choose");
  const [close, setClose] = React.useState<ClosePhase>("plug");
  const stepRef = React.useRef(step);
  stepRef.current = step;

  React.useEffect(() => {
    if (step === 3) actions.close("1041");
    else actions.step("1041", step);
  }, [step]);

  // Each step sets the machine up the way its words describe.
  React.useEffect(() => {
    const f = fig.current;
    if (!f || step === 3) return; // the closed ticket keeps its printed receipt on show
    f.reset();
    if (step === 0) f.setCable(true);
    if (step === 1) {
      f.setCable(false);
      setPick(null);
      setPredict("choose");
    }
    if (step === 2) {
      f.setCable(false);
      setClose("plug");
    }
  }, [step]);

  const onSendDone = React.useCallback((phase: Phase) => {
    if (stepRef.current === 1 && phase === "stopped") setPredict("result");
    if (stepRef.current === 2) setClose(phase === "printed" ? "printed" : "plug");
  }, []);

  const onCable = React.useCallback((plugged: boolean) => {
    if (stepRef.current === 2) setClose(plugged ? "send" : "plug");
  }, []);

  const onSend = React.useCallback(() => {
    if (stepRef.current === 2) setClose((now) => (now === "send" ? "sending" : now));
  }, []);

  const choose = (n: LayerNo) => {
    setPick(n);
    fig.current?.pick(n);
  };

  const play = () => {
    if (pick == null) return;
    setPredict("playing");
    fig.current?.setCable(false);
    fig.current?.send({ watch: pick });
  };

  const back = () => setStep((now) => (now > 0 ? ((now - 1) as Step) : now));

  const hint = step === 2 && close === "plug" ? "Tap the plug" : step === 2 && close === "send" ? "Tap the job on the lift" : step === 1 ? "Tap a drawer to look inside" : "Tap a drawer";

  return (
    <div className="lesson h-dvh overflow-hidden bg-[var(--bg)]" data-obj="o11">
      <div className="lesson-grid mx-auto h-full max-w-[1180px]">
        {/* top bar */}
        <header className="[grid-area:top] flex h-[52px] items-center gap-3 px-4 lg:h-auto lg:px-0 lg:pt-6">
          <button
            type="button"
            onClick={() => go(step === 3 ? "/lesson/1041/done" : "/ticket/1041")}
            className="grid size-11 flex-none place-items-center rounded-full text-ink transition-[opacity,background] hover:bg-surf-2"
            aria-label="Close the lesson (your step is saved)"
            title="Close (your step is saved)"
          >
            <X className="size-[24px]" strokeWidth={2.4} />
          </button>
          <div className="flex flex-1 gap-1.5" aria-hidden="true">
            {Array.from({ length: STEPS }, (_, index) => (
              <span key={index} className="h-2 flex-1 overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--accent)_12%,var(--surf-2))]">
                <m.span
                  className="block h-full rounded-full bg-tint"
                  initial={false}
                  animate={{ width: step > index || step === 3 ? "100%" : step === index ? "40%" : "0%" }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setReport(true)}
            className="grid size-11 flex-none place-items-center rounded-full text-ink-2 transition-colors hover:bg-surf-2 hover:text-ink"
            aria-label="Report an error on this step"
            title="Report an error"
          >
            <Flag className="size-5" strokeWidth={2.2} />
          </button>
          <TicketChip />
        </header>
        <ReportSheet open={report} onOpenChange={setReport} where={`ticket ${TICKET.no}, step ${Math.min(step + 1, 3)} of ${STEPS}`} />

        {/* the question or the step's headline */}
        <div className="[grid-area:head] px-5 pb-3 pt-1 lg:px-0 lg:pb-0 lg:pt-0">
          <AnimatePresence mode="wait" initial={false}>
            <m.div key={`head-${step}`} {...swap}>
              {step === 0 && (
                <>
                  <Kicker>
                    Ticket {TICKET.no} · from {TICKET.from}
                  </Kicker>
                  <Title>{EXPLAIN.title}</Title>
                </>
              )}
              {step === 1 && (
                <>
                  <Kicker>{PREDICT.kicker}</Kicker>
                  <Title>{PREDICT.title}</Title>
                </>
              )}
              {step === 2 && (
                <>
                  <Kicker tone="tint">{CLOSE.kicker}</Kicker>
                  <Title>{CLOSE.title}</Title>
                </>
              )}
              {step === 3 && (
                <>
                  <Kicker tone="tint">Objective {TICKET.objective}</Kicker>
                  <Title>{CLOSED.title}</Title>
                </>
              )}
            </m.div>
          </AnimatePresence>
        </div>

        {/* the figure fills the middle */}
        <section className="[grid-area:stage] min-h-0 px-2 lg:px-0" aria-label="Figure">
          <OsiFigure ref={fig} variant="stage" tour={step === 0} hint={hint} onSendDone={onSendDone} onCable={onCable} onSend={onSend} />
        </section>

        {/* the dock: answers and one pinned button, or the feedback band */}
        <div className="[grid-area:dock] relative min-h-[168px] lg:min-h-0">
          <AnimatePresence mode="popLayout" initial={false}>
            {step === 0 && (
              <Dock key="explain">
                <p className="text-[15.5px] leading-[1.45] text-ink-2">{EXPLAIN.body}</p>
                <Cta onClick={() => setStep(1)}>Next</Cta>
              </Dock>
            )}

            {step === 1 && predict !== "result" && (
              <Dock key="predict">
                <div className="grid grid-cols-4 gap-2" role="radiogroup" aria-label="Layer that fails first">
                  {PREDICT.options.map((n) => (
                    <LayerTile key={n} n={n} on={pick === n} disabled={predict === "playing"} onPick={() => choose(n)} />
                  ))}
                </div>
                {predict === "playing" ? (
                  <p className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-tint-soft px-4 py-2 text-center text-[15px] font-semibold text-tint" role="status">
                    <span className="size-2 animate-pulse rounded-full bg-tint" />
                    {PREDICT.playing}
                  </p>
                ) : (
                  <div className="flex gap-2.5">
                    <BackStep onClick={back} />
                    <div className="min-w-0 flex-1">
                      <Cta onClick={play} disabled={pick == null}>
                        {pick == null ? "Pick a layer" : `Play it with layer ${pick}`}
                      </Cta>
                    </div>
                  </div>
                )}
              </Dock>
            )}

            {step === 1 && predict === "result" && pick != null && <Feedback key="feedback" pick={pick} onReplay={play} onNext={() => setStep(2)} />}

            {step === 2 && (
              <Dock key="close">
                <AnimatePresence mode="wait" initial={false}>
                  <m.p key={close} {...swap} className="flex items-start gap-2.5 text-[15.5px] leading-[1.45] text-ink" role="status">
                    {close === "printed" ? (
                      <CheckCircle2 className="mt-0.5 size-5 flex-none text-good" />
                    ) : (
                      <Hand className="mt-0.5 size-5 flex-none text-tint" strokeWidth={2.2} />
                    )}
                    <span>{close === "plug" ? CLOSE.plugIn : close === "send" ? CLOSE.send : close === "sending" ? CLOSE.sending : CLOSE.printed}</span>
                  </m.p>
                </AnimatePresence>
                {close === "printed" ? (
                  <Cta onClick={() => setStep(3)}>Close ticket {TICKET.no}</Cta>
                ) : close === "plug" ? (
                  <div className="flex gap-2.5">
                    <BackStep onClick={back} />
                    <div className="min-w-0 flex-1">
                      <Cta variant="secondary" onClick={() => fig.current?.setCable(true)}>
                        <Plug className="size-5" /> Plug it in for me
                      </Cta>
                    </div>
                  </div>
                ) : (
                  <Cta
                    onClick={() => {
                      setClose("sending");
                      fig.current?.send();
                    }}
                    disabled={close === "sending"}
                  >
                    <Send className="size-5" /> Send a test page
                  </Cta>
                )}
              </Dock>
            )}

            {step === 3 && (
              <m.div key="closed" {...rise} className="band band--good">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 flex-none place-items-center rounded-full bg-tint text-white">
                    <Check className="size-6" strokeWidth={2.8} />
                  </span>
                  <p className="text-[17px] font-extrabold leading-tight text-ink">Fixed: Jo can print again.</p>
                </div>
                <p className="mt-2 text-[15px] leading-[1.45] text-ink-2">{CLOSED.body}</p>
                <p className="mt-2 text-[12.5px] leading-snug text-ink-2/80">{CLOSE.note}</p>
                <div className="mt-4">
                  <Cta onClick={() => go("/lesson/1041/done")}>
                    See your wrap-up <ArrowRight className="size-5" />
                  </Cta>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/** Step back, beside the main button (FR-002: forward, back and replay). */
function BackStep({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="secondary"
      onClick={onClick}
      aria-label="Back one step"
      className="size-14 flex-none rounded-2xl bg-surf p-0 shadow-[inset_0_0_0_2px_color-mix(in_oklab,var(--ink)_12%,transparent),inset_0_-4px_0_color-mix(in_oklab,var(--ink)_10%,transparent)] hover:bg-surf-2"
    >
      <ArrowLeft className="size-5" strokeWidth={2.4} />
    </Button>
  );
}

function TicketChip() {
  return (
    <span className="flex flex-none items-center gap-1.5 rounded-full bg-surf py-1 pl-1 pr-2.5 shadow-[0_0_0_1px_var(--line)]" title={`${TICKET.from}, ${TICKET.role} at Brew & Byte`}>
      <span className="grid size-6 place-items-center rounded-full bg-tint-soft text-[10px] font-extrabold tracking-wide text-tint" aria-hidden="true">
        {TICKET.initials}
      </span>
      <span className="text-[12.5px] font-bold tabular-nums text-ink">#{TICKET.no}</span>
    </span>
  );
}

function Kicker({ children, tone }: { children: React.ReactNode; tone?: "tint" }) {
  return <p className={cn("text-callout font-bold", tone === "tint" ? "text-tint" : "text-ink-2")}>{children}</p>;
}

function Title({ children }: { children: React.ReactNode }) {
  return <h1 className="mt-1 text-balance text-[23px] font-extrabold leading-[1.18] tracking-[-0.02em] text-ink lg:text-[30px]">{children}</h1>;
}

function Dock({ children }: { children: React.ReactNode }) {
  return (
    <m.div {...swap} className="flex flex-col gap-3 px-5 pb-[max(16px,env(safe-area-inset-bottom))] pt-3 lg:px-0 lg:pt-6">
      {children}
    </m.div>
  );
}

/** One layer as a tactile tile: the digit big, the name small, a thicker bottom edge you press into. */
function LayerTile({ n, on, disabled, onPick }: { n: LayerNo; on: boolean; disabled: boolean; onPick: () => void }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={on}
      aria-label={`Layer ${n}, ${layer(n).name}`}
      disabled={disabled}
      onClick={onPick}
      className={cn(
        "flex h-[68px] flex-col items-center justify-center gap-0.5 rounded-2xl border-2 border-b-4 px-1 transition-[background,border-color,transform] duration-150 active:translate-y-[2px] active:border-b-2 disabled:active:translate-y-0",
        on ? "border-tint bg-tint-soft text-tint" : "border-[color-mix(in_oklab,var(--ink)_12%,transparent)] bg-surf text-ink",
      )}
    >
      <span className="text-[22px] font-extrabold leading-none tabular-nums">{n}</span>
      <span className={cn("max-w-full truncate text-[11.5px] font-semibold leading-tight", on ? "text-tint" : "text-ink-2")}>{layer(n).name}</span>
    </button>
  );
}

function Cta({ children, variant = "default", className, ...rest }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant={variant}
      className={cn(
        "h-14 w-full rounded-2xl text-[17px] font-bold tracking-[-0.01em] shadow-none transition-[transform,background] active:translate-y-[1px] [&_svg:not([class*='size-'])]:size-5",
        variant === "default" &&
          "shadow-[inset_0_-3px_0_rgba(0,0,0,0.22)] hover:bg-primary/92 disabled:bg-[color-mix(in_oklab,var(--ink)_10%,var(--surf-2))] disabled:text-ink-2 disabled:opacity-100 disabled:shadow-none",
        variant === "secondary" &&
          "bg-surf shadow-[inset_0_0_0_2px_color-mix(in_oklab,var(--ink)_12%,transparent),inset_0_-4px_0_color-mix(in_oklab,var(--ink)_12%,transparent)] hover:bg-surf-2",
        className,
      )}
      {...rest}
    >
      {children}
    </Button>
  );
}

function Feedback({ pick, onReplay, onNext }: { pick: LayerNo; onReplay: () => void; onNext: () => void }) {
  const right = pick === 1;
  const words = right ? PREDICT.right : PREDICT.wrong(layer(pick).name, pick);
  return (
    <m.div {...rise} className={cn("band", right ? "band--good" : "band--bad")} role="status">
      <div className="flex items-center gap-2.5">
        {right ? <CheckCircle2 className="size-7 flex-none text-good" strokeWidth={2.4} /> : <XCircle className="size-7 flex-none text-bad" strokeWidth={2.4} />}
        <p className={cn("text-[18px] font-extrabold leading-tight", right ? "text-good" : "text-bad")}>{right ? "Right!" : "Not quite"}</p>
      </div>
      <p className="mt-2 text-[15.5px] font-bold leading-snug text-ink">{words.title}</p>
      <p className="mt-1 text-[14.5px] leading-[1.45] text-ink-2">{words.body}</p>
      <div className="mt-4 flex gap-2.5">
        <Button variant="secondary" onClick={onReplay} className="size-14 flex-none rounded-2xl bg-surf/70 p-0 text-ink hover:bg-surf" aria-label="Replay on the figure">
          <RotateCcw className="size-5" />
        </Button>
        <div className="min-w-0 flex-1">
          <Cta onClick={onNext} className={right ? "" : "bg-bad hover:bg-bad/92"}>
            Continue
          </Cta>
        </div>
      </div>
    </m.div>
  );
}

import * as React from "react";
import { ArrowRight, Check, Dumbbell, Repeat } from "lucide-react";
import { cn } from "@/lib/utils";
import { MODULE, OBJECTIVES, TICKETS, PRACTICE_1041, type Ticket } from "@/app/content";
import { FigurePreview } from "@/components/app/figure-preview";
import { go } from "@/app/router";
import { statusOf, useStore, type State } from "@/app/store";
import { Bar, Btn, Card, CardButton, LargeTitle, Page, Section } from "@/components/app/ui";
import { EmailSheet, ObjTile, Sender, StatusMark } from "@/components/app/parts";
import { ProfileButton } from "@/components/app/shell";

// Today is a short plan, not a feed (Codecademy Go, Elevate): one hero card for the next thing to do,
// then review and a drill. No streak pressure.

type Next =
  | { kind: "ticket"; t: Ticket; step: number }
  | { kind: "practice"; t: Ticket }
  | { kind: "soon"; t: Ticket };

function nextUp(s: State): Next {
  const l1 = TICKETS[0];
  if (!s.closed["1041"]) return { kind: "ticket", t: l1, step: s.steps["1041"] ?? 0 };
  const practised = PRACTICE_1041.every((q) => s.answers[q.id]);
  if (!practised) return { kind: "practice", t: l1 };
  return { kind: "soon", t: TICKETS[1] };
}

export function Today() {
  const s = useStore((x) => x);
  const next = nextUp(s);
  const [mail, setMail] = React.useState(false);

  return (
    <Page>
      <LargeTitle title="Your first week" right={<ProfileButton />} />

      <WeekStrip s={s} />

      <div className="mt-5">
        {next.kind === "ticket" ? (
          <HeroTicket t={next.t} step={next.step} />
        ) : next.kind === "practice" ? (
          <HeroPractice t={next.t} />
        ) : (
          <HeroSoon t={next.t} onMail={() => setMail(true)} />
        )}
      </div>

      <Section title="Also today">
        <div className="grid gap-3 sm:grid-cols-2">
          <CardButton onClick={() => go("/practice")} className="p-5" label={`Review, ${s.review.length} cards`}>
            <span className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-[15px] bg-surf-2 text-ink">
                <Repeat className="size-6" strokeWidth={2.2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-headline font-bold text-ink">Review</span>
                <span className="block text-callout text-ink-2">
                  {s.review.length ? `${s.review.length} ${s.review.length === 1 ? "card" : "cards"} to look at again` : "Nothing yet. Misses come back here."}
                </span>
              </span>
            </span>
          </CardButton>
          <CardButton onClick={() => go("/practice/ports")} obj="o14" className="p-5" label="Port Match drill">
            <span className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-[15px] bg-tint-soft text-tint">
                <Dumbbell className="size-6" strokeWidth={2.2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-headline font-bold text-ink">Port Match</span>
                <span className="block text-callout text-ink-2">12 ports · about 2 minutes</span>
              </span>
            </span>
          </CardButton>
        </div>
      </Section>

      <p className="mt-8 px-1 text-footnote text-ink-2">Brew &amp; Byte and its staff are made up for these lessons. Last reviewed {MODULE.reviewed}.</p>
      <EmailSheet open={mail} onOpenChange={setMail} />
    </Page>
  );
}

/** The week as four story days, each with its ticket's status (FR-012). */
function WeekStrip({ s }: { s: State }) {
  return (
    <ol className="grid grid-cols-4 gap-2" aria-label="This week’s tickets">
      {TICKETS.map((t) => {
        const status = statusOf(s, t.no, t.ready);
        const current = status === "ready" || status === "progress";
        return (
          <li key={t.no}>
            <button
              type="button"
              onClick={() => go(`/ticket/${t.no}`)}
              data-obj={t.obj}
              aria-label={`${t.dayLong}, ticket ${t.no}: ${status === "closed" ? "closed" : status === "soon" ? "opens soon" : status === "progress" ? "in progress" : "ready"}`}
              className={cn(
                "sq flex h-[76px] w-full flex-col items-center justify-center gap-1.5 rounded-[20px] transition-transform active:scale-95",
                current ? "bg-surf shadow-card ring-2 ring-tint" : "bg-surf/60",
              )}
            >
              <span className={cn("text-callout font-bold", current ? "text-ink" : "text-ink-2")}>{t.day}</span>
              <span
                className={cn(
                  "grid h-7 min-w-9 place-items-center rounded-full px-1.5",
                  status === "closed" ? "bg-tint text-on-tint" : current ? "bg-tint-soft text-tint" : "bg-surf-2 text-ink-2",
                )}
              >
                {status === "closed" ? <Check className="size-4" strokeWidth={3} /> : <span className="num text-[12.5px] font-extrabold">{OBJECTIVES[t.obj].no}</span>}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

function HeroTicket({ t, step }: { t: Ticket; step: number }) {
  const started = step > 0;
  return (
    <Card as="article" obj={t.obj} className="overflow-hidden">
      <div className="relative h-[232px] bg-tint-soft">
        <FigurePreview obj={t.obj} />
        <p className="absolute left-5 top-4 text-callout font-bold text-tint">
          {t.dayLong} · Ticket <span className="num">{t.no}</span>
        </p>
      </div>
      <div className="p-5 pt-4">
        <Sender t={t} />
        <h2 className="mt-3 text-title font-extrabold text-ink">{t.hook}</h2>
        <p className="mt-2 text-callout text-ink-2">
          Objective {OBJECTIVES[t.obj].no} · {OBJECTIVES[t.obj].name} · about {t.minutes} minutes
        </p>
        {started ? (
          <div className="mt-4 flex items-center gap-3">
            <Bar value={step / t.steps.length} className="flex-1" label="Ticket progress" />
            <span className="num text-footnote font-bold text-ink-2">
              Step {step + 1} of {t.steps.length}
            </span>
          </div>
        ) : null}
        <Btn variant="tint" className="mt-5" onClick={() => go(started ? `/lesson/${t.no}` : `/ticket/${t.no}`)}>
          {started ? "Continue ticket" : "Open ticket"} <ArrowRight />
        </Btn>
      </div>
    </Card>
  );
}

function HeroPractice({ t }: { t: Ticket }) {
  return (
    <Card as="article" obj={t.obj} className="p-5">
      <div className="flex items-center gap-3">
        <ObjTile obj={t.obj} size={56} />
        <div className="min-w-0 flex-1">
          <StatusMark status="closed" words={`Ticket ${t.no} closed`} />
        </div>
      </div>
      <h2 className="mt-4 text-title font-extrabold text-ink">Lock it in with 4 questions</h2>
      <p className="mt-2 text-callout text-ink-2">Two are hands-on. A wrong answer plays out on the figure, so you see why.</p>
      <Btn variant="tint" className="mt-5" onClick={() => go(`/practice/${t.no}`)}>
        Start practice <ArrowRight />
      </Btn>
    </Card>
  );
}

function HeroSoon({ t, onMail }: { t: Ticket; onMail: () => void }) {
  return (
    <Card as="article" obj={t.obj} className="overflow-hidden">
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <StatusMark status="soon" words="Opens soon" />
          <span className="num text-callout font-bold text-ink-2">
            {t.dayLong} · {t.no}
          </span>
        </div>
        <div className="mt-4">
          <Sender t={t} />
        </div>
        <h2 className="mt-3 text-title font-extrabold text-ink">{t.hook}</h2>
        <p className="mt-2 text-callout text-ink-2">You’ve done everything that’s open. Wednesday’s ticket is being built now.</p>
        <div className="mt-5 grid gap-2.5">
          <Btn variant="tint" onClick={onMail}>
            Email me when it opens
          </Btn>
          <Btn variant="ghost" onClick={() => go("/practice/ports")}>
            Play Port Match meanwhile
          </Btn>
        </div>
      </div>
    </Card>
  );
}

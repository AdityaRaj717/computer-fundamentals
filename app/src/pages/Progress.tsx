import { ArrowRight, Check, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { OBJECTIVES, TICKETS, type ObjId } from "@/app/content";
import { go } from "@/app/router";
import { accuracy, actions, today, useStore } from "@/app/store";
import { Bar, Btn, Card, CardButton, Empty, LargeTitle, Page, Rating, Section } from "@/components/app/ui";
import { EmailForm, ObjTile } from "@/components/app/parts";
import { ProfileButton } from "@/components/app/shell";
import { formatTime } from "./PortMatch";

// The week summary (FR-013): tickets closed, practice accuracy per objective, days studied (no streak
// guilt: missed days are never called out), the drill best, sharing, and the week's rating and email.

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

function thisWeek() {
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  });
}

export function Progress() {
  const s = useStore((x) => x);
  const closed = TICKETS.filter((t) => s.closed[t.no]).length;
  const answered = Object.keys(s.answers).filter((id) => !id.startsWith("ports-")).length;
  const firstTry = Object.entries(s.answers).filter(([id, a]) => !id.startsWith("ports-") && a.right).length;
  const started = closed > 0 || answered > 0 || s.ports.plays > 0;
  const week = thisWeek();
  const studied = week.filter((d) => s.days.includes(d)).length;

  return (
    <Page>
      <LargeTitle title="Week 1 progress" right={<ProfileButton />} />

      {!started ? (
        <Empty
          icon={<Check />}
          title="Your week starts with ticket 1041"
          body="Close a ticket or answer a few questions and your progress shows up here."
          action={
            <Btn variant="primary" onClick={() => go("/ticket/1041")}>
              Open ticket 1041
            </Btn>
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-5">
              <p className="num text-[44px] font-extrabold leading-none tracking-[-0.04em] text-ink">
                {closed}
                <span className="text-ink-3">/4</span>
              </p>
              <p className="mt-2 text-callout font-semibold text-ink-2">tickets closed</p>
            </Card>
            <Card className="p-5">
              <p className="num text-[44px] font-extrabold leading-none tracking-[-0.04em] text-ink">{answered ? `${Math.round((firstTry / answered) * 100)}%` : "–"}</p>
              <p className="mt-2 text-callout font-semibold text-ink-2">{answered ? `right first time (${firstTry} of ${answered})` : "no questions yet"}</p>
            </Card>
          </div>

          <Card className="mt-3 p-5">
            <div className="flex items-baseline justify-between">
              <p className="text-headline font-bold text-ink">Days you studied</p>
              <p className="num text-callout font-bold text-ink-2">{studied} this week</p>
            </div>
            <ol className="mt-4 grid grid-cols-7 gap-1.5" aria-label="This week">
              {week.map((d, i) => {
                const on = s.days.includes(d);
                const isToday = d === today();
                return (
                  <li key={d} className="flex flex-col items-center gap-2">
                    <span className={cn("text-footnote font-bold", isToday ? "text-ink" : "text-ink-2")}>{WEEKDAYS[i]}</span>
                    <span
                      className={cn("grid size-9 place-items-center rounded-full", on ? "bg-good text-white dark:text-[#0d1f14]" : "bg-surf-2", isToday && !on && "ring-2 ring-[color-mix(in_oklab,var(--ink)_25%,transparent)]")}
                      aria-label={`${d}${on ? ", studied" : ""}${isToday ? ", today" : ""}`}
                    >
                      {on ? <Check className="size-4" strokeWidth={3} /> : null}
                    </span>
                  </li>
                );
              })}
            </ol>
          </Card>
        </>
      )}

      <Section title="By objective">
        <Card className="px-5 py-2">
          {(Object.keys(OBJECTIVES) as ObjId[]).map((obj) => {
            const a = accuracy(s, obj);
            const t = TICKETS.find((x) => x.obj === obj)!;
            return (
              <div key={obj} data-obj={obj} className="relative flex items-center gap-4 py-4 [&+&]:before:absolute [&+&]:before:left-16 [&+&]:before:right-0 [&+&]:before:top-0 [&+&]:before:h-px [&+&]:before:bg-[var(--line)]">
                <ObjTile obj={obj} size={46} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate text-body font-bold text-ink">
                      <span className="num">{OBJECTIVES[obj].no}</span> {OBJECTIVES[obj].name}
                    </p>
                    <p className="num flex-none text-callout font-bold text-ink">{a.total ? `${Math.round((a.right / a.total) * 100)}%` : ""}</p>
                  </div>
                  {a.total ? (
                    <>
                      <Bar value={a.right / a.total} className="mt-2" />
                      <p className="mt-1.5 text-footnote text-ink-2">
                        {a.right} of {a.total} right first time
                      </p>
                    </>
                  ) : (
                    <p className="mt-1 text-footnote text-ink-2">{t.ready ? "No questions answered yet" : `Opens with ticket ${t.no}`}</p>
                  )}
                </div>
              </div>
            );
          })}
        </Card>
      </Section>

      <Section title="Drills">
        <CardButton obj="o14" onClick={() => go("/practice/ports")} className="flex items-center gap-4 p-4">
          <span className="min-w-0 flex-1">
            <span className="block text-headline font-bold text-ink">Port Match</span>
            <span className="block text-callout text-ink-2">
              {s.ports.plays ? `${s.ports.plays} ${s.ports.plays === 1 ? "play" : "plays"} · best ${s.ports.best != null ? formatTime(s.ports.best) : "not set yet"}` : "Not played yet"}
            </span>
          </span>
          <ArrowRight className="size-5 text-ink-3" />
        </CardButton>
      </Section>

      <Section title="Share a figure">
        <CardButton obj="o11" onClick={() => go("/share/osi")} className="flex items-center gap-4 p-4">
          <ObjTile obj="o11" size={52} />
          <span className="min-w-0 flex-1">
            <span className="block text-headline font-bold text-ink">The OSI cabinet</span>
            <span className="block text-callout text-ink-2">Anyone can open it in a browser, no sign-up</span>
          </span>
          <Share2 className="size-5 text-ink-2" />
        </CardButton>
      </Section>

      <Section title="How is week 1 going?">
        <Card className="p-5">
          <Rating value={s.ratings.week1} onChange={(v) => actions.rate("week1", v)} label="Rate week 1 from 1 to 5" />
          <div className="mt-6">
            <EmailForm label="Email me when week 2 is out" />
          </div>
        </Card>
      </Section>
    </Page>
  );
}

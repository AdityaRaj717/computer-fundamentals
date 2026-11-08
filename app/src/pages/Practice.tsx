import { ChevronRight, Repeat, Timer, Zap } from "lucide-react";
import { OBJECTIVES, PRACTICE_1041, TICKETS } from "@/app/content";
import { go } from "@/app/router";
import { useStore } from "@/app/store";
import { CardButton, Empty, LargeTitle, Page, Section } from "@/components/app/ui";
import { ObjTile, StatusMark } from "@/components/app/parts";
import { ProfileButton } from "@/components/app/shell";
import { formatTime } from "./PortMatch";

// Practice: question sets per ticket, the two drills, and the review list (FR-008, FR-010, FR-011).

export function Practice() {
  const s = useStore((x) => x);
  const done1041 = PRACTICE_1041.filter((q) => s.answers[q.id]).length;

  return (
    <Page>
      <LargeTitle title="Practice" right={<ProfileButton />} />

      <Section title="From your tickets" className="mt-2">
        <div className="flex flex-col gap-3">
          {TICKETS.map((t) => {
            const ready = t.ready;
            const progress = t.no === "1041" ? done1041 : 0;
            return (
              <CardButton key={t.no} obj={t.obj} onClick={() => go(ready ? `/practice/${t.no}` : `/ticket/${t.no}`)} className="p-4">
                <span className="flex items-center gap-4">
                  <ObjTile obj={t.obj} size={52} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-headline font-bold text-ink">Ticket {t.no} practice</span>
                    <span className="mt-0.5 block text-callout text-ink-2">
                      {ready
                        ? progress === PRACTICE_1041.length
                          ? `Done · try again any time`
                          : `${PRACTICE_1041.length} questions · 2 hands-on`
                        : `Objective ${OBJECTIVES[t.obj].no} · ${OBJECTIVES[t.obj].name}`}
                    </span>
                  </span>
                  {ready ? (
                    progress === PRACTICE_1041.length ? <StatusMark status="closed" words="Done" /> : <ChevronRight className="size-5 text-ink-3" strokeWidth={2.2} />
                  ) : (
                    <StatusMark status="soon" words="Soon" />
                  )}
                </span>
              </CardButton>
            );
          })}
        </div>
      </Section>

      <Section title="Drills">
        <div className="grid grid-cols-2 gap-3">
          <CardButton obj="o14" onClick={() => go("/practice/ports")} className="flex min-h-[176px] flex-col p-4" label="Port Match drill">
            <span className="grid size-12 place-items-center rounded-[15px] bg-tint-soft text-tint">
              <Timer className="size-6" strokeWidth={2.2} />
            </span>
            <span className="mt-auto block pt-4 text-headline font-bold text-ink">Port Match</span>
            <span className="mt-0.5 block text-callout text-ink-2">{s.ports.best != null ? `Best ${formatTime(s.ports.best)}` : "12 ports · no best yet"}</span>
          </CardButton>
          <CardButton obj="o17" onClick={() => go("/ticket/1043")} className="flex min-h-[176px] flex-col p-4" label="Subnet Sprint, opens with ticket 1043">
            <span className="flex items-start justify-between">
              <span className="grid size-12 place-items-center rounded-[15px] bg-tint-soft text-tint">
                <Zap className="size-6" strokeWidth={2.2} />
              </span>
              <StatusMark status="soon" words="Soon" />
            </span>
            <span className="mt-auto block pt-4 text-headline font-bold text-ink">Subnet Sprint</span>
            <span className="mt-0.5 block text-callout text-ink-2">Opens with ticket 1043</span>
          </CardButton>
        </div>
      </Section>

      <Section title="Review" action={s.review.length ? <span className="num text-callout font-bold text-ink-2">{s.review.length} to go</span> : null}>
        {s.review.length ? (
          <ul className="sq overflow-hidden rounded-xl bg-surf shadow-card">
            {s.review.map((item) => (
              <li key={item.id} data-obj={item.obj} className="relative flex min-h-[64px] items-center gap-3 px-4 py-3 [&+&]:before:absolute [&+&]:before:left-4 [&+&]:before:right-0 [&+&]:before:top-0 [&+&]:before:h-px [&+&]:before:bg-[var(--line)]">
                <span className="h-10 w-1.5 flex-none rounded-full bg-tint" aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="block text-body font-semibold text-ink">{item.title}</span>
                  <span className="block text-footnote text-ink-2">
                    {OBJECTIVES[item.obj].no} {OBJECTIVES[item.obj].name} · {item.from}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => (item.from.startsWith("Port") ? go("/practice/ports") : go(`/practice/${item.id.slice(0, 4)}`))}
                  className="h-11 rounded-full bg-surf-2 px-4 text-callout font-bold text-ink hover:bg-surf-3"
                >
                  Try again
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <Empty icon={<Repeat />} title="Nothing to review yet" body="Questions you miss and ports you mix up come back here until they stick." />
        )}
      </Section>
    </Page>
  );
}

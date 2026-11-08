import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MODULE, OBJECTIVES, TICKETS, TRADEMARK } from "@/app/content";
import { go } from "@/app/router";
import { statusOf, useStore } from "@/app/store";
import { Bar, CardButton, LargeTitle, Page } from "@/components/app/ui";
import { ObjTile, Sender, StatusMark } from "@/components/app/parts";
import { ProfileButton } from "@/components/app/shell";
import { statusWords } from "@/components/app/ui";

// The module as a vertical path of four days (Mimo, Duolingo paths), each ticket a full card with its
// sender, its objective tint and a status mark in words.

export function Learn() {
  const s = useStore((x) => x);
  const closed = TICKETS.filter((t) => s.closed[t.no]).length;

  return (
    <Page>
      <LargeTitle title={MODULE.title} right={<ProfileButton />} />
      <p className="-mt-1 text-body text-ink-2">{MODULE.blurb} Network+ N10-009, module 1.</p>

      <div className="sq mt-5 flex items-center gap-4 rounded-xl bg-surf p-4 shadow-card">
        <span className="num text-[34px] font-extrabold leading-none tracking-[-0.03em] text-ink">
          {closed}
          <span className="text-ink-3">/4</span>
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-callout font-bold text-ink">tickets closed</p>
          <Bar value={closed / 4} className="mt-2" />
        </div>
      </div>

      <ol className="relative mt-6 flex flex-col gap-4" aria-label="Tickets">
        {/* the path that joins the days */}
        <span aria-hidden="true" className="absolute bottom-10 left-[43px] top-10 w-1 rounded-full bg-surf-3" />
        {TICKETS.map((t) => {
          const status = statusOf(s, t.no, t.ready);
          return (
            <li key={t.no} className="relative">
              <CardButton obj={t.obj} onClick={() => go(`/ticket/${t.no}`)} className={cn("p-4", status === "soon" && "bg-surf/80")}>
                <span className="flex gap-4">
                  <span className="flex w-[54px] flex-none flex-col items-center gap-2">
                    <ObjTile obj={t.obj} size={54} className={status === "soon" ? "opacity-80" : ""} />
                    <span className="text-footnote font-bold text-ink-2">{t.day}</span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <StatusMark status={status} words={statusWords(status, s.steps[t.no], t.steps.length)} />
                    </span>
                    <span className="mt-2.5 block text-title-2 font-extrabold text-ink">{t.hook}</span>
                    <span className="mt-1.5 block text-callout font-semibold text-tint">
                      {OBJECTIVES[t.obj].no} {OBJECTIVES[t.obj].name}
                    </span>
                    <span className="mt-3 block">
                      <Sender t={t} right={<ChevronRight className="size-5 text-ink-3" strokeWidth={2.2} />} />
                    </span>
                  </span>
                </span>
              </CardButton>
            </li>
          );
        })}
      </ol>

      <p className="mt-8 px-1 text-footnote text-ink-2">{TRADEMARK}</p>
    </Page>
  );
}

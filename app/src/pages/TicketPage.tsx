import * as React from "react";
import { ArrowRight, Clock, Flag, ListChecks, RotateCcw } from "lucide-react";
import { MODULE, SOURCES, ticket } from "@/app/content";
import { go } from "@/app/router";
import { statusOf, useStore } from "@/app/store";
import { Btn, Card, ObjChip, Page, PushHeader, statusWords } from "@/components/app/ui";
import { EmailSheet, ReportSheet, Sender, StatusMark } from "@/components/app/parts";
import { FigurePreview } from "@/components/app/figure-preview";
import { NotFound } from "./NotFound";

// A ticket before you start it: who sent it and what they said, what you'll do, how long it takes,
// and the sources. The one button is pinned to the bottom.

export function TicketPage({ no }: { no: string }) {
  const t = ticket(no);
  const s = useStore((x) => x);
  const [mail, setMail] = React.useState(false);
  const [report, setReport] = React.useState(false);
  if (!t) return <NotFound />;

  const status = statusOf(s, t.no, t.ready);
  const step = s.steps[t.no] ?? 0;

  return (
    <div data-obj={t.obj}>
      <Page className="!pb-[calc(120px+env(safe-area-inset-bottom))] lg:!pb-16">
        <PushHeader onBack={() => go("/learn")} title={`Ticket ${t.no}`} />

        <Card className="relative mt-2 h-[300px] overflow-hidden bg-tint-soft shadow-none">
          <FigurePreview obj={t.obj} />
          <span className="absolute left-4 top-4">
            <StatusMark status={status} words={statusWords(status, step, t.steps.length)} className="bg-surf" />
          </span>
        </Card>

        <h1 className="mt-6 text-display font-extrabold text-balance text-ink">{t.hook}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <ObjChip obj={t.obj} />
          <span className="inline-flex h-8 items-center rounded-full bg-surf-2 px-3 text-footnote font-bold text-ink">{t.dayLong}</span>
        </div>

        {/* the sender's message, like a chat bubble: friendlier than a form */}
        <div className="mt-5">
          <Sender t={t} />
          <p className="sq mt-2.5 rounded-xl rounded-tl-md bg-surf px-4 py-3.5 text-body text-ink shadow-card">{t.message}</p>
        </div>

        <h2 className="mt-8 text-title-2 font-extrabold text-ink">What you’ll do</h2>
        <ol className="mt-3 flex flex-col gap-2.5">
          {t.steps.map((words, index) => (
            <li key={words} className="flex items-center gap-3">
              <span className="num grid size-9 flex-none place-items-center rounded-full bg-tint-soft text-callout font-extrabold text-tint">{index + 1}</span>
              <span className="text-body text-ink">{words}</span>
            </li>
          ))}
        </ol>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Fact icon={<Clock />} big={`${t.minutes} min`} small="about" />
          <Fact icon={<ListChecks />} big={`${t.steps.length} steps`} small={t.ready ? "then 4 questions" : "practice opens with it"} />
        </div>

        {t.buildsOn ? <p className="sq mt-4 rounded-lg bg-surf-2 px-4 py-3 text-callout text-ink">{t.buildsOn}</p> : null}

        <div className="mt-8 text-footnote text-ink-2">
          <p className="font-bold text-ink">Checked against</p>
          <ul className="mt-1 list-disc pl-5">
            {SOURCES[t.no].map((src) => (
              <li key={src}>{src}</li>
            ))}
          </ul>
          <p className="mt-2">Last reviewed {MODULE.reviewed}.</p>
          <button type="button" onClick={() => setReport(true)} className="-ml-2 mt-1 inline-flex h-11 items-center gap-1.5 rounded-full px-2 font-bold text-ink underline-offset-4 hover:underline">
            <Flag className="size-4" /> Report an error
          </button>
        </div>
      </Page>

      {/* pinned action */}
      <div className="fixed inset-x-0 bottom-0 z-30 bg-gradient-to-t from-[var(--bg)] from-60% to-transparent px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-6 lg:left-[248px]">
        <div className="mx-auto flex max-w-[608px] gap-2.5">
          {t.ready ? (
            <Btn variant="tint" onClick={() => go(`/lesson/${t.no}`)}>
              {status === "closed" ? (
                <>
                  <RotateCcw /> Do it again
                </>
              ) : status === "progress" ? (
                <>
                  Continue from step {step + 1} <ArrowRight />
                </>
              ) : (
                <>
                  Start ticket <ArrowRight />
                </>
              )}
            </Btn>
          ) : (
            <Btn variant="tint" onClick={() => setMail(true)}>
              Email me when it opens
            </Btn>
          )}
        </div>
      </div>

      <EmailSheet open={mail} onOpenChange={setMail} />
      <ReportSheet open={report} onOpenChange={setReport} where={`ticket ${t.no}, overview`} />
    </div>
  );
}

function Fact({ icon, big, small }: { icon: React.ReactNode; big: string; small: string }) {
  return (
    <div className="sq flex items-center gap-3 rounded-xl bg-surf p-4 shadow-card">
      <span className="grid size-10 place-items-center rounded-[12px] bg-surf-2 text-ink [&_svg]:size-5">{icon}</span>
      <span>
        <span className="block text-headline font-extrabold text-ink">{big}</span>
        <span className="block text-footnote text-ink-2">{small}</span>
      </span>
    </div>
  );
}


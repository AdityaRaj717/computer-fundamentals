import * as React from "react";
import * as m from "motion/react-m";
import { ArrowRight, Check, Flag } from "lucide-react";
import { MODULE, RECAP, SOURCES, TICKETS, TRADEMARK } from "@/app/content";
import { go } from "@/app/router";
import { actions, useStore } from "@/app/store";
import { Btn, Card, EASE, ObjChip, Page, PushHeader, Rating, Note } from "@/components/app/ui";
import { EmailForm, ReportSheet } from "@/components/app/parts";
import { NotFound } from "./NotFound";

// The end of a ticket (FR-006 and FR-016): what you learned, the objective, sources and review date,
// then a rating, an optional comment and the optional email. Practice is the next step.

export function LessonDone({ no }: { no: string }) {
  const t = TICKETS.find((x) => x.no === no && x.ready);
  const rating = useStore((s) => s.ratings[`ticket-${no}`]);
  const savedComment = useStore((s) => s.comments[`ticket-${no}`]);
  const [comment, setComment] = React.useState(savedComment ?? "");
  const [report, setReport] = React.useState(false);
  if (!t) return <NotFound />;
  const recap = RECAP[no as "1041"] ?? [];

  return (
    <div data-obj={t.obj}>
      <Page>
        <PushHeader onBack={() => go("/")} label="Back to Today" />

        <div className="flex flex-col items-center pt-2 text-center">
          <m.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="grid size-20 place-items-center rounded-full bg-tint text-on-tint shadow-raised"
          >
            <Check className="size-10" strokeWidth={3} />
          </m.span>
          <h1 className="mt-5 text-display font-extrabold text-ink">Ticket {t.no} closed</h1>
          <p className="mt-2 max-w-[32ch] text-body text-ink-2">{t.from} can print receipts again. Nice work.</p>
          <ObjChip obj={t.obj} className="mt-3" />
        </div>

        <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.4, ease: EASE }}>
          <Card className="mt-7 p-5">
            <h2 className="text-title-2 font-extrabold text-ink">What you found out</h2>
            <ul className="mt-3 flex flex-col gap-3">
              {recap.map((line) => (
                <li key={line} className="flex gap-3 text-body text-ink">
                  <span className="mt-[9px] size-2 flex-none rounded-full bg-tint" aria-hidden="true" />
                  {line}
                </li>
              ))}
            </ul>
            <p className="sq mt-4 rounded-lg bg-surf-2 px-4 py-3 text-callout text-ink-2">
              Simplified: in TCP/IP the app does the jobs of layers 5 and 6.
            </p>
          </Card>

          <div className="mt-4 grid gap-2.5">
            <Btn variant="tint" onClick={() => go(`/practice/${t.no}`)}>
              Practise this ticket <ArrowRight />
            </Btn>
            <Btn variant="ghost" onClick={() => go("/")}>
              Back to Today
            </Btn>
          </div>

          <Card className="mt-8 p-5">
            <h2 className="text-title-2 font-extrabold text-ink">How was this ticket?</h2>
            <p className="mt-1 text-callout text-ink-2">1 is “lost me”, 5 is “I get it now”.</p>
            <div className="mt-4">
              <Rating value={rating} onChange={(v) => actions.rate(`ticket-${no}`, v)} label="Rate this ticket from 1 to 5" />
            </div>
            {rating ? (
              <form
                className="mt-4 flex flex-col gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  actions.comment(`ticket-${no}`, comment.trim());
                }}
              >
                <label htmlFor="comment" className="text-callout font-bold text-ink">
                  Anything to add? <span className="font-medium text-ink-2">(optional)</span>
                </label>
                <textarea
                  id="comment"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="sq w-full resize-none rounded-lg bg-surf-2 px-4 py-3.5 text-body text-ink outline-none ring-2 ring-transparent placeholder:text-ink-3 focus:bg-surf focus:ring-[color-mix(in_oklab,var(--accent)_60%,transparent)]"
                  placeholder="What clicked, or what didn’t"
                />
                {savedComment && savedComment === comment.trim() ? <Note>Thanks, saved.</Note> : <Btn type="submit" variant="secondary" size="md" disabled={!comment.trim()}>Save comment</Btn>}
              </form>
            ) : null}
          </Card>

          <Card className="mt-4 p-5">
            <EmailForm label="Email me when ticket 1042 opens" />
          </Card>

          <div className="mt-8 px-1 text-footnote text-ink-2">
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
            <p className="mt-3">{TRADEMARK}</p>
          </div>
        </m.div>
      </Page>
      <ReportSheet open={report} onOpenChange={setReport} where={`ticket ${t.no}, wrap-up`} />
    </div>
  );
}

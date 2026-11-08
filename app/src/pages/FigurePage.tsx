import * as React from "react";
import { ArrowRight, Check, Copy, Flag } from "lucide-react";
import { MODULE, TRADEMARK } from "@/app/content";
import { go } from "@/app/router";
import { Btn, ObjChip, Page } from "@/components/app/ui";
import { ReportSheet } from "@/components/app/parts";
import { Wordmark } from "@/components/app/shell";
import { FigureBoundary } from "@/components/app/figure-preview";
import { OsiFigure } from "@/figures/osi/figure";

/** The figure on its own: the share-link view (FR-015), and the page the Anatomy checks capture. */
export function FigurePage() {
  const [copied, setCopied] = React.useState(false);
  const [report, setReport] = React.useState(false);
  const link = `${window.location.origin}${window.location.pathname}#/share/osi`;

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: "The OSI model as a seven-drawer cabinet", url: link });
      else {
        await navigator.clipboard.writeText(link);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2400);
      }
    } catch {
      // the learner closed the share sheet
    }
  };

  return (
    <div data-obj="o11" className="min-h-dvh bg-[var(--bg)]">
      <Page className="!pb-12">
        <header className="flex h-[64px] items-center justify-between pt-[env(safe-area-inset-top)]">
          <Wordmark />
          <button type="button" onClick={share} className="inline-flex h-11 items-center gap-2 rounded-full bg-surf px-4 text-callout font-bold text-ink shadow-card">
            {copied ? <Check className="size-[18px] text-good" strokeWidth={3} /> : <Copy className="size-[18px]" />}
            {copied ? "Link copied" : "Share"}
          </button>
        </header>
        <h1 className="mt-4 text-display font-extrabold text-balance text-ink">The OSI model as a seven-drawer cabinet</h1>
        <ObjChip obj="o11" className="mt-3" />
        <p className="mt-3 text-body text-ink-2">Open a drawer to see what each layer adds. Tap the plug, then send the print job down.</p>

        <div className="mt-5">
          <FigureBoundary fallbackText="A print job goes down seven layers, gains a header at layers 4, 3 and 2, and leaves as signal on the cable.">
            <OsiFigure tour legend hint="Tap a drawer or the plug" />
          </FigureBoundary>
        </div>

        <div className="mt-6">
          <Btn variant="tint" onClick={() => go("/ticket/1041")}>
            Do the full ticket <ArrowRight />
          </Btn>
          <p className="mt-2.5 text-center text-footnote text-ink-2">Ticket 1041 · about 6 minutes · free, no sign-up</p>
        </div>

        <div className="mt-10 text-footnote text-ink-2">
          <p>Last reviewed {MODULE.reviewed}.</p>
          <button type="button" onClick={() => setReport(true)} className="-ml-2 inline-flex h-11 items-center gap-1.5 rounded-full px-2 font-bold text-ink underline-offset-4 hover:underline">
            <Flag className="size-4" /> Report an error
          </button>
          <p className="mt-2">{TRADEMARK}</p>
        </div>
      </Page>
      <ReportSheet open={report} onOpenChange={setReport} where="shared OSI figure" />
    </div>
  );
}

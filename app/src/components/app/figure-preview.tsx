import * as React from "react";
import { RotateCcw } from "lucide-react";
import type { ObjId } from "@/app/content";
import { ObjTile } from "./parts";

// The live figure, loaded on demand, as a quiet preview inside a card. The figure owns its own motion;
// nothing here animates it. Other objectives' figures don't exist yet, so they show their tile.

const OsiFigure = React.lazy(() => import("@/figures/osi/figure").then((mod) => ({ default: mod.OsiFigure })));

export function FigurePreview({ obj }: { obj: ObjId }) {
  if (obj !== "o11")
    return (
      <div className="grid h-full place-items-center">
        <ObjTile obj={obj} size={88} className="bg-surf shadow-card" />
      </div>
    );
  return (
    <FigureBoundary compact>
      <React.Suspense fallback={<div className="skeleton absolute inset-3 rounded-[22px]" aria-hidden="true" />}>
        {/* inert: a picture of the machine here; the real one is one tap away in the lesson */}
        <div className="fig-preview absolute inset-0 px-2 pb-2 pt-8" inert aria-hidden="true">
          <OsiFigure variant="stage" tour />
        </div>
      </React.Suspense>
    </FigureBoundary>
  );
}

/** Error state for anything that renders a figure: say what happened, offer a retry, keep the words. */
export class FigureBoundary extends React.Component<{ children: React.ReactNode; compact?: boolean; fallbackText?: string }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (!this.state.failed) return this.props.children;
    if (this.props.compact) return <div className="grid h-full place-items-center text-callout font-semibold text-ink-2">Figure unavailable</div>;
    return (
      <div role="alert" className="sq flex h-full min-h-[260px] flex-col items-center justify-center gap-3 rounded-card bg-surf-2 px-6 py-8 text-center">
        <p className="text-headline font-bold text-ink">The figure didn’t load</p>
        <p className="max-w-[34ch] text-callout text-ink-2">
          {this.props.fallbackText ?? "Your progress is safe. Try again, or check your connection."}
        </p>
        <button
          type="button"
          onClick={() => this.setState({ failed: false })}
          className="mt-1 inline-flex h-12 items-center gap-2 rounded-full bg-surf px-5 text-callout font-bold text-ink shadow-card"
        >
          <RotateCcw className="size-[18px]" /> Try again
        </button>
      </div>
    );
  }
}

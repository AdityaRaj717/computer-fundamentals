import { Compass } from "lucide-react";
import { go } from "@/app/router";
import { Btn, Empty, Page } from "@/components/app/ui";

export function NotFound() {
  return (
    <Page className="pt-[max(48px,env(safe-area-inset-top))]">
      <Empty
        icon={<Compass />}
        title="This page doesn’t exist"
        body="The link may be old, or the ticket isn’t part of this week. Your progress is safe."
        action={<Btn onClick={() => go("/")}>Go to Today</Btn>}
      />
    </Page>
  );
}

/** Loading state for screens that bring in a figure: the lesson's own layout, as soft shapes. */
export function LessonSkeleton() {
  return (
    <div className="mx-auto flex h-dvh max-w-[720px] flex-col gap-4 px-4 pt-3" aria-busy="true" aria-label="Loading the lesson">
      <div className="flex h-11 items-center gap-3">
        <span className="skeleton size-11 rounded-full" />
        <span className="skeleton h-2.5 flex-1 rounded-full" />
        <span className="skeleton h-8 w-20 rounded-full" />
      </div>
      <span className="skeleton h-4 w-40 rounded-full" />
      <span className="skeleton h-8 w-4/5 rounded-[10px]" />
      <span className="skeleton min-h-0 flex-1 rounded-[28px]" />
      <span className="skeleton mb-6 h-14 rounded-[18px]" />
    </div>
  );
}

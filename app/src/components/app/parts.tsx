import * as React from "react";
import { Check, DoorOpen, Flag, Layers, Lock, Mail, Network, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { OBJECTIVES, type ObjId, type Ticket } from "@/app/content";
import { actions, isEmail, useStore } from "@/app/store";
import { Btn, Field, Note, Sheet, Avatar } from "./ui";

// Parts shared by several screens: ticket art, status marks, the report and email sheets.

export const OBJ_ICON: Record<ObjId, typeof Layers> = { o11: Layers, o14: DoorOpen, o17: Network, o51: Wrench };

/** The objective's tile: a soft tinted square with its figure's icon. */
export function ObjTile({ obj, size = 52, className }: { obj: ObjId; size?: number; className?: string }) {
  const Icon = OBJ_ICON[obj];
  return (
    <span data-obj={obj} aria-hidden="true" className={cn("sq grid flex-none place-items-center rounded-[16px] bg-tint-soft text-tint", className)} style={{ width: size, height: size }}>
      <Icon style={{ width: size * 0.46, height: size * 0.46 }} strokeWidth={2.2} />
    </span>
  );
}

export type Status = "closed" | "progress" | "ready" | "soon";

/** Status as an icon plus words (never colour alone). */
export function StatusMark({ status, words, className }: { status: Status; words: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-footnote font-bold",
        status === "closed" && "bg-good-soft text-good",
        status === "progress" && "bg-tint-soft text-tint",
        status === "ready" && "bg-surf-2 text-ink",
        status === "soon" && "bg-surf-2 text-ink-2",
        className,
      )}
    >
      {status === "closed" ? <Check className="size-4" strokeWidth={3} /> : null}
      {status === "progress" ? <span className="size-2 rounded-full bg-tint" /> : null}
      {status === "soon" ? <Lock className="size-3.5" strokeWidth={2.6} /> : null}
      {words}
    </span>
  );
}

/** Who sent the ticket. The user asked for the sender on each ticket. */
export function Sender({ t, right }: { t: Ticket; right?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar initials={t.initials} obj={t.obj} size={36} />
      <p className="min-w-0 flex-1 text-callout text-ink-2">
        <span className="font-bold text-ink">{t.from}</span> · {t.role}
      </p>
      {right}
    </div>
  );
}

/** Report an error (FR-017). The lesson and step are recorded automatically. */
export function ReportSheet({ open, onOpenChange, where }: { open: boolean; onOpenChange: (v: boolean) => void; where: string }) {
  const [text, setText] = React.useState("");
  const [sent, setSent] = React.useState(false);
  React.useEffect(() => {
    if (open) {
      setSent(false);
      setText("");
    }
  }, [open]);
  return (
    <Sheet open={open} onOpenChange={onOpenChange} title="Report an error" description={`We’ll attach where you are: ${where}.`}>
      {sent ? (
        <div className="flex flex-col gap-4 pb-2">
          <Note>Thanks. In this pilot build the form isn’t connected yet, so nothing was sent. When it is, confirmed errors get fixed within 7 days.</Note>
          <Btn onClick={() => onOpenChange(false)}>Done</Btn>
        </div>
      ) : (
        <form
          className="flex flex-col gap-4 pb-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (text.trim()) setSent(true);
          }}
        >
          <div>
            <label htmlFor="report-text" className="mb-2 block text-callout font-bold text-ink">
              What looks wrong?
            </label>
            <textarea
              id="report-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              placeholder="For example: layer 5 should be Session, not Transport."
              className="sq w-full resize-none rounded-lg bg-surf-2 px-4 py-3.5 text-body text-ink outline-none ring-2 ring-transparent placeholder:text-ink-3 focus:bg-surf focus:ring-[color-mix(in_oklab,var(--accent)_60%,transparent)]"
            />
          </div>
          <p className="flex items-center gap-2 text-footnote text-ink-2">
            <Flag className="size-4 flex-none" /> Pilot build: this form isn’t connected yet.
          </p>
          <Btn type="submit" disabled={!text.trim()}>
            Send report
          </Btn>
        </form>
      )}
    </Sheet>
  );
}

/** "Email me when the next ticket ships" with a clear privacy note (FR-016). Stored once. */
export function EmailForm({ cta = "Email me", label = "Email me when the next ticket opens" }: { cta?: string; label?: string }) {
  const saved = useStore((s) => s.email);
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState<string>();
  if (saved)
    return (
      <Note icon={<Mail strokeWidth={2.4} />}>
        We’ll send one email to <span className="font-bold">{saved}</span> when it opens. Nothing else.
      </Note>
    );
  return (
    <form
      noValidate
      className="flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (!isEmail(value)) return setError("That doesn’t look like an email address yet.");
        setError(undefined);
        actions.email(value);
      }}
    >
      <Field
        label={label}
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={value}
        error={error}
        hint="One email when it opens, nothing else. Kept on this device during the pilot."
        onChange={(e) => {
          setValue(e.target.value);
          if (error) setError(undefined);
        }}
      />
      <Btn type="submit" variant="secondary">
        {cta}
      </Btn>
    </form>
  );
}

export function EmailSheet({ open, onOpenChange, title = "Get the next ticket" }: { open: boolean; onOpenChange: (v: boolean) => void; title?: string }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange} title={title} description="Tickets 1042 to 1044 are being built now.">
      <div className="pb-2">
        <EmailForm />
      </div>
    </Sheet>
  );
}

export const objLabel = (obj: ObjId) => `${OBJECTIVES[obj].no} ${OBJECTIVES[obj].name}`;

import * as React from "react";
import { Dialog, Switch as SwitchPrimitive } from "radix-ui";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ArrowLeft, Check, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ObjId } from "@/app/content";
import { OBJECTIVES } from "@/app/content";

// App-level building blocks, all themed from the tokens in index.css.

export const EASE = [0.32, 0.72, 0, 1] as const;

/* ------------------------------------------------------------------ layout */

export function Page({ children, className, wide }: { children: React.ReactNode; className?: string; wide?: boolean }) {
  return <div className={cn("page mx-auto w-full px-4 sm:px-6", wide ? "max-w-[880px]" : "max-w-[640px]", className)}>{children}</div>;
}

/** Big title at the top of a tab, with an optional control on the right. */
export function LargeTitle({ title, sub, right }: { title: React.ReactNode; sub?: React.ReactNode; right?: React.ReactNode }) {
  return (
    <header className="flex items-start gap-3 pb-5 pt-[max(20px,env(safe-area-inset-top))] lg:pt-12">
      <div className="min-w-0 flex-1">
        {sub ? <p className="text-callout font-semibold text-ink-2">{sub}</p> : null}
        <h1 className="mt-0.5 text-display font-extrabold text-balance text-ink">{title}</h1>
      </div>
      {right}
    </header>
  );
}

/** Header of a pushed screen: back, an optional small centred title, an optional action. */
export function PushHeader({ onBack, title, right, label = "Back" }: { onBack: () => void; title?: string; right?: React.ReactNode; label?: string }) {
  return (
    <header className="sticky top-0 z-20 -mx-4 flex h-[60px] items-center gap-2 bg-[color-mix(in_oklab,var(--bg)_86%,transparent)] px-2 pt-[env(safe-area-inset-top)] backdrop-blur-xl sm:-mx-6 sm:px-4">
      <IconButton label={label} onClick={onBack}>
        <ArrowLeft className="size-[22px]" strokeWidth={2.3} />
      </IconButton>
      <p className="min-w-0 flex-1 truncate text-center text-headline font-bold text-ink">{title}</p>
      <div className="flex min-w-11 justify-end">{right}</div>
    </header>
  );
}

export function Section({ title, action, children, className }: { title?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("mt-8", className)}>
      {title ? (
        <div className="mb-3 flex items-baseline justify-between gap-3 px-1">
          <h2 className="text-title-2 font-extrabold text-ink">{title}</h2>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ surfaces */

export function Card({ children, className, obj, as: As = "div", ...rest }: React.HTMLAttributes<HTMLElement> & { obj?: ObjId; as?: "div" | "article" | "section" }) {
  return (
    <As data-obj={obj} className={cn("sq rounded-card bg-surf shadow-card", className)} {...rest}>
      {children}
    </As>
  );
}

/** A whole card that is one big tap target. */
export function CardButton({ children, className, obj, onClick, label }: { children: React.ReactNode; className?: string; obj?: ObjId; onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      data-obj={obj}
      aria-label={label}
      onClick={onClick}
      className={cn(
        "sq block w-full rounded-card bg-surf text-left shadow-card transition-[transform,box-shadow] duration-200 hover:shadow-raised active:scale-[0.985]",
        className,
      )}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ buttons */

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "tint" | "secondary" | "ghost" | "danger";
  size?: "lg" | "md";
};

export function Btn({ variant = "primary", size = "lg", className, children, ...rest }: BtnProps) {
  return (
    <button
      type="button"
      className={cn(
        "sq inline-flex w-full select-none items-center justify-center gap-2 rounded-lg px-5 font-bold tracking-[-0.01em] transition-[transform,background,box-shadow,opacity] duration-150 active:translate-y-[1px] disabled:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
        size === "lg" ? "h-14 text-[17px]" : "h-12 text-[16px]",
        variant === "primary" && "bg-brand text-brand-ink shadow-press hover:opacity-92 disabled:bg-surf-3 disabled:text-ink-2 disabled:shadow-none",
        variant === "tint" && "bg-tint text-on-tint shadow-press hover:opacity-92 disabled:bg-surf-3 disabled:text-ink-2 disabled:shadow-none",
        variant === "secondary" &&
          "bg-surf text-ink shadow-[inset_0_0_0_2px_color-mix(in_oklab,var(--ink)_12%,transparent),inset_0_-4px_0_color-mix(in_oklab,var(--ink)_10%,transparent)] hover:bg-surf-2 disabled:opacity-50",
        variant === "ghost" && "text-ink hover:bg-surf-2 disabled:opacity-50",
        variant === "danger" && "bg-bad text-white shadow-press hover:opacity-92 dark:text-[#1b0d0a]",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function IconButton({ label, children, className, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn("grid size-11 flex-none place-items-center rounded-full text-ink transition-colors hover:bg-surf-2 disabled:opacity-30", className)}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ small parts */

export function Avatar({ initials, obj, size = 36 }: { initials: string; obj?: ObjId; size?: number }) {
  return (
    <span
      data-obj={obj}
      aria-hidden="true"
      className="grid flex-none place-items-center rounded-full bg-tint-soft font-extrabold tracking-wide text-tint"
      style={{ width: size, height: size, fontSize: Math.round(size * 0.34) }}
    >
      {initials}
    </span>
  );
}

/** Objective chip: the number and the name, tinted. Never colour alone. */
export function ObjChip({ obj, className }: { obj: ObjId; className?: string }) {
  const o = OBJECTIVES[obj];
  return (
    <span data-obj={obj} className={cn("inline-flex h-8 items-center gap-1.5 rounded-full bg-tint-soft px-3 text-footnote font-bold text-tint", className)}>
      <span className="num">{o.no}</span>
      <span className="font-semibold">{o.name}</span>
    </span>
  );
}

export function Bar({ value, className, label }: { value: number; className?: string; label?: string }) {
  return (
    <span
      role={label ? "progressbar" : undefined}
      aria-label={label}
      aria-valuenow={label ? Math.round(value * 100) : undefined}
      aria-valuemin={label ? 0 : undefined}
      aria-valuemax={label ? 100 : undefined}
      className={cn("block h-2.5 overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--accent)_14%,var(--surf-2))]", className)}
    >
      <m.span
        className="block h-full rounded-full bg-tint"
        initial={false}
        animate={{ width: `${Math.max(0, Math.min(1, value)) * 100}%` }}
        transition={{ duration: 0.6, ease: EASE }}
      />
    </span>
  );
}

/* ------------------------------------------------------------------ grouped lists (settings) */

export function Group({ children, title, note }: { children: React.ReactNode; title?: string; note?: React.ReactNode }) {
  return (
    <section className="mt-7">
      {title ? <h2 className="mb-2 px-1 text-headline font-bold text-ink">{title}</h2> : null}
      <div className="sq overflow-hidden rounded-xl bg-surf shadow-card">{children}</div>
      {note ? <p className="mt-2 px-1 text-footnote text-ink-2">{note}</p> : null}
    </section>
  );
}

type RowProps = {
  icon?: React.ReactNode;
  label: React.ReactNode;
  detail?: React.ReactNode;
  control?: React.ReactNode;
  onClick?: () => void;
  tone?: "danger";
  sub?: React.ReactNode;
};

export function Row({ icon, label, detail, control, onClick, tone, sub }: RowProps) {
  const inner = (
    <>
      {icon ? <span className={cn("grid size-9 flex-none place-items-center rounded-[11px] [&_svg]:size-[19px]", tone === "danger" ? "bg-bad-soft text-bad" : "bg-surf-2 text-ink")}>{icon}</span> : null}
      <span className="min-w-0 flex-1">
        <span className={cn("block text-body font-semibold", tone === "danger" ? "text-bad" : "text-ink")}>{label}</span>
        {sub ? <span className="mt-0.5 block text-footnote text-ink-2">{sub}</span> : null}
      </span>
      {detail ? <span className="max-w-[45%] truncate text-callout text-ink-2">{detail}</span> : null}
      {control}
      {onClick && !control ? <ChevronRight className="size-5 flex-none text-ink-3" strokeWidth={2.2} /> : null}
    </>
  );
  const cls = "relative flex min-h-[56px] w-full items-center gap-3 px-4 py-2.5 text-left [&+&]:before:absolute [&+&]:before:left-16 [&+&]:before:right-0 [&+&]:before:top-0 [&+&]:before:h-px [&+&]:before:bg-[var(--line)]";
  return onClick ? (
    <button type="button" onClick={onClick} className={cn(cls, "transition-colors hover:bg-surf-2/60 active:bg-surf-2")}>
      {inner}
    </button>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

export function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <SwitchPrimitive.Root
      checked={checked}
      onCheckedChange={onChange}
      aria-label={label}
      className="relative h-[31px] w-[51px] flex-none rounded-full bg-surf-3 transition-colors duration-200 after:absolute after:-inset-[7px] after:content-[''] data-[state=checked]:bg-good"
    >
      <SwitchPrimitive.Thumb className="block size-[27px] translate-x-[2px] rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.2)] transition-transform duration-200 data-[state=checked]:translate-x-[22px]" />
    </SwitchPrimitive.Root>
  );
}

export function Segmented<T extends string>({ value, options, onChange, label }: { value: T; options: { value: T; label: string; icon?: React.ReactNode }[]; onChange: (v: T) => void; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="grid auto-cols-fr grid-flow-col gap-1 rounded-[16px] bg-surf-2 p-1">
      {options.map((option) => {
        const on = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative flex h-11 items-center justify-center gap-1.5 rounded-[12px] text-callout font-bold transition-colors [&_svg]:size-[17px]",
              on ? "text-ink" : "text-ink-2 hover:text-ink",
            )}
          >
            {on ? <m.span layoutId={`seg-${label}`} className="absolute inset-0 rounded-[12px] bg-surf shadow-card" transition={{ type: "spring", stiffness: 500, damping: 40 }} /> : null}
            <span className="relative flex items-center gap-1.5">
              {option.icon}
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** Small rounded field with a visible label. */
export function Field({ label, hint, error, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string; error?: string }) {
  const id = React.useId();
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-callout font-bold text-ink">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? `${id}-note` : undefined}
        className="sq h-14 w-full rounded-lg bg-surf-2 px-4 text-body text-ink outline-none ring-2 ring-transparent transition-[box-shadow,background] placeholder:text-ink-3 focus:bg-surf focus:ring-[color-mix(in_oklab,var(--accent)_60%,transparent)] aria-invalid:ring-bad"
        {...rest}
      />
      {error || hint ? (
        <p id={`${id}-note`} className={cn("mt-2 text-footnote", error ? "font-semibold text-bad" : "text-ink-2")}>
          {error ?? hint}
        </p>
      ) : null}
    </div>
  );
}

/** The 1–5 rating, as five big buttons with numbers (not stars, not colour alone). */
export function Rating({ value, onChange, label }: { value?: number; onChange: (v: number) => void; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="grid grid-cols-5 gap-2">
      {[1, 2, 3, 4, 5].map((n) => {
        const on = value === n;
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={on}
            aria-label={`${n} of 5`}
            onClick={() => onChange(n)}
            className={cn(
              "sq num h-14 rounded-lg border-2 border-b-4 text-[19px] font-extrabold transition-[background,border-color,transform] active:translate-y-[2px] active:border-b-2",
              on ? "border-tint bg-tint-soft text-tint" : "border-[color-mix(in_oklab,var(--ink)_12%,transparent)] bg-surf text-ink",
            )}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}

export function Note({ tone = "good", children, icon }: { tone?: "good" | "info"; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <p role="status" className={cn("sq flex items-start gap-2.5 rounded-lg px-4 py-3.5 text-callout font-semibold", tone === "good" ? "bg-good-soft text-ink" : "bg-surf-2 text-ink")}>
      <span className={cn("mt-0.5 flex-none [&_svg]:size-5", tone === "good" ? "text-good" : "text-ink-2")}>{icon ?? <Check strokeWidth={2.6} />}</span>
      <span>{children}</span>
    </p>
  );
}

/** Empty state: a soft tile icon, one line that says why it's empty, and what to do. */
export function Empty({ icon, title, body, action }: { icon: React.ReactNode; title: string; body: string; action?: React.ReactNode }) {
  return (
    <div className="sq flex flex-col items-center rounded-card bg-surf-2/70 px-6 py-8 text-center">
      <span className="grid size-14 place-items-center rounded-[18px] bg-surf text-ink-2 shadow-card [&_svg]:size-6">{icon}</span>
      <p className="mt-4 text-headline font-bold text-ink">{title}</p>
      <p className="mt-1.5 max-w-[30ch] text-callout text-ink-2">{body}</p>
      {action ? <div className="mt-5 w-full max-w-[280px]">{action}</div> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ sheet */

/**
 * Bottom sheet on phones, centred card on desktop. Radix handles focus, Escape and aria;
 * Motion slides it. Drag the grabber down (or tap the dim) to dismiss.
 */
export function Sheet({ open, onOpenChange, title, description, children }: { open: boolean; onOpenChange: (open: boolean) => void; title: string; description?: string; children: React.ReactNode }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <m.div className="fixed inset-0 z-50 bg-[var(--scrim)]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount {...(description ? {} : { "aria-describedby": undefined })}>
              <m.div
                className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[92dvh] w-full max-w-[560px] flex-col rounded-t-[32px] bg-surf shadow-sheet outline-none lg:bottom-6 lg:rounded-[32px]"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 420, damping: 40 }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: 0, bottom: 0.6 }}
                onDragEnd={(_, info) => {
                  if (info.offset.y > 110 || info.velocity.y > 600) onOpenChange(false);
                }}
              >
                <div className="flex justify-center pt-2.5 lg:hidden" aria-hidden="true">
                  <span className="h-[5px] w-10 rounded-full bg-surf-3" />
                </div>
                <div className="flex items-start gap-3 px-6 pb-2 pt-3 lg:pt-6">
                  <div className="min-w-0 flex-1">
                    <Dialog.Title className="text-title-2 font-extrabold text-ink">{title}</Dialog.Title>
                    {description ? <Dialog.Description className="mt-1 text-callout text-ink-2">{description}</Dialog.Description> : null}
                  </div>
                  <Dialog.Close asChild>
                    <IconButton label="Close" className="-mr-2 -mt-1 bg-surf-2 hover:bg-surf-3">
                      <X className="size-5" strokeWidth={2.4} />
                    </IconButton>
                  </Dialog.Close>
                </div>
                <div className="overflow-y-auto px-6 pb-[max(24px,env(safe-area-inset-bottom))] pt-2" onPointerDownCapture={(e) => e.stopPropagation()}>
                  {children}
                </div>
              </m.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}

/** Status of a ticket, as an icon plus words. */
export function statusWords(status: "closed" | "progress" | "ready" | "soon", step?: number, steps = 3) {
  switch (status) {
    case "closed":
      return "Closed";
    case "progress":
      return `Step ${(step ?? 0) + 1} of ${steps}`;
    case "ready":
      return "Ready to start";
    default:
      return "Opens soon";
  }
}

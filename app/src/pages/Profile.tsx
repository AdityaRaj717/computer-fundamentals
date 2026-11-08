import * as React from "react";
import { BookOpen, Flag, Mail, Monitor, Moon, ShieldCheck, Sun, Timer, Trash, UserRound, Wind } from "lucide-react";
import { MODULE, TRADEMARK } from "@/app/content";
import { go } from "@/app/router";
import { actions, useStore } from "@/app/store";
import { Btn, Card, Group, Page, PushHeader, Row, Segmented, Sheet, Switch } from "@/components/app/ui";
import { EmailForm, ReportSheet } from "@/components/app/parts";

// Profile and settings (Duolingo profile, Claude and Telegram settings): inset grouped rows of 56 px,
// the destructive action alone at the bottom, and it asks first.

export function Profile() {
  const s = useStore((x) => x);
  const [sheet, setSheet] = React.useState<null | "email" | "reset" | "accuracy" | "privacy" | "report">(null);
  const open = (name: typeof sheet) => () => setSheet(name);
  const close = (v: boolean) => !v && setSheet(null);

  return (
    <Page>
      <PushHeader onBack={() => go("/")} title="Profile" label="Back to Today" />

      <Card className="mt-2 flex flex-col items-center p-6 text-center">
        <span className="grid size-20 place-items-center rounded-full bg-surf-2 text-ink">
          <UserRound className="size-10" strokeWidth={1.8} />
        </span>
        <h1 className="mt-4 text-title font-extrabold text-ink">Guest learner</h1>
        <p className="mt-1 max-w-[30ch] text-callout text-ink-2">Your progress is saved on this device. No account needed.</p>
        <div className="mt-5 w-full max-w-[320px]">
          <Btn variant="secondary" size="md" onClick={() => go("/signin")}>
            Accounts: get told when they open
          </Btn>
        </div>
      </Card>

      <Group title="Appearance">
        <div className="p-3">
          <Segmented
            label="Theme"
            value={s.settings.theme}
            onChange={(theme) => actions.settings({ theme })}
            options={[
              { value: "system", label: "Auto", icon: <Monitor /> },
              { value: "light", label: "Light", icon: <Sun /> },
              { value: "dark", label: "Dark", icon: <Moon /> },
            ]}
          />
        </div>
        <Row icon={<Wind />} label="Calm motion" sub="Less movement around the figures" control={<Switch checked={s.settings.calm} onChange={(calm) => actions.settings({ calm })} label="Calm motion" />} />
      </Group>

      <Group title="Learning" note="With the timer off, drills score accuracy only.">
        <Row icon={<Timer />} label="Drill timer" control={<Switch checked={s.settings.timer} onChange={(timer) => actions.settings({ timer })} label="Drill timer" />} />
        <Row icon={<Mail />} label="Next-module email" detail={s.email || "Off"} onClick={open("email")} />
      </Group>

      <Group title="About">
        <Row icon={<BookOpen />} label="How we check accuracy" onClick={open("accuracy")} />
        <Row icon={<Flag />} label="Report an error" onClick={open("report")} />
        <Row icon={<ShieldCheck />} label="Privacy" onClick={open("privacy")} />
      </Group>

      <Group>
        <Row icon={<Trash />} label="Reset progress" tone="danger" onClick={open("reset")} />
      </Group>

      <p className="mt-8 px-1 text-footnote text-ink-2">
        Pilot build with sample content. Last reviewed {MODULE.reviewed}. {TRADEMARK}
      </p>

      <Sheet open={sheet === "email"} onOpenChange={close} title="Next-module email" description="One email when the next module ships.">
        <div className="pb-2">
          <EmailForm cta="Save email" label="Your email" />
          {s.email ? (
            <Btn variant="ghost" size="md" className="mt-3" onClick={() => actions.email("")}>
              Remove my email
            </Btn>
          ) : null}
        </div>
      </Sheet>

      <Sheet open={sheet === "reset"} onOpenChange={close} title="Reset all progress?" description="Closed tickets, answers, review cards, drill bests and ratings on this device are cleared. Your settings stay.">
        <div className="grid gap-2.5 pb-2">
          <Btn
            variant="danger"
            onClick={() => {
              actions.reset();
              setSheet(null);
              go("/");
            }}
          >
            Reset progress
          </Btn>
          <Btn variant="secondary" onClick={() => setSheet(null)}>
            Cancel
          </Btn>
        </div>
      </Sheet>

      <Sheet open={sheet === "accuracy"} onOpenChange={close} title="How we check accuracy">
        <div className="flex flex-col gap-3 pb-2 text-body text-ink">
          <p>Every lesson is checked against at least one cited source, such as the CompTIA N10-009 exam objectives, before it ships.</p>
          <p>When a figure simplifies something, it says so. Each lesson shows the date it was last reviewed.</p>
          <p>Confirmed errors are fixed within 7 days. All questions are written by us; none come from real exams.</p>
        </div>
      </Sheet>

      <Sheet open={sheet === "privacy"} onOpenChange={close} title="Privacy">
        <div className="flex flex-col gap-3 pb-2 text-body text-ink">
          <p>No account, no ads. Your progress, ratings and email are kept in this browser.</p>
          <p>When the pilot goes live we’ll count anonymous events, like “lesson finished”, to learn which parts help. They won’t carry your name or email.</p>
          <p>Reset progress clears everything on this device.</p>
        </div>
      </Sheet>

      <ReportSheet open={sheet === "report"} onOpenChange={close} where="profile" />
    </Page>
  );
}

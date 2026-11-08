import * as m from "motion/react-m";
import { ArrowRight, Check } from "lucide-react";
import { TRADEMARK } from "@/app/content";
import { go } from "@/app/router";
import { actions } from "@/app/store";
import { Btn, EASE } from "@/components/app/ui";
import { FigurePreview } from "@/components/app/figure-preview";
import { EmailForm } from "@/components/app/parts";
import { Wordmark } from "@/components/app/shell";

// Welcome (Duolingo, Sololearn): one promise and two exits. Starting is the loud button; signing in is
// the quiet one. Guest-first: the first ticket opens with no sign-up (decided with the user, 2026-11-08).

const PROMISES = ["Four short help-desk tickets, about 7 minutes each", "Touch, predict and break real-looking machines", "Exam-style practice for Network+ N10-009"];

export function Welcome() {
  const start = () => {
    actions.onboard();
    go("/ticket/1041");
  };
  return (
    <div className="min-h-dvh bg-[var(--bg)] lg:grid lg:grid-cols-2">
      <div data-obj="o11" className="relative h-[46dvh] min-h-[300px] overflow-hidden bg-tint-soft lg:order-2 lg:h-dvh">
        <div className="absolute left-5 top-[max(16px,env(safe-area-inset-top))] z-10">
          <Wordmark />
        </div>
        <div className="absolute inset-x-0 bottom-0 top-14">
          <FigurePreview obj="o11" />
        </div>
      </div>

      <m.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="mx-auto flex w-full max-w-[520px] flex-col px-5 pb-[max(20px,env(safe-area-inset-bottom))] pt-6 lg:justify-center lg:px-10"
      >
        <h1 className="text-display font-extrabold text-balance text-ink lg:text-[44px]">Learn networking by fixing a café’s network.</h1>
        <ul className="mt-5 flex flex-col gap-3">
          {PROMISES.map((line) => (
            <li key={line} className="flex items-start gap-3 text-body text-ink">
              <span className="mt-0.5 grid size-6 flex-none place-items-center rounded-full bg-good-soft text-good">
                <Check className="size-3.5" strokeWidth={3.2} />
              </span>
              {line}
            </li>
          ))}
        </ul>

        <div className="mt-7 grid gap-2.5">
          <Btn onClick={start}>
            Start the first ticket <ArrowRight />
          </Btn>
          <Btn variant="ghost" onClick={() => go("/signin")}>
            Sign in
          </Btn>
        </div>
        <p className="mt-3 text-center text-footnote text-ink-2">Free. No sign-up. Progress stays on this device.</p>
        <p className="mt-6 text-footnote text-ink-2">{TRADEMARK}</p>
      </m.div>
    </div>
  );
}

export function SignIn() {
  return (
    <div className="min-h-dvh bg-[var(--bg)]">
      <div className="mx-auto flex min-h-dvh w-full max-w-[520px] flex-col px-4 pb-[max(20px,env(safe-area-inset-bottom))]">
        <header className="flex h-[60px] items-center pt-[env(safe-area-inset-top)]">
          <button type="button" onClick={() => history.length > 1 ? history.back() : go("/welcome")} aria-label="Back" className="grid size-11 place-items-center rounded-full text-ink hover:bg-surf-2">
            <ArrowRight className="size-[22px] rotate-180" strokeWidth={2.3} />
          </button>
        </header>
        <div className="px-1 pt-4">
          <h1 className="text-display font-extrabold text-ink">Sign in</h1>
          <p className="mt-2 text-body text-ink-2">Accounts aren’t open yet. While we test the first module, your progress stays on this device, so there’s nothing you need to sign in to.</p>
        </div>
        <SignInForm />
        <div className="mt-auto grid gap-2.5 pt-8">
          <Btn
            onClick={() => {
              actions.onboard();
              go("/");
            }}
          >
            Continue as a guest
          </Btn>
        </div>
      </div>
    </div>
  );
}

function SignInForm() {
  // The same email capture as everywhere else, worded for accounts.
  return (
    <div className="sq mt-7 rounded-card bg-surf p-5 shadow-card">
      <p className="text-headline font-bold text-ink">Want an account when they open?</p>
      <p className="mt-1 text-callout text-ink-2">Leave your email and we’ll tell you. You can move your progress over then.</p>
      <div className="mt-4">
        <EmailForm label="Email" cta="Tell me when accounts open" />
      </div>
    </div>
  );
}


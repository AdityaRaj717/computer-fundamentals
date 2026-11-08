# UI references for the full app

Collected 2026-11-08 for the app shell around the figures: welcome, Today, Learn, Practice, Progress, profile and settings. We take principles from these, never a screen.

**Lazyweb board:** [Net+ pilot: full app UI references](https://www.lazyweb.com/agentic-search/81e52721-a7ea-4a40-9678-645ee7120e83) (private to the user's Lazyweb account; 26 screens and 2 flows). Lazyweb has no Brilliant screens, so Brilliant comes from its App Store listing, and the tab bar and sheet rules come from Apple's HIG and Material 3.

## What each reference shows, and what we take

| Area | Reference | What it shows | Principle we take |
|---|---|---|---|
| Welcome | Duolingo welcome | One mark, one promise line, a big primary button and a quiet "I already have an account" | One promise and two exits. Starting is the loud button; signing in is the quiet one. |
| Welcome | Sololearn, Blinkist | A short benefit headline over a dark art panel, sign-in options below | The headline says what you will be able to do, not what the app is. |
| Welcome | Drops | Five sign-in buttons stacked | Anti-reference: a wall of providers before any value. We go guest-first. |
| Welcome flow | Duolingo and Drops onboarding flows | Value first (a lesson) before any account | Let people start the first ticket before asking for anything. Email is optional and comes later. |
| Today | Codecademy Go "Today" | Date and streak at the top, one big "continue" card, then smaller cards | One hero card for the next thing to do; everything else is secondary and smaller. |
| Today | Elevate home, BoldVoice "Today's plan" | A short plan of 2–3 items for today with clear done states | Today is a short plan, not a feed: the ticket, then review, then a drill. |
| Today | Atoms | Warm, soft surfaces with generous space and one call to action | Calm, adult tone; space does the separating, not lines. |
| Module | Mimo path, Duolingo path | Units as a vertical path with locked, current and done states | The week is a vertical path of four days; status shows by shape and icon, not colour alone. |
| Module | Elevate home states, Headway | Rich cards with art and a progress ring | Each ticket card carries its sender, its objective tint and a small status mark. |
| Lesson | Duolingo, Falou, Elevate, Mimo lessons | Progress bar and close at the top, question under it, answers and one pinned button at the bottom, feedback band that slides up | Already used in Lesson 1; the rest of the app keeps the same top bar, dock and band. |
| Progress | Drops, Speak, Duolingo streak, Impulse | Big number first, then a calendar of days and a breakdown | One big honest number, then per-objective bars. No guilt: days studied are shown, missed days are not called out, and nothing is "lost". |
| Profile | Duolingo profile edit, Claude settings, Telegram | Grouped settings in rounded inset groups, destructive action last and separated | Inset grouped lists with 52 px+ rows; "Reset progress" sits alone at the bottom and asks first. |
| Sheets | Find My, Dipsea filters, Life360 | Rounded sheet over a dimmed page, grabber on top | Sheets for short scoped tasks (report an error, confirm reset, share). One sheet at a time. |
| Brilliant | App Store listing (apps.apple.com, id913335252) | "Learn by doing": guided problems with visuals, a tutor that reacts to what you do | Figures carry the lesson; feedback reacts to what the learner actually did. |

## Platform rules we follow (sources: Apple HIG tab bars and sheets, Material 3 navigation bar)

- Tab bar: 3–5 destinations, each with an icon and a one-word label. It stays visible on every top-level screen and is only covered by full-screen tasks (a lesson, a drill) and sheets. Tabs are never hidden or disabled; an empty tab explains why it is empty.
- Tab bar is for navigation, never actions. Re-tapping the active tab scrolls to the top. No swiping between tabs.
- Active tab: filled icon plus an indicator; inactive icons keep 3:1 contrast.
- On wide screens use a side rail instead of a bottom bar.
- Sheets: a grabber on top, swipe or tap the dim to dismiss, a clear Cancel next to any Done, one sheet at a time, and full-screen views for long multi-step tasks.

## What we deliberately don't take

- Mascots, hearts, gems, leagues and any "you'll lose your streak" pressure (constitution V: no dark patterns).
- Locked content behind payment, "Get Pro" badges and paywalls (pilot has no payments).
- Dark-mode-only art panels: we stay light-first like the figures, with a full dark theme.

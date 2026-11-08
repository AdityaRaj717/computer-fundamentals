# Computer Fundamentals: Network+ pilot

An app that teaches how computers and networks work through **interactive figures you touch**, instead of walls of text or passive video. No coding needed by the learner.

The first thing being built is a **pilot**: one CompTIA Network+ (N10-009) module of four lessons, to find out whether this way of teaching works before building more. Working title in the constitution is "Under the Hood"; the real product name is **not decided yet**, so use a neutral placeholder.

> Contributing with Claude Code? Start Claude in this folder. It reads [CLAUDE.md](CLAUDE.md) automatically, which has the rules and decisions it needs. You should still read this README once.

---

## 1. What the product is (2-minute version)

- **Who it's for:** adults switching careers into IT, studying for Network+ on their phone in 5–8 minute sessions. They paid ~$358 for the exam voucher, so they need to pass, not be entertained.
- **The story:** the learner is the new junior network tech at **Brew & Byte**, a fictional café chain. Each lesson is a help-desk ticket that gets closed.
- **The four pilot lessons:**

| Ticket | Hook | Concept | Objective | Status |
|---|---|---|---|---|
| 1041 | "The till tablet can't print." | OSI model | 1.1 | **Built** (OSI cabinet figure) |
| 1042 | "Card payments fail but the web works." | Ports and protocols | 1.4 | Not built (Port Match drill exists) |
| 1043 | "The new branch needs its own network." | IPv4 and subnetting | 1.7 | Not built |
| 1044 | "Friday rush: nothing works." | Troubleshooting capstone | 5.1 | Not built |

- **The core idea:** the figure *is* the lesson. It fills most of the screen, the learner acts on it (open, drag, slide, break), and a wrong answer replays on the figure what that answer would actually do. Text stays at about 60 words per step at most.

Full detail: [PRODUCT.md](PRODUCT.md) (one page) → [specs/001-netplus-pilot/spec.md](specs/001-netplus-pilot/spec.md) (user stories, requirements, success numbers).

---

## 2. Current state (as of 2026-11-09)

**Working now, in `app/`:**
- The full app shell: Welcome / sign-in (guest-first), and four tabs: **Today**, **Learn**, **Practice**, **Progress**, plus Profile, a ticket page, lesson-done page, 404.
- **Lesson 1 (ticket 1041), OSI model**, end to end, using the interactive **OSI cabinet** figure (`app/src/figures/osi/`): a seven-drawer cabinet, a lift that carries the print job down the layers, a cable to the printer.
- **Practice quizzes** for ticket 1041.
- **Port Match drill** (12 well-known ports, objective 1.4).
- **Share page** for a figure (`#/fig/osi`).
- Light / dark / system theme. Progress, ratings and email are saved in the browser (`localStorage`) only. Nothing is sent to a server; there is no backend.
- `npm run build` passes (one warning: the main JS chunk is just over 500 kB).

**Not built yet:**
- Lessons 2, 3, 4 and their figures (ideas for each figure are in [docs/illustration-stack.md](docs/illustration-stack.md), section "Starting ideas"). Their tickets show as "soon" (`ready: false` in `app/src/app/content.ts`).
- Subnet Sprint drill, week summary with real data, analytics/events for the success criteria.
- Android build (Capacitor is planned, not set up).
- Out of scope for the pilot entirely: payments, accounts, offline downloads, other subjects, AI tutor.

**Superseded, kept for reference only:**
- `prototype/`: the first single-file HTML prototype, built with the **Hairline** figure library. Hairline was **dropped on 2026-11-08** in favour of Anatomy. Don't build on it.
- `.impeccable/mocks/`: design explorations and rejected/approved mock directions from earlier sessions.

**Known inconsistency:** `.specify/memory/constitution.md` ("Content Standards") still says figures use Hairline's line style. That's out of date: figures are Anatomy now. Per the constitution's own rules, fixing it needs a version bump.

---

## 3. Run it

Needs Node.js 20+ and git.

```bash
git clone https://github.com/AdityaRaj717/computer-fundamentals.git
cd computer-fundamentals
```

Get the Anatomy skill (a separate public MIT repo, not committed here; you need it to build or change figures, not to run the app):

```bash
git clone https://github.com/wheresryan22/anatomy.git .claude/skills/anatomy
```

Run the app:

```bash
cd app
npm install
npm run dev
```

Open http://localhost:5173. Other scripts: `npm run build` (typecheck + production build), `npm run typecheck`, `npm run preview`.

Routing is hash-based (`#/learn`, `#/lesson/1041`, `#/practice/ports`, `#/fig/osi`) so links work from any static host.

---

## 4. Map of the repo

```
PRODUCT.md                  One-page product summary. Read first.
market-research.md          Network+ market research.
specs/001-netplus-pilot/    The pilot spec (spec-kit format).
.specify/memory/constitution.md   Binding product rules. Overrides other guidance.
docs/
  product-brief.md          Full product brief + ideas backlog (later tracks: CS students, system design, school).
  illustration-stack.md     HOW TO BUILD FIGURES. Required reading before touching app/src/figures.
  ui-references.md          What the app screens borrow from Duolingo, Brilliant, Elevate etc. (principles, not copies).
  content-sourcing.md       Where lesson facts come from and how they're checked.
  content/networking-concept-list.md   Networking concepts list for future lessons.
  global-market-research.md, one-app-or-many.md   Strategy research (one app with many courses was the proposal).
app/                        The real app: React 19 + TypeScript + Vite + Tailwind 4 + shadcn/ui.
  src/App.tsx               Picks the screen for each route.
  src/app/router.ts         Tiny hash router (all routes listed in the Route type).
  src/app/store.ts          App state + localStorage persistence + actions.
  src/app/content.ts        Tickets, objectives, quiz questions, Port Match data, sources.
  src/pages/                One file per screen.
  src/lessons/l1/           Lesson 1 screen and its step content.
  src/components/app/       App shell (tab bar, rail, transitions) and shared UI pieces.
  src/components/ui/        shadcn components.
  src/figures/kit/          Anatomy drawing kit (copied from the skill).
  src/figures/osi/          The OSI cabinet figure. PARTS.md explains the object and every part.
prototype/                  OLD Hairline prototype. Reference only.
.impeccable/                Design-tool working files and mocks. Reference only.
.claude/                    Claude Code config: launch.json (dev servers), spec-kit skills.
.mcp.json                   MCP servers for the owner's FigCraft design tool (Windows paths; ignore if you don't have it).
```

---

## 5. How to read and understand everything (suggested order)

1. **This README.**
2. **[PRODUCT.md](PRODUCT.md)**: who, why, what's binding.
3. **[.specify/memory/constitution.md](.specify/memory/constitution.md)**: the non-negotiable rules (animation-first, ~60 words per step, touch-first, accessible, no ads in lessons, no dark patterns).
4. **[specs/001-netplus-pilot/spec.md](specs/001-netplus-pilot/spec.md)**: the four lessons, the five user stories, requirements and the go/no-go numbers.
5. **Run the app** and play through ticket 1041 on a phone-sized window. This is the fastest way to "get it".
6. **[docs/illustration-stack.md](docs/illustration-stack.md)** + **[app/src/figures/osi/PARTS.md](app/src/figures/osi/PARTS.md)**: how a figure is designed and built. Then read `app/src/figures/osi/` in this order: `model.ts` → `view.ts` → `geometry.ts` → `frame.ts` → `art.tsx` → `live.tsx` → `figure.tsx`.
7. **Code tour:** `app/src/App.tsx` → `app/router.ts` → `app/store.ts` → `app/content.ts` → `lessons/l1/LessonOne.tsx`.
8. Only if you need background: `docs/product-brief.md`, `docs/ui-references.md`, `market-research.md`.

---

## 6. Contributing

- Work on a branch and open a pull request into `main`. Don't push to `main` directly.
- Before a PR: `npm run build` in `app/` passes, no console errors, the screen works at 390 px wide with no sideways scroll, by touch and keyboard, and with reduced motion on.
- New lessons follow the same shape: hook → guided figure tour → predict → free play / break it → recap → 3–5 questions.
- All questions are original. CompTIA and Network+ are CompTIA trademarks; the app must say it isn't affiliated with or endorsed by CompTIA.
- No invented users, testimonials, ratings or results anywhere. None exist yet.
- Good first tasks: Lesson 2 (ports, "building with numbered doors" figure), the Subnet Sprint drill, or splitting the 500 kB JS chunk.

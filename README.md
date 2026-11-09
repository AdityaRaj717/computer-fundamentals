# Computer Fundamentals: Network+ pilot

An app that teaches how computers and networks work through **interactive figures you touch**, instead of walls of text or passive video. The learner never writes code.

The first thing being built is a **pilot**: one CompTIA Network+ (N10-009) module of four lessons, to find out whether this way of teaching works before building more. The constitution uses the working title "Under the Hood", but the real product name is **not decided yet**. Use a neutral placeholder.

This README is written to be read on its own, by a person or by an AI assistant (ChatGPT, Claude or another) that can't open the other files. Sections 1–8 explain the product, the rules and the design. Sections 9–13 are about the code and how to contribute.

> Contributing with Claude Code? Start Claude in this folder. It reads [CLAUDE.md](CLAUDE.md) automatically, which has the rules and decisions it needs. You should still read this README once.

---

## Contents

1. [The product in two minutes](#1-the-product-in-two-minutes)
2. [Who it's for](#2-whos-it-for)
3. [The pilot module: four tickets at Brew & Byte](#3-the-pilot-module-four-tickets-at-brew--byte)
4. [How a lesson works](#4-how-a-lesson-works)
5. [Practice, drills and sharing](#5-practice-drills-and-sharing)
6. [Binding product rules (the constitution)](#6-binding-product-rules-the-constitution)
7. [How figures are built (Anatomy)](#7-how-figures-are-built-anatomy)
8. [How the app screens should look](#8-how-the-app-screens-should-look)
9. [Current state](#9-current-state-as-of-2026-11-09)
10. [Run it](#10-run-it)
11. [Map of the repo and the code](#11-map-of-the-repo-and-the-code)
12. [Beyond the pilot: business model and roadmap](#12-beyond-the-pilot-business-model-and-roadmap)
13. [Contributing](#13-contributing)
14. [Glossary](#14-glossary)
15. [Notes for AI assistants](#15-notes-for-ai-assistants)

---

## 1. The product in two minutes

- **The idea:** the figure *is* the lesson. Each concept is shown as a small, touchable machine whose working is the concept (for example, the OSI model is a seven-drawer cabinet). It fills most of the phone screen. The learner opens, drags, slides and breaks it. A short readout on the figure gives the feedback. Text stays at about 60 words per step at most.
- **Wrong answers replay:** when a learner picks a wrong answer, the figure plays out what that answer would really do, then shows the right one. This is called **mistake replay**.
- **The story:** the learner is the new junior network tech at **Brew & Byte**, a fictional café chain. Each lesson is a help-desk ticket from a member of staff, and the lesson ends when the ticket is closed.
- **The platform:** a web app, phone browser first, desktop also works. An Android build (Capacitor) comes after the pilot.
- **Where learners come from:** the founder's YouTube videos and Shorts, made from the same figures, and Network+ communities. Any figure can be shared as a link that opens in a browser with no install.
- **What makes it different from competitors:** notes-and-quiz apps are walls of text, video courses (Professor Messer, YouTube) are passive, and cert-prep apps are question banks with no teaching. The existing visual tools are simulators with input boxes. This app tells a story step by step on a figure, then lets you play with it, predict it and break it. It also avoids the most common one-star complaints about competing apps: no lives or hearts, no paywall creep over lessons that were free, and honest trials.

---

## 2. Who it's for

**Primary (the paying audience): adults moving into IT** who are studying for CompTIA exams. Network+ first, then Security+ and A+. Mainly in the US, UK, Canada and Australia. Many have no IT background. They study on their phone in 5–8 minute sessions around a day job (commute, lunch, evenings). They pay real money for the exam (the Network+ voucher is $369 retail), so they need to pass, not to be entertained. The tone is calm, precise and exam-relevant, never childish.

**Secondary (free reach, same lessons): CS students worldwide, India first** (campus placements, the GATE exam, semester exams). They use the same free teaching lessons. Paid practice for them comes later at regional prices.

**Later tracks:** working developers learning what's under the hood before system design interviews, university CS courses, then school CS (GCSE, A-level, AP CSP).

About the Network+ N10-009 exam: five domains, multiple-choice and performance-based (hands-on) questions, 90 minutes, pass mark 720 out of 900. Troubleshooting is the largest domain (24%).

No real users, testimonials, ratings or results exist yet.

---

## 3. The pilot module: four tickets at Brew & Byte

The module is called **"Your first week as a network tech"**. Each lesson is one ticket on one day. The last lesson brings the first three together.

| Day | Ticket | Hook | Concept | Network+ objective | Figure idea | Status |
|---|---|---|---|---|---|---|
| 1 | 1041 | "The till tablet can't print." | OSI model: a message goes down the layers, across the wire, and up again. Finding which layer is broken. | 1.1 OSI reference model | Seven-drawer cabinet with a lift | **Built** |
| 2 | 1042 | "Card payments fail but the web works." | Ports and protocols: a server as a building with numbered doors; firewalls close doors. | 1.4 Ports, protocols, services | Building front with numbered service doors behind a firewall gate | Not built (the Port Match drill exists) |
| 3 | 1043 | "The new branch needs its own network." | IPv4 addressing and subnetting: slicing an address block with a mask. | 1.7 IPv4 addressing | Cutting jig: a 32-block bar with a sliding fence at the prefix length | Not built |
| 4 | 1044 | "Friday rush: nothing works." | Troubleshooting capstone: CompTIA's 7-step method on a café network with several faults. | 5.1 Troubleshooting methodology | Test bench with probes and a dial/LED readout | Not built |

The figure ideas for tickets 1042–1044 are starting points. The owner decides the final object for each concept before it's built.

**Why these four:** subnetting, ports and the OSI model are the topics Network+ learners say they struggle with or have to memorise. Troubleshooting is the biggest exam domain. Together they cover both question styles on the exam.

**What the pilot has to find out:**
1. Do interactive figures teach Network+ topics better, and more enjoyably, than videos and flashcards?
2. Which lesson ingredients (story tickets, predict-then-reveal, break-it, mistake replay, exam-style visual questions) make people finish and come back?
3. Will people share figures, and leave an email to hear about the next module?

**Go/no-go numbers for building module 2:**
- 60%+ of people who start lesson 1 finish it.
- 30%+ of lesson 1 finishers close all four tickets.
- Average lesson rating of 4.2/5 or higher.
- 70%+ first-try accuracy on practice. After lesson 3, 7 of 10 test learners solve a /26 subnet question in under 2 minutes.
- 25%+ of lesson finishers play a drill again on a later day.
- 5%+ of visitors leave an email, and 15%+ arrive through a shared link.
- Each figure is interactive in under 3 seconds on a 4G phone and runs smoothly on a 2 GB RAM Android phone.
- For each lesson ingredient, events show whether it raises the finish rate or the rating. This gives a keep/cut list for module 2.

If the finish, completion, rating and email/share targets are met, the plan is to expand to a full set of Network+ modules. If not, the lessons get reworked first.

---

## 4. How a lesson works

Every lesson has the same shape:

1. **Hook:** the ticket, with a sender (for example "Jo, Barista") and the problem in one line.
2. **Guided figure tour:** the learner taps through steps. Each step is one state of the figure plus a line or two of text.
3. **Predict:** before something plays, the learner guesses what will happen. Then the real outcome plays, with right/wrong feedback and a reason. Every lesson has at least two of these.
4. **Free play / break it:** the learner breaks a part (unplug a cable, give the printer the wrong IP, crash a service) and sees the result. Lessons 1, 2 and 4 must have this.
5. **Recap:** what was learned, the Network+ objective numbers, sources, and a "last reviewed" date.
6. **Practice questions:** 4–6 per lesson (section 5).
7. **Interview answer card** (a 30-second model answer to compare against your own).

Other lesson features from the spec:
- **X-ray:** any packet in a figure can be tapped to show what each layer added (addresses, port, data).
- **"Try it on your computer"** boxes (`ipconfig`, `ping`, `tracert`) are optional. The lesson never depends on them.
- **Report an error** on any step, recorded with the lesson and step.
- Leaving mid-lesson resumes at the same step on the same device.
- An old browser that can't draw the figure gets a static image-and-text version.

### Example: lesson 1 (ticket 1041), as built

Jo, a barista, reports that the till tablet can't print. The figure is the **OSI cabinet**: a seven-drawer filing cabinet that stands for the tablet's network stack.
- Each drawer holds the envelope its layer adds, sized by the real header bytes (TCP 20 B, IP 20 B, Ethernet 14 B plus a 4 B checksum, an 8 B preamble).
- A lift on the side carries Jo's print job down past every drawer, and the job grows one plate per header on the way down.
- At the bottom it leaves as bits through a jack and a cable to a receipt printer.
- **Predict:** "The printer cable is unplugged. Which layer fails first?" The learner picks a layer, the lift plays, and the job stops at layer 1, Physical.
- **Close:** the learner taps the plug to push it back in, sends a test page, and the receipt prints. Ticket closed.
- The lesson is honest about simplifying: "in TCP/IP the app does the jobs of layers 5 and 6."

---

## 5. Practice, drills and sharing

- **Practice:** 4–6 questions after each lesson, each tagged with its Network+ objective. At least two are performance-style and answered on a figure: drag protocols onto port numbers, place devices on a diagram, set a subnet by moving the mask slider. Wrong answers trigger mistake replay.
- **Port Match drill:** match well-known port numbers to protocols against the clock (12 ports). Score, time and personal best. Missed ports come back more often. **Built.**
- **Subnet Sprint drill:** five fast subnetting questions. Not built yet.
- **Due for review list:** built from wrong answers and drill misses, shown on the module home.
- **Week summary:** after lesson 4, the objectives covered and practice accuracy per objective.
- **Sharing:** every figure has its own link (for example `#/fig/osi`) that opens an interactive version with no install or sign-up, and offers "do the full ticket".
- **Feedback:** at the end of each lesson, a 1–5 rating, an optional comment, and an optional "email me when the next module ships" field with a clear privacy note. With the email, one optional question: "What's your goal?" (an IT certification / a CS student / a developer / just curious).
- **Measurement (planned):** anonymous events for lesson start, steps reached, predict answers, break-it uses, x-ray opens, mistake replays, question results, drill plays, lesson finish, rating, shares, emails and goal chosen.
- Drill timers can be turned off, and turn off with reduced motion. Drills then score accuracy only.

**Out of scope for the pilot:** payments, accounts and sync, offline downloads, other modules and tracks, video export (the founder records clips by hand), AI tutor.

---

## 6. Binding product rules (the constitution)

The file `.specify/memory/constitution.md` (version 1.0.1) overrides every other guide in the repo. In short:

1. **Show, don't tell.** Every concept is taught through an interactive figure the learner touches and steps through. Text supports the figure and never replaces it. About 60 words per lesson step at most. If a concept can't be shown, the lesson isn't ready.
2. **Accurate, and honest about simplifying.** Every lesson is checked against at least one cited, authoritative source. Simplified models are labelled as simplified. Each lesson shows a "last reviewed" date and a "report an error" control. Confirmed errors are fixed within 7 days.
3. **Touch-first, works everywhere.** Works by tap or drag, by keyboard, and with reduced motion (no autoplay). A downloaded module works offline (later). Runs smoothly on a 2 GB RAM Android phone; the first figure is interactive in under 3 seconds on 4G.
4. **Learning that sticks.** Lessons are 7 minutes or less and use active recall: predict before reveal, questions right after each lesson, spaced review later. Watching without doing is not a lesson.
5. **Respect the learner.** No ads inside lessons, practice or review. Content released as free stays free. No dark patterns: no fake timers, no guilt-trip streak notifications, cancelling is as easy as subscribing. Prices shown clearly in local currency.
6. **One library, many tracks.** Core lessons are written once and are track-neutral. Tracks (Placement, Cert, Systems, School) add mapping, callouts and their own question banks on top. They never fork the core lessons.
7. **Shareable by design.** Every figure is shareable as a link that opens in a browser, and (later) exportable as a short video clip.

Content standards: one visual language for every figure (Anatomy's isometric style), one meaning per colour, and a highlight always means "look here now". Plain international English, culture-neutral in core lessons. All explanations and questions are original: no copying textbooks, competitors or exam questions. CompTIA and Network+ are CompTIA trademarks, and the app must say it isn't affiliated with or endorsed by CompTIA.

Accessibility: WCAG 2.2 AA contrast, every figure has a text description and a static fallback, nothing depends on colour alone, drag always has a tap-to-select alternative, layouts work at 320 px wide.

Privacy: an account is optional for learning. In the pilot there is no backend at all, and everything is stored in the browser's `localStorage`.

---

## 7. How figures are built (Anatomy)

Figures are made with **Anatomy**, a Claude skill plus a small drawing kit (public MIT repo `wheresryan22/anatomy`, cloned into `.claude/skills/anatomy`). The full guide is [docs/illustration-stack.md](docs/illustration-stack.md).

- **Invent a real object** whose motion is the concept, in one sentence ("a lift carries the job down past seven drawers"). Not boxes, arrows and labels.
- **Build it from small solid parts:** 40–80 isometric parts for a normal figure, 80–150 for a "hero" one, four-tone shading, painted back to front, inside a card with a live readout.
- **Truth first:** one small pure model (`model.ts`) holds the real numbers and behaviour. The readout, the motion, the caption and the screen-reader text all read from it.
- **No words inside a figure.** Names go in a corner readout.
- **Figures are the main thing on screen:** on a 390×844 phone, the figure card is full width and about 55–65% of the height. Lesson text and controls sit in a compact sheet below.
- **One owner of motion per figure:** Anatomy figures run their own animation loop. Motion (the animation library) animates the app around the figure, never inside it.
- **Checks:** Anatomy's scripts capture PNGs of each pose and check for stray line ends (`lines.mjs` must print `line ends: 0` in every resting pose).

Other figure tools: **React Flow** (`@xyflow/react`) for hands-on wiring and "connect the devices" tasks, **Motion** (`motion/react`) for UI transitions, and **react-three-fiber** only if a lesson truly needs 3D.

**Hairline**, an earlier line-drawing figure library, was **dropped on 2026-11-08**. The `prototype/` folder is the old Hairline build, kept for reference only.

---

## 8. How the app screens should look

- **Finish:** like today's best mobile apps (Brilliant, Duolingo without the cartoons, Headspace, Revolut, Apple Fitness), not a printed form. Big confident type, generous space, continuous rounded corners, layered surfaces with real depth, tab bars and sheets, touch targets of 44 px or more.
- **Avoid:** 1 px rules everywhere, tiny grey labels, sharp 2 px corners, figures boxed in "plates".
- **Approved tone:** friendly. A sender on each ticket, a tint per exam objective, softer shapes, reassuring copy. An earlier, denser version was rejected. The figure keeps its own tone system; the tint comes in through the card and page around it.
- **Design pipeline (owner's tools):** UI references (a Lazyweb board, see [docs/ui-references.md](docs/ui-references.md)) → impeccable's `distill` and `clarify` → ui-ux-pro-max as an anti-slop check → screens drawn in **FigCraft** (a Figma-class design tool) → owner review → built in code. Details are in [CLAUDE.md](CLAUDE.md), "Skills and tools".

---

## 9. Current state (as of 2026-11-09)

**Working now, in `app/`:**
- The full app shell: Welcome and sign-in (guest first), four tabs (**Today**, **Learn**, **Practice**, **Progress**), plus Profile, a ticket page, a lesson-done page and a 404 page.
- **Lesson 1 (ticket 1041), OSI model**, end to end, with the interactive OSI cabinet figure.
- **Practice quizzes** for ticket 1041.
- **Port Match drill** (12 well-known ports, objective 1.4).
- **Share page** for a figure (`#/fig/osi`).
- Light, dark and system themes. Progress, ratings and email are saved in `localStorage` only. Nothing is sent to a server.
- `npm run build` passes, with one warning: the main JS chunk is just over 500 kB.

**Not built yet:**
- Lessons 2, 3 and 4 and their figures. Their tickets show as "soon" (`ready: false` in `app/src/app/content.ts`).
- Subnet Sprint drill, the week summary with real data, and analytics events for the success numbers.
- The Android build (Capacitor is planned, not set up).

**Superseded, kept for reference only:**
- `prototype/`: the first single-file HTML prototype, built with Hairline. Don't build on it.
- `.impeccable/mocks/`: design explorations and rejected or approved mock directions from earlier sessions.

---

## 10. Run it

Needs Node.js 20+ and git.

```bash
git clone https://github.com/AdityaRaj717/computer-fundamentals.git
cd computer-fundamentals
```

Get the Anatomy skill (not committed here; you need it to build or change figures, not to run the app):

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

Routing is hash-based so links work from any static host. Routes: `#/welcome`, `#/signin`, `#/` (Today), `#/learn`, `#/ticket/1041`, `#/lesson/1041`, `#/lesson/1041/done`, `#/practice`, `#/practice/1041` (quiz), `#/practice/ports`, `#/progress`, `#/profile`, `#/fig/osi`.

---

## 11. Map of the repo and the code

**Tech stack:** React 19, TypeScript, Vite, Tailwind CSS 4, shadcn/ui (on Radix), lucide icons, Motion, React Flow. Capacitor for Android later. No backend.

```
README.md                   This file.
CLAUDE.md                   Rules and decisions for Claude Code sessions, plus which skills and tools to use.
PRODUCT.md                  One-page product summary.
market-research.md          Network+ market research.
specs/001-netplus-pilot/    The pilot spec (spec-kit format): user stories, requirements, success numbers.
.specify/memory/constitution.md   Binding product rules. Overrides other guidance.
docs/
  product-brief.md          Full product brief, curriculum, business model, roadmap, ideas backlog.
  illustration-stack.md     How to build figures. Required reading before touching app/src/figures.
  ui-references.md          What the screens borrow from Duolingo, Brilliant and others (principles, not copies).
  content-sourcing.md       Where lesson facts come from and how they're checked.
  content/networking-concept-list.md   Networking concepts for future lessons.
  global-market-research.md, one-app-or-many.md   Strategy research (one app with many courses was chosen).
app/                        The real app.
  src/App.tsx               Picks the screen for each route.
  src/app/router.ts         Tiny hash router (every route is in the Route type).
  src/app/store.ts          App state, localStorage persistence and actions.
  src/app/content.ts        Tickets, objectives, quiz questions, Port Match data, sources.
  src/pages/                One file per screen (Today, Learn, Practice, Progress, Profile, Quiz, PortMatch, ...).
  src/lessons/l1/           Lesson 1 screen (LessonOne.tsx) and its words (content.ts).
  src/components/app/       App shell (tab bar, side rail, transitions) and shared UI pieces.
  src/components/ui/        shadcn components.
  src/figures/kit/          Anatomy drawing kit (copied from the skill).
  src/figures/osi/          The OSI cabinet figure. PARTS.md describes the object and every part.
prototype/                  Old Hairline prototype. Reference only.
.impeccable/                Design-tool working files and mocks. Reference only.
.claude/                    Claude Code config: launch.json (dev servers), spec-kit skills.
.mcp.json                   MCP servers for the owner's FigCraft design tool (Windows paths).
```

**How a figure's code is split** (read `app/src/figures/osi/` in this order): `model.ts` (the pure truth: layers, header sizes, states) → `view.ts` (the camera and what each state looks like) → `geometry.ts` (the parts) → `frame.ts` (one frame of the animation) → `art.tsx` (the SVG) → `live.tsx` (the animation loop) → `figure.tsx` (the React component with its readout).

**Suggested reading order for a new contributor:** this README → `PRODUCT.md` → the constitution → the pilot spec → run the app and play ticket 1041 in a phone-sized window → `docs/illustration-stack.md` and `app/src/figures/osi/PARTS.md` → `App.tsx`, `router.ts`, `store.ts`, `content.ts`, `lessons/l1/LessonOne.tsx`.

---

## 12. Beyond the pilot: business model and roadmap

These are plans and hypotheses, not decisions that are built.

**One app, many courses.** Subjects are courses inside one app, not separate apps, because the subjects link to each other, one subscription grows in value with each module, and it's one codebase for a solo founder.

**Curriculum order after networking:** Security basics (for Security+ SY0-801), How a computer works, Operating systems, Databases, Systems foundations (load balancers, caching, queues), Computer architecture, visual data structures and algorithms, Cloud basics.

**Business model:** charge for practice depth and exam readiness, never for understanding.
- Free forever: every teaching lesson, all figures, predict / break-it / mistake replay, the basic review queue, drills and sharing.
- Pro (later): exam-mapped question banks, performance-based question simulations and timed mock exams, a readiness heat map, an exam-date planner, "night-before" rapid revision, offline packs, interview answer cards.
- Pricing to test, by region (purchasing power): around $59.99/year in tier 1 countries, about half that in tier 2, and about a quarter in tier 3 (India: ₹1,199/year). Honest 14-day trials with a reminder before billing and one-tap cancel. No lifetime plan at launch.

**Roadmap:**
1. Pilot (now): the four-lesson Network+ module on the web.
2. MVP: full networking module, lesson engine, practice, offline, share links; web + Android.
3. Security (by June 2027, when Security+ SY0-701 retires): Security basics module, Pro launch with regional pricing, iOS.
4. Placement pack (timed to the July–December placement season in India): How a computer works, Operating systems, Databases.
5. Expand: developer/systems track, more modules, school and university licences, and an AI "ask about this figure" tutor that knows the figure's exact state.

---

## 13. Contributing

- Work on a branch and open a pull request into `main`. Don't push to `main` directly. One lesson or feature per PR.
- Before a PR: `npm run build` in `app/` passes, no console errors (including React key warnings), the screen works at 390 px wide with no sideways scroll, by touch and by keyboard, and with reduced motion on.
- New lessons follow the lesson shape in section 4. Use the spec-kit skills for a new lesson: spec → plan → tasks.
- Show the owner the first version of any new figure before building the rest of a lesson around it.
- All questions are original. No invented users, testimonials, ratings or results anywhere.
- Good first tasks: lesson 2 (ports, the "building with numbered doors" figure), the Subnet Sprint drill, or splitting the 500 kB JS chunk.

---

## 14. Glossary

| Term | Meaning here |
|---|---|
| **Network+ (N10-009)** | CompTIA's entry-level networking certification exam, current version. |
| **Objective** | A numbered topic in the official exam objectives, for example 1.1 (OSI model). Every lesson and question is tagged with one. |
| **PBQ** | Performance-based question: a hands-on exam task (drag, configure, place) rather than multiple choice. |
| **Brew & Byte** | The fictional café chain where the learner works as a junior network tech. |
| **Ticket** | One lesson, framed as a help-desk ticket (1041–1044) that the learner closes. |
| **Figure** | The interactive machine that teaches the concept. It takes most of the screen. |
| **Readout** | The small corner panel in the figure card that names parts and shows live values and feedback. |
| **Predict-then-reveal** | The learner guesses what happens before the figure plays it. |
| **Break it** | The learner breaks part of the figure on purpose and watches the result. |
| **Mistake replay** | A wrong answer plays out on the figure before the right answer is shown. |
| **X-ray** | Tapping a packet to see what each layer added to it. |
| **Track** | An audience lens (Cert, Placement, Systems, School) that adds mapping and questions on top of the shared core lessons. |
| **Anatomy** | The Claude skill and drawing kit used to build figures. |
| **Hairline** | The old figure library. Dropped. |
| **Spec-kit** | The spec → plan → tasks workflow used to plan features (`specs/`, `.specify/`). |
| **FigCraft** | The owner's Figma-class design tool, used to design screens before they're coded. |

---

## 15. Notes for AI assistants

If you're an AI assistant reading this to help with the project:

- **What's binding:** the constitution (section 6) first, then `PRODUCT.md`, then the pilot spec, then `docs/illustration-stack.md`. Where this README and those files disagree, those files win.
- **Decisions already made, don't reopen them:** the stack (React + TypeScript + Vite + Tailwind + shadcn), Anatomy for figures, Hairline dropped, figures take most of the screen, no words inside figures, friendly screen tone, no backend in the pilot.
- **Still open:** the product name (use a placeholder), the exact objects for the figures in lessons 2–4, and which language comes after English.
- **Write in plain international English,** about 60 words per lesson step at most.
- **Never invent** users, reviews, ratings, results or real exam questions. Never copy textbook or competitor text.
- **When suggesting a figure,** describe a real physical object whose motion is the concept, not a diagram of boxes and arrows with labels.
- **Accessibility is not optional:** touch, keyboard, reduced motion, 320 px width, WCAG 2.2 AA, a text description for every figure.

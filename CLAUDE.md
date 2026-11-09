# CLAUDE.md: working on this repo

Read [README.md](README.md) first: it has the product summary, the current state, how to run the app and the reading order. This file adds the rules and the decisions already made, so you don't redo or undo them.

Two people work on this repo, each with their own Claude account: the owner (Aditya) and a collaborator. Neither Claude can see the other's memory or chat history. **Anything worth remembering for both goes into this file or `docs/`, not into private memory.**

## Sources of truth (in priority order)
1. `.specify/memory/constitution.md`: binding product rules. It overrides everything else.
2. `PRODUCT.md`: users, purpose, scope, constraints.
3. `specs/001-netplus-pilot/spec.md`: what the pilot must do.
4. `docs/illustration-stack.md`: how figures are built. Follow it in order.

## Decisions already made (don't reopen without asking the owner)
- **Stack:** React 19 + TypeScript + Vite + Tailwind 4 + shadcn/ui in `app/`. Capacitor for Android later. Hash routing.
- **Figures:** built with the **Anatomy** skill (`.claude/skills/anatomy`, clone it per the README). React Flow (`@xyflow/react`) for hands-on wiring/topology tasks, Motion (`motion/react`) for UI transitions, react-three-fiber only if a lesson truly needs 3D.
- **Hairline is dropped** (2026-11-08). `prototype/` is the old Hairline build. Don't build on it or copy its figures.
- **Figures are the lesson:** a figure takes most of the screen (on a 390×844 phone, about 55–65% of the height, full width). Learners act on the figure itself. The readout in the figure card is the feedback. Wrong answers replay on the figure.
- **No words inside a figure.** Names go in a corner readout. Never hand-draw boxy SVG figures; follow the Anatomy workflow (solid isometric parts, four-tone shading, a pure model driving parts and readout).
- **Show the owner the first version of any new figure** before building the rest of a lesson around it. Concept → physical object is decided with the owner (starting ideas for lessons 2–4 are in `docs/illustration-stack.md`).
- **App screen finish:** must look like today's best mobile apps (Brilliant, Duolingo without the cartoons, Headspace, Revolut, Apple Fitness), not a printed form. Big confident type, generous space, continuous rounded corners, layered surfaces with real depth, tab bars and sheets, 44 px+ touch targets. Avoid 1 px rules everywhere, tiny grey labels, sharp 2 px corners, figures boxed in "plates".
- **Approved tone of the screens:** friendly. A sender on each ticket, per-objective tints, softer shapes, reassuring copy. A first pass was rejected as too dense. Keep the figure's own tone system intact; bring the tint in through the card and page around it.
- **Product name is undecided.** Use a neutral placeholder.

## Hard rules
- About 60 words of text per lesson step at most. Plain international English.
- Touch first (no hover-only interactions), keyboard works, reduced motion turns off autoplay and timers, drag has a tap alternative, works at 320 px wide, WCAG 2.2 AA contrast, nothing depends on colour alone, every figure has a text description.
- All questions original. Never copy textbook, competitor or real exam text. Show that the app isn't affiliated with CompTIA.
- Never invent users, testimonials, ratings or results.
- No backend, accounts or payments in the pilot. Data stays in `localStorage`.

## Workflow
- Branch + pull request into `main`; don't push to `main` directly. Keep PRs to one lesson/feature.
- Before saying something is done: `npm run build` in `app/` passes, no console errors (including React key warnings), check at 390 px width, touch, keyboard and reduced motion.
- Dev server: `.claude/launch.json` defines `app` (port 5173) and `app-ui` (port 5180).
- Figure checks use the Anatomy scripts (`scripts/capture.mjs`, `lines.mjs`, `drive.mjs`; see `docs/illustration-stack.md` "Checking"). `lines.mjs` must print `line ends: 0` in every resting pose. The paths in that doc (`D:\tmp_render`, the Chrome path) are the owner's Windows machine; use your own temp folder.
- When you make a decision that changes any of the above, update this file in the same PR.

## Skills and tools: what to use for what

| Job | Use | Notes |
|---|---|---|
| New lesson or feature | Spec-kit skills: `/speckit-specify` → `/speckit-clarify` → `/speckit-plan` → `/speckit-tasks` → `/speckit-implement` | In `.claude/skills/`, work for anyone. `/speckit-analyze` checks spec, plan and tasks agree before you build. |
| Lesson figures | `anatomy` skill (`.claude/skills/anatomy`) | Follow `docs/illustration-stack.md` in order. React Flow for wiring/topology tasks, Motion for UI transitions, react-three-fiber only for real 3D. |
| App screens (design) | **FigCraft** (MCP in `.mcp.json`) | Screens are designed in FigCraft first, shown to the owner, then built in code. See "Screen design pipeline" below. |
| App screens (code) | React + Tailwind 4 + shadcn/ui in `app/` | Build from the approved FigCraft screens; don't redesign while coding. |
| Checking in the browser | Built-in browser + `.claude/launch.json` (`app`, `app-ui`) | 390 px width, touch, keyboard, reduced motion, console clean. |
| Finding code | `graft` (repo is indexed, see `graft/INDEX.md`) | Optional; plain grep is fine if you don't have it. |

**Not used here:** Hairline (dropped), `design-taste-frontend` (the taste skill), impeccable beyond `distill` and `clarify`, hand-drawn SVG figures.

### Screen design pipeline (in this order)
1. **References:** Lazyweb board linked in `docs/ui-references.md`, plus the apps named under "App screen finish". Don't re-research what that doc already records.
2. **impeccable:** only `distill` (cut density) and `clarify` (copy and hierarchy).
3. **ui-ux-pro-max:** only as an anti-slop check on the direction, not to generate it.
4. **FigCraft:** draw the screens at 390×844 (and check 320 px wide). Use auto layout, styles and variables, not loose shapes. Verify with `inspect_document` and `screenshot` before showing anyone. Save files under `design/` in this repo (FigCraft can only write inside the repo).
5. **Owner review** of the FigCraft screens, then build in `app/`.

FigCraft has two servers in `.mcp.json`: `figcraft` (headless, always works) and `figcraft-app` (attaches to the running FigCraft desktop app on port 7979, so the owner can watch; it only connects when the app is open). Both use the owner's Windows install path.

**Collaborator without these tools:** Lazyweb, impeccable, ui-ux-pro-max and FigCraft are the owner's. If they're missing, skip them, follow "App screen finish" above, build straight in `app/`, and say in the PR that the design pass wasn't run so the owner can do it.

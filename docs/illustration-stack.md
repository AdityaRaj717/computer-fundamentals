# Illustration stack: how to build the figures

Decided 2026-11-08: figures are the lesson. They take most of each screen, and learners touch, drag, predict and break them to see how networks work. This replaces Hairline.

| Job | Tool | Version checked |
|---|---|---|
| Lesson figures (the main thing on screen) | **Anatomy** kit + `/anatomy` skill, installed at `.claude/skills/anatomy` (commit 1482e84, MIT) | Oct 2026 |
| Hands-on wiring, topology, "connect the devices" tasks | **React Flow** `@xyflow/react` | 12.12.1 |
| UI transitions (sheets, steps, cards, feedback) | **Motion** `motion` (import from `motion/react`) | 14.10.1 |
| True 3D, only if a lesson really needs rotation in depth | **react-three-fiber** `@react-three/fiber` + `@react-three/drei` + `three` | 9.8.2 / 10.7.9 / 0.187.0 |

App stack around them (from `PRODUCT.md`): React 19 + TypeScript + Vite, Tailwind 4, shadcn/ui, Capacitor later. Versions checked on npm on 2026-11-08 (react 19.3.1, vite 8.3.6, @vitejs/plugin-react 6.2.1, tailwindcss 4.3.5).

**One rule across all four:** each figure has exactly one owner of its motion. Anatomy figures run their own `requestAnimationFrame` loop and write SVG attributes through refs. Never animate an Anatomy SVG with Motion, React state or CSS transitions on the same elements. Motion animates the app around the figure, never inside it.

---

## 1. Anatomy

### What it is
A Claude skill plus a drawing kit. You describe a concept, invent a **real physical machine whose working is the concept**, and build it from 40–150 small solid isometric parts with four-tone shading, painted back to front, in a card with a live readout. Every number shown comes from one small pure model that also moves the parts.

The skill is loaded in this project: run `/anatomy` or just ask for a figure. **Read `SKILL.md` in full before the first figure** (185 lines). Then read the references as the workflow needs them:

| When | Read (all under `.claude/skills/anatomy/`) |
|---|---|
| Before designing anything | `references/craft.md` (the look, the parts vocabulary with code, tones, painter's order, anti-patterns) |
| Before writing geometry | `references/kit.md` (sections 1–9 are what a flat-part figure needs; 10–12 for round parts, pipes and the audit) |
| Before making it live | `references/motion.md` |
| Before wiring it into React | `references/react.md`, then `examples/test-rig/` (the React production figure) |
| For a worked design | `references/walkthrough.md` (how the test rig went from concept to code) |
| Before checking it | `references/verify.md` (commands, the review checklist, faults and fixes) |
| Only for fire, glow, water or light | `references/webgl.md` |
| Only for parts that turn in true 3D | `references/3d.md` (beta) |
| Smallest full example | `examples/dial-indicator/build.mjs` (about 300 lines) |

### The workflow (from SKILL.md; follow it in order)
1. **Size it.** Figure = one mechanism, 40–80 parts, under about an hour. Hero = 80–150 parts, 2–4 h, say so first. Epic = don't start; propose a Hero instead. Have a page that opens in the browser within the first hour.
2. **Truth first.** Write the real numbers and behaviour as a pure model module (`model.ts`): sizes, counts, thresholds. The readout, motion, caption and aria text all read from it.
3. **Invent the object.** One sentence: what moves and what that motion means. Not boxes, arrows and labels.
4. **Parts list** of 40+ parts, grouped base / structure / mechanism / controls / subject. Every part sits on another part.
5. **Plan the world.** World units ≈ 1 px; x, y on the floor, z up. Camera azimuth 45° (35–60° to show a long side), elevation 30° (higher to look into something open). `fitProjection(points, w, h, { pad, azimuth })`.
6. **Build geometry once** with `slabOf`, `cylinder`, `extrude`, `planOutline`, `topTicks`, `knurl`, `coil`, `radialTicks`. Moving parts are built at rest and moved with `translateAlong`; only parts that change shape are rebuilt per frame.
7. **Paint back to front.** Sort with `depthOf`. Split wrapping parts (springs, frames) into back and front halves. With pipes, cables or round parts, record shapes in `A.recorder`, let `A.settle` set the keys, end with `A.auditOrExit`. Never tune keys by eye.
8. **Frame it.** Fig number, title, hint, live readout in the card corners; legend and a true caption under it. At most one tiny engraved label inside the drawing.
9. **Make it live.** One loop, time-based (`dt` clamped to 1/30 s), exponential follow or real springs, idle tour after ~1.4 s that pauses on input and resumes ~3.6 s later, stops offscreen, still under reduced motion.
10. **Verify like a critic** (below).

### Craft rules that get figures rejected if broken
- Solids, never wireframes. No see-through edges, no dashed hidden lines.
- Tones: base/feet `lo`, structure `mid`, subject `hi`, **exactly one `lit` accent** (the part to watch). Grooves `faint`.
- Every line ends on something: a face, another line or a terminal dot. No leader lines, balloons, dimension arrows, floating labels.
- No pipe or cable passes through anything, at rest or in any frame of motion.
- Textures end on a real edge or fade (`fade`, `fadeLineSvg`); seams on boxes use `k.sideSeam` as the slab's `inner`; ticks hang from a ruler strip's edge.
- Curved surfaces shade smoothly (smooth knots `[s, r, 1]`, analytic `smooth: { slope }` on big bodies).
- Not too abstract (floating stacked plates) and not too bland (one slab with lines). Fix both with a recognisable machine made of many small purposeful parts.
- Monochrome unless colour is the subject.
- Text a machine displays (an LCD, a counter) fits its window at the widest string and is clipped to it.
- The object fills 55–65% of the card and must still read at 390 px wide. If parts get too small on a phone, scale the SVG to 110–118% inside the card (see `examples/test-rig/stretch.css`).

### Using it in this app (Vite, not Next.js)
- Copy `kit/iso-kit.ts`, `kit/iso.css`, `kit/react/draw.tsx` and `kit/react/live.tsx` into the app, for example `app/src/figures/kit/`. Add `lathe.mjs`, `tube.mjs`, `audit.mjs` and `gl.mjs` only when a figure needs them. The kit has no dependencies apart from React.
- One folder per figure, following the test rig: `model.ts` (pure model), `view.ts` (layout constants and `P`), `geometry.ts` (static paths, computed once at module load), `pose.ts` or `frame.ts` (paths that change shape per frame), `art.tsx` (static parts as JSX), `live.tsx` (refs, loop, pointer, keyboard, aria, readout), `figure.tsx` (the card), and a scoped `.css`.
- Vite is a client-only app, so the server/client split in `react.md` doesn't apply: the `"use client"` lines are harmless, and geometry runs in the browser at module load. Still keep geometry in plain `.ts` modules, keep the static art as props passed to the one live component, and **key the root of every element prop** (`<g key="dial">`). It costs nothing and keeps the key warnings away.
- Import `iso.css` once. Put `className="iso"` and `data-theme="light"` on the figure wrapper (light is the theme Anatomy designs for first). Per-figure tokens go on the figure's own class, never on `:root`.
- Mobile: `touch-action: pan-y` on the stage, tap acts (there is no hover on touch), drag uses pointer capture, targets 44 px+. Keyboard: focusable root, `role="slider"` or `"group"` plus buttons, `aria-valuetext` written when the reader's choice changes, not every frame.
- The readout element carries `data-readout`. Write it with `useReadout().say(text)`, never through React state per frame.
- Hydration-safe habits still apply: render the rest pose first, start motion in effects.
- Rotations about z can't be a screen transform: rebuild the rotating paths each frame (cheap for a needle or a small part).

### Making figures the main thing on screen
- The figure takes most of the viewport (on a 390 × 844 phone, aim for the figure card to fill the width and roughly 55–65% of the height). The lesson text (about 60 words per step at most, per the constitution) and the controls sit in a compact sheet below.
- The figure is the control surface: learners act on the machine itself (press, drag, open, slide). Buttons outside it are for steps like "Play it" or "Check".
- The readout in the card is the feedback. Wrong answers replay on the figure (the learner's answer actually happens), as the spec requires.
- Keep one consistent scale and camera across the four lesson figures so they read as one set.
- **Theme and tints.** Anatomy's look is monochrome with one lit accent, and its tokens (`--anatomy-paper`, `--anatomy-card`, `--anatomy-shade-0..3`, `--anatomy-hi/mid/lo/faint/lit`, `--anatomy-red/green/blue`) make a theme. The user previously approved friendlier screens with per-objective tints. Keep the figure's tone system intact and bring the tint in through the card and page around it and, at most, the one lit accent. Show the user one tinted figure before applying it everywhere.

### Starting ideas: concept → object (decide with the user)
The skill's core step is inventing the object. These are starting points, not decisions:
- **OSI model (1.1):** a seven-drawer cabinet (Anatomy approves drawers for "layers"): each drawer is as deep as its layer's header, and opening one shows what lives there; or a sleeving machine on a conveyor that wraps a letter at seven stations (encapsulation) and unwraps it on the far side.
- **Ports and protocols (1.4):** a building front with numbered service doors (22, 25, 53, 80, 443, 3389…) on a firewall gate: a rule is a key that opens one door, and a packet waits at the door its port names.
- **IPv4 and subnetting (1.7):** a cutting jig: a 32-block bar on a ruler with a sliding fence at the prefix length. Network blocks lock, host blocks stay free, and the readout shows mask, network, broadcast and usable hosts.
- **Troubleshooting capstone (5.1):** a test bench with probes for the café network: the learner probes layer by layer, and a dial or LED readout tells them where the fault is.

### Checking (run these; read every PNG)
Commands run from `.claude/skills/anatomy/`. Chrome is at `C:\Program Files\Google\Chrome\Application\chrome.exe` and the scripts find it. Put screenshots in `D:\tmp_render\anatomy\` (C: is tight).
```
node scripts/capture.mjs <page.html or http://localhost:5173/...> --out D:/tmp_render/anatomy/desk.png
node scripts/capture.mjs <page> --out D:/tmp_render/anatomy/phone.png --width 390
node scripts/capture.mjs <page> --out D:/tmp_render/anatomy/joint.png --zoom x,y,w,h
node scripts/capture.mjs <page> --out D:/tmp_render/anatomy/still.png --reduced
node scripts/lines.mjs <page> --out D:/tmp_render/anatomy/lines.png
node scripts/drive.mjs <page> --actions steps.json --width 390
```
- On a Vite dev server, use `--select` to clip to one figure's `.iso-plate`.
- `lines.mjs` must print `line ends: 0` in every resting pose.
- With pipes, cables or round parts, the build's `--audit` must end `audit passed`.
- Zoom to 4× over every junction and look for: lines ending in mid-air, wrong overlap order, textures stopping mid-face, tone staircases, text crossing its window.
- No console errors, including React key warnings. Still at 390 px with no sideways scroll.
- The full checklist is `references/verify.md`, "The review checklist".
- Note (2026-11-08): the sandbox blocked running the skill's scripts in the research session. Expect a permission prompt the first time.

---

## 2. React Flow (`@xyflow/react` v12)

For tasks where the learner builds or fixes a network: drag devices, connect cables, find the broken link. Not for the main lesson figures.

**Setup rules (each is a common error in the docs):**
- `npm i @xyflow/react`. Import `{ ReactFlow, ... }` from `@xyflow/react` (not the old `reactflow` package) and **import `@xyflow/react/dist/style.css`** (or `base.css` when styling it all yourself). Without it, edges don't show.
- The parent element needs an explicit width and height.
- Define `nodeTypes` and `edgeTypes` **outside** the component (or `useMemo`); the `type` string must match the key exactly, case included.
- Memoise custom node and edge components (`React.memo`) and handler props (`useCallback`); memoise objects like `defaultEdgeOptions`.
- Controlled flow: keep `nodes` and `edges` in state and pass `onNodesChange`, `onEdgesChange`, `onConnect` (`addEdge`). Dragging a node without `onNodesChange` gives "node not initialized".
- `useReactFlow` only works inside a `<ReactFlowProvider>` that wraps the component calling it.
- Custom nodes need `<Handle>`s for edges to attach. Several handles of one type need distinct `id`s. Hide handles with `opacity: 0` or `visibility: hidden`, never `display: none`. After moving or adding handles, call `updateNodeInternals`.
- Custom edges: build the path with `getBezierPath` / `getSmoothStepPath` / `getStraightPath` from `sourceX/Y`, `targetX/Y` **and** `sourcePosition/targetPosition`, then render `<BaseEdge>`.
- Tailwind or other CSS must not set `overflow: hidden` on `.react-flow__edges`.
- Inputs inside nodes get `className="nodrag"`.
- Don't read the whole `nodes` array in components that render often; keep derived state (selection, "is the network working") in its own store field.

**For this app:**
- **Packets on cables:** a custom edge with an SVG `<circle>` moved along the path with `<animateMotion>`, or a node moved along an edge with the Web Animations API (`offset-path` plus `offsetDistance`); set that node `draggable: false` while it moves. Respect reduced motion: show the packet's end state instead.
- **Mobile:** connecting works by tap (tap a handle, then another; `connectOnClick` is on by default). Use a generous `connectionRadius`, `isValidConnection` to reject wrong ports with a teaching message, `fitView`, and lock what shouldn't move (`nodesDraggable`, `panOnDrag`, `zoomOnPinch`) so the page still scrolls. Test at 390 px.
- **Look:** nodes can carry small static isometric device drawings made with the Anatomy kit (a `figureSvg` / `<IsoFigure>` per device), so the task screens match the lesson figures. Keep them static; React Flow owns the motion on those screens.
- Theme with `colorMode` and the CSS variables in `style.css`, or `base.css` plus our own tokens.

---

## 3. Motion (`motion` v14)

For the app chrome only: step changes, bottom sheets, cards entering, the correct and wrong feedback, shared-element moves from the home card into a lesson.

- `npm i motion`; `import { motion, AnimatePresence, MotionConfig } from "motion/react"`. There are no breaking changes in 13→14 for React; 13 removed the optional `@emotion/is-prop-valid` (only matters with styled-components or Emotion).
- Wrap the app in `<MotionConfig reducedMotion="user">`: transform and layout animations switch off under Reduced Motion and opacity fades stay. Use `useReducedMotion()` for custom cases (no autoplay, no parallax).
- Bundle: `LazyMotion` + `m` (`import * as m from "motion/react-m"`) with `domAnimation` (+24 kB: animations, variants, exit, tap/hover/focus) or `domMax` (+38 kB: adds drag and layout). Use `<LazyMotion strict>` so a stray `motion.div` throws.
- Layout animations (`layout`, `layoutId`) use transforms: give children `layout` too to fix stretching, set `borderRadius` and `boxShadow` through `style`, add `layoutScroll` on scrollable parents and `layoutRoot` on fixed ones, and use `AnimatePresence` for exit animations. **Layout animations don't work on SVG**, which is another reason Motion stays out of the figures.
- Tap handlers make elements focusable (`tabindex="0"`); `whileFocus` behaves like `:focus-visible`.
- `motion.dev` has an "AI Kit" (`/motion upgrade`); we don't need it.

---

## 4. react-three-fiber (only if needed)

Use it only when a lesson's idea is a part moving in true depth that Anatomy's SVG (or its beta 3D mode) can't show. It needs React 19 (fiber 9). If used:
- Isometric look: `<OrthographicCamera makeDefault>` from drei, placed on the same 45°/30° camera as the SVG figures.
- Battery: `frameloop="demand"` and `invalidate()` on change; `dpr={[1, 1.5]}`.
- Mutate in `useFrame` with `delta`; never `setState` per frame or in fast pointer events; re-use vectors and materials (no `new THREE.Vector3()` in the loop); share geometries and materials; instance repeats; toggle `visible` instead of mounting and unmounting; load assets with `useLoader` / `useGLTF`.
- The canvas parent needs a size; stop the loop offscreen; give a static fallback image and a text description.

---

## 5. Project rules that still apply
- Read `PRODUCT.md`, `.specify/memory/constitution.md` and `specs/001-netplus-pilot/spec.md` before building. The old vanilla prototype in `prototype/` shows the flow (home → lesson → practice → drills → progress → share) and is the reference for content, not for figure style.
- Design bar (user feedback, Nov 2026): screens must look like today's best mobile apps (big confident type, generous spacing, rounded corners, layered surfaces with depth, tab bar and sheets, 44 px+ targets), friendly (sender on each ticket, reassuring copy), not printed forms.
- Commands meant for the user go one per code block, for cmd.exe. Temp files and renders go on D: (`D:\tmp_render`).
- Subagents: one at a time, Sonnet.

# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
delegated: React + TypeScript (Vite), Tailwind CSS with shadcn/ui components, wrapped for Android with Capacitor. Figures: the Anatomy kit (`.claude/skills/anatomy`, interactive isometric SVG figures with optional WebGL) for lesson figures, React Flow (`@xyflow/react`) for hands-on wiring and topology tasks, Motion (`motion/react`) for UI transitions, and react-three-fiber only if a lesson needs true 3D. Decided 2026-11-08, replacing Hairline. How to use them: `docs/illustration-stack.md`. Chosen because the pilot is web-first with shareable links, shadcn was offered by the user, and the user has Android Studio for the Android build later.

## Users
Primary (confirmed): adult career changers with no IT background who are moving into IT and studying for CompTIA Network+ (N10-009). They study on their phone in short sessions around a day job (commute, lunch, evenings) and are paying real money for the exam (~$358 voucher), so they need to pass, not to be entertained.

Later tracks (in the product brief, not this pilot): Indian CS students preparing for placements and GATE, developers learning system design, and school CS students.

## Product Purpose
Teach how computers and networks actually work through interactive animations instead of text or passive video, with no coding. The pilot is one Network+ module ("Your first week as a network tech"), 4 lessons framed as help-desk tickets at a fictional café chain, Brew & Byte. Success: learners finish lessons, understand the concepts well enough to answer exam-style questions, return for drills, share figures and ask for the next module (targets in `specs/001-netplus-pilot/spec.md`).

## Positioning
Guided, touchable figures that you can predict, break and fix, instead of walls of text (notes/MCQ apps), passive video (Professor Messer, YouTube) or question banks with no teaching (cert prep apps). Wrong answers replay what the learner's answer would actually do. Lessons are mapped to Network+ objectives, and the same figures become shareable links and short videos.

## Operating Context
- Used mostly on a phone browser, one-handed, in 5–8 minute sessions. Desktop browser also supported.
- Exam context: CompTIA Network+ N10-009, five domains, multiple-choice and performance-based questions, 90 minutes, pass mark 720/900.
- Story frame: the learner is the new junior network tech at Brew & Byte. Each lesson is a ticket that gets closed.
- Traffic comes from the founder's YouTube videos/Shorts built from the same figures, and from Network+ communities.

## Capabilities and Constraints
- Pilot scope: 4 lessons (OSI model 1.1, ports and protocols 1.4, IPv4 and subnetting 1.7, troubleshooting capstone 5.1), practice with performance-style questions, mistake replay, Port Match and Subnet Sprint drills, week summary, share links, ratings, email capture.
- Out of scope for the pilot: payments, accounts, offline downloads, other tracks and modules, AI tutor.
- Figures are the main thing on screen: interactive Anatomy figures (solid, shaded isometric machines whose working is the concept, with a live readout driven by a model) take most of each lesson screen, and text and controls stay small around them. Built with the `/anatomy` skill following `docs/illustration-stack.md`.
- Must work by touch (no hover), keyboard and reduced motion.
- All questions original. CompTIA and Network+ are CompTIA trademarks, and the app must say it isn't affiliated with or endorsed by CompTIA.
- Undecided: product name (placeholder in designs until chosen).

## Brand Commitments
- Name: undecided. Use a neutral placeholder.
- Figures: Anatomy's isometric figure style, interactive and taking most of the screen (binding).
- Product rules in `.specify/memory/constitution.md` are binding: animation-first, about 60 words of text per step at most, no ads inside lessons, free content stays free, no dark patterns.

## Evidence on Hand
- Market research: `market-research.md`. Product brief and ideas backlog: `docs/product-brief.md`. Pilot spec: `specs/001-netplus-pilot/spec.md`.
- Design references: a Lazyweb board of 16 lesson-app screens (private to the user's Lazyweb account).
- No users, testimonials, ratings or results exist yet. Do not invent any.

## Product Principles
1. Show, don't tell: the figure is the lesson, and text only supports it.
2. Respect adult learners: calm, precise and exam-relevant, never childish or manipulative.
3. Every interaction teaches: predicting, breaking and getting things wrong all show something real.
4. Honest about accuracy: simplifications are labelled, and sources and review dates are visible.
5. Built to be shared: any figure stands alone as a link.

## Accessibility & Inclusion
WCAG 2.2 AA contrast. Every figure has a text description and a static fallback. Nothing depends on colour alone. Reduced motion switches off autoplay and timers. Drag interactions have a tap-to-select alternative. Layouts work at 320 px wide.

# Feature Specification: Network+ Pilot Module

**Feature Branch**: `001-netplus-pilot`
**Created**: 2026-11-08
**Status**: Draft
**Input**: User description: "Start with Network+ first. Build a single module with a few lessons to see how it goes, and find what makes lessons and modules more interesting." (Product context: `docs/product-brief.md`.)

## Goal of this pilot
Answer three questions with real learners before building more:
1. Do interactive figures teach Network+ topics better and more enjoyably than videos and flashcards?
2. Which lesson ingredients (story tickets, predict-then-reveal, break-it, mistake replay, exam-style visual questions) make people finish and come back?
3. Will people share figures, and leave an email to get the next module?

## The module: "Your first week as a network tech"
The learner is the new junior network tech at **Brew & Byte**, a small, fictional café chain. Each lesson is one help-desk ticket on one day. Solving it teaches a Network+ objective. The last lesson brings everything together.

| # | Ticket (hook) | Concept | Network+ N10-009 objective |
|---|---|---|---|
| L1 | "The till tablet can't print." | OSI model: a message travels down the layers, across the wire, and up again. Finding which layer is broken. | 1.1 OSI reference model |
| L2 | "Card payments fail but the web works." | Ports and protocols: a server as a building with numbered doors; firewalls close doors. | 1.4 Ports, protocols, services |
| L3 | "The new branch needs its own network." | IPv4 addressing and subnetting: slicing an address block with a mask. | 1.7 IPv4 addressing |
| L4 | "Friday rush: nothing works." | Troubleshooting capstone: CompTIA's 7-step method applied to a café network with several faults, using L1–L3. | 5.1 Troubleshooting methodology |

Why these four: subnetting, ports and the OSI model are the topics Network+ learners say they struggle with or must memorise. Troubleshooting is the largest exam domain (24%). Together they cover both of the exam's question styles: multiple choice and performance-based (hands-on) questions.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Solve a ticket through an interactive lesson (Priority: P1)
A learner opens L1 and reads the ticket ("The till tablet can't print"). They step through a guided figure: the print job drops down the layer stack, crosses the cable, and climbs up on the printer. At key moments they predict what happens next before it plays. Then they get free-play with "break it" (unplug the cable, give the printer the wrong IP, crash the print service) and see which layer each fault lives in. The lesson ends with them closing the ticket by naming the fault.

**Why this priority**: This is the core bet. If this doesn't feel better than a video, the product doesn't work.

**Independent Test**: 10 people new to networking each do L1 alone. Each finishes in 8 minutes or less and can say which OSI layer three described faults belong to.

**Acceptance Scenarios**:
1. **Given** the lesson start, **When** the learner taps next, **Then** the figure moves one step and shows a line or two of text.
2. **Given** a predict step, **When** the learner chooses an answer, **Then** the real outcome plays, with right/wrong feedback and a reason.
3. **Given** free-play, **When** the learner breaks a part, **Then** the figure shows the result and names the affected layer.
4. **Given** reduced motion is on, **When** the lesson runs, **Then** nothing autoplays and every step is reachable by tapping.

---

### User Story 2 - Practise like the real exam (Priority: P1)
After each lesson the learner does 4–6 questions. Some are multiple choice. Others work like Network+ performance-based questions but on our figures: drag protocols onto port numbers, place devices on a diagram, pick the right subnet by moving the mask slider. A wrong answer triggers **mistake replay**: the figure plays out what the learner's answer would actually do (e.g. the payment goes to the wrong door and gets blocked), then shows the right one.

**Why this priority**: Exam-style practice is what Network+ learners pay for. Mistake replay is a new idea we need to test.

**Independent Test**: After L3, a learner answers a /26 subnetting question correctly in under 2 minutes.

**Acceptance Scenarios**:
1. **Given** a finished lesson, **When** practice opens, **Then** at least two questions are answered by manipulating a figure.
2. **Given** a wrong answer, **When** feedback shows, **Then** the figure replays the consequence of that wrong answer before showing the right one.
3. **Given** any question, **When** it's shown, **Then** it's tagged with its Network+ objective number.

---

### User Story 3 - Drill the things you must memorise (Priority: P2)
From L2 and L3 the learner gets two quick drills they can repeat any time: **Port Match** (match port numbers to protocols against the clock) and **Subnet Sprint** (5 fast subnetting questions). Results feed a small "due for review" list.

**Why this priority**: Memorising ports and subnetting speed are the most-cited Network+ pain points. Short repeatable drills are also the most likely reason to come back tomorrow.

**Independent Test**: A learner plays Port Match three times. Their score and time improve, and missed ports reappear more often.

**Acceptance Scenarios**:
1. **Given** a drill, **When** the learner finishes, **Then** they see score, time and personal best.
2. **Given** items missed in a drill, **When** the drill runs again, **Then** those items show up more often.

---

### User Story 4 - Finish the week (Priority: P2)
In L4, several faults hit the café network at once. The learner works through CompTIA's 7 troubleshooting steps (identify the problem, theorise a cause, test it, plan, fix, verify, document) by inspecting the figure, running simulated checks, and fixing faults one by one. At the end they see a "week summary": the objectives they covered and their practice accuracy per objective.

**Why this priority**: The capstone proves the lessons connect, and it's the hardest part of the exam (troubleshooting, 24%).

**Independent Test**: A learner who finished L1–L3 resolves all L4 faults within 15 minutes, using no outside help.

**Acceptance Scenarios**:
1. **Given** the L4 scenario, **When** the learner picks a troubleshooting step, **Then** only the actions that make sense for that step are offered.
2. **Given** a wrong theory, **When** the learner tests it, **Then** the figure shows it doesn't explain the symptoms, and nothing is marked failed.
3. **Given** all faults are fixed, **When** the summary opens, **Then** it lists objectives 1.1, 1.4, 1.7 and 5.1 with accuracy for each.

---

### User Story 5 - Share a figure and ask for the next module (Priority: P2)
A learner shares any figure as a link. The recipient plays with it in a phone browser instantly. At the end of each lesson, and in the week summary, learners can leave an email to hear when the next module ships, and rate the lesson.

**Why this priority**: Distribution is the main risk. Shares and emails are how this pilot measures real demand.

**Independent Test**: Open a shared link on a phone that's never visited the site. The figure is interactive in under 3 seconds on 4G.

**Acceptance Scenarios**:
1. **Given** a figure, **When** share is tapped, **Then** a link with a preview is created.
2. **Given** a shared link, **When** it's opened, **Then** the figure works and offers "do the full ticket".
3. **Given** the end of a lesson, **When** the learner rates it (1–5) and optionally comments, **Then** the rating is stored with the lesson.

### Edge Cases
- The learner leaves mid-lesson: on return they resume at the same step on the same device.
- A figure can't render on an old browser: show the static step-by-step fallback (image plus text).
- Very narrow screens (320 px): controls never overlap the figure. Drag questions offer a tap-to-select alternative.
- A learner opens L4 without doing L1–L3: allow it, with a gentle note on which lessons it builds on.
- Drill timers and reduced motion: timers can be switched off, and drills then score accuracy only.
- An email is entered twice: store it once.

## Requirements *(mandatory)*

### Functional Requirements

**Lesson experience**
- **FR-001**: The module MUST contain exactly the four lessons in the table above, each framed as a Brew & Byte ticket that is closed at the end.
- **FR-002**: Lessons MUST be made of steps, each a state of an interactive figure with no more than about 60 words of text. Learners can go forward, back and replay.
- **FR-003**: Every lesson MUST include at least two predict-before-reveal moments with explained feedback.
- **FR-004**: L1, L2 and L4 MUST include break-it interactions whose consequences play out and are explained.
- **FR-005**: Every packet in a figure MUST be tappable to show an **x-ray** of what each layer added (addresses, port, data). Its depth depends on the lesson.
- **FR-006**: Each lesson MUST end with a recap, its Network+ objective numbers, sources, and a "last reviewed" date.
- **FR-007**: Each lesson MAY show a "try it on your computer" box (e.g. `ipconfig`, `ping`, `tracert`) as an optional real-world link. The lesson never depends on it.

**Practice and drills**
- **FR-008**: Each lesson MUST have 4–6 practice questions. At least two MUST be performance-style (drag, place, configure on a figure).
- **FR-009**: Wrong answers MUST trigger mistake replay, which plays the consequence of the chosen answer before showing the correct one.
- **FR-010**: The system MUST provide Port Match and Subnet Sprint drills, with score, time and personal best, and with missed items repeated more often.
- **FR-011**: The system MUST keep a "due for review" list from wrong answers and drill misses, shown on the module home.

**Module and progress**
- **FR-012**: The module home MUST show the week as four days, with each ticket's status (not started, in progress, closed).
- **FR-013**: The week summary MUST show objectives covered and practice accuracy per objective.
- **FR-014**: Progress MUST be saved on the device without an account.

**Sharing and feedback**
- **FR-015**: Every figure MUST have a share link that opens an interactive version in a browser without install or sign-up.
- **FR-016**: Each lesson end MUST offer a 1–5 rating, an optional comment, and an optional "email me when the next module ships" field with a clear privacy note.
- **FR-017**: Learners MUST be able to report an error on any step. The report records the lesson and step automatically.

**Accessibility and compliance**
- **FR-018**: Every interaction MUST work by touch, mouse and keyboard. Reduced motion MUST switch off autoplay and timers.
- **FR-019**: Every figure MUST have a text description and a static fallback. Nothing may depend on colour alone.
- **FR-020**: All questions MUST be original. No real exam questions or "brain dump" content. The app MUST state that CompTIA and Network+ are CompTIA trademarks and that the app isn't affiliated with or endorsed by CompTIA.

**Measurement**
- **FR-021**: The system MUST record anonymous events for: lesson start, each step reached, predict answers, break-it uses, x-ray opens, mistake replays, question results, drill plays, lesson finish, rating, share created, share opened, email submitted.
- **FR-022**: Events MUST let us compare engagement by ingredient (e.g. finish rate for learners who used break-it vs those who didn't).

**Out of scope for the pilot**: payments and Pro, accounts and sync, offline downloads, other tracks, other modules, video export (the founder records clips manually for YouTube), AI tutor.

### Key Entities
- **Module**: "Your first week as a network tech". Four lessons, a story frame, and a week summary.
- **Lesson / Ticket**: Hook, steps, practice set, objectives, sources, last-reviewed date.
- **Step**: Figure state, text, optional predict or break-it interaction.
- **Figure**: Interactive animation with named states, x-ray data, a text description, a static fallback and a share link.
- **Objective**: A Network+ objective (1.1, 1.4, 1.7, 5.1) linked to lessons and questions.
- **Question**: Multiple-choice or performance-style. Has the correct state, a mistake replay for each wrong option, and an objective tag.
- **Drill**: Port Match or Subnet Sprint. Has an item pool, scores and personal bests.
- **Learner progress**: Steps reached, tickets closed, answers, review list. Stored on the device.
- **Feedback**: Rating, comment, error report, optional email.

## Success Criteria *(mandatory)*

### Measurable Outcomes (go / no-go for module 2)
- **SC-001**: At least 60% of visitors who start L1 finish it.
- **SC-002**: At least 30% of L1 finishers close all four tickets.
- **SC-003**: Average lesson rating is 4.2/5 or higher.
- **SC-004**: First-try accuracy on lesson practice is 70% or higher. After L3, at least 7 of 10 test learners solve a /26 subnet question in under 2 minutes.
- **SC-005**: At least 25% of learners who finish a lesson play a drill again on a later day.
- **SC-006**: At least 5% of visitors leave an email, and at least 15% of visitors arrive through a shared link.
- **SC-007**: Each figure is interactive in under 3 seconds on a 4G phone and runs smoothly on a 2 GB RAM Android device.
- **SC-008**: For each lesson ingredient, events show whether it raises finish rate or rating. This produces a keep/cut list for module 2.

**Decision rule**: if SC-001 to SC-003 and SC-006 are met, expand to a full Network+ module set. If not, use the SC-008 findings and the ratings to rework the lessons before adding more content.

## Assumptions
- The pilot runs on the web, phone browser first. The same build works on desktop. An Android wrapper comes after the pilot.
- Content is in English, aimed at a global (mainly US/UK) Network+ audience.
- Objective numbers follow CompTIA N10-009 and MUST be checked against the official objectives PDF before release.
- Figures are interactive Anatomy figures that take most of the lesson screen (layer stack, door-building, subnet bar, café network), built with `/anatomy`; hands-on wiring tasks use React Flow. See `docs/illustration-stack.md`. (Changed from Hairline on 2026-11-08.)
- Traffic comes from the founder's YouTube videos/Shorts built from the same figures, plus Network+ communities.
- The founder writes the content and checks it against cited sources.

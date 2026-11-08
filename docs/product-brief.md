# Product Brief (working title: "Under the Hood")

**Status**: Draft v0.1 | **Date**: 2026-11-08 | **Feeds**: `.specify/memory/constitution.md`, `specs/001-networking-pilot/spec.md`

## 1. One line
An app that shows how computers actually work (hardware, operating systems, networking, databases) through interactive animations instead of text, with no coding required. Each audience gets its own track that maps the same lessons to their exam or goal.

## 2. Who it's for
| Audience | Goal | Track | Price sensitivity |
|---|---|---|---|
| CS/IT students in India | Placements, GATE, semester exams | Placement track | High (₹299–499) |
| IT certification learners (US/UK/global) | Pass CompTIA A+ / Network+ | Cert track | Low (they already spend $500+ on exams) |
| Developers moving into system design | Understand what's under the hood before system design | Systems track | Low ($100–200/yr is normal) |
| School CS students (GCSE/A-level, AP CSP) | Exam syllabus | School track (later: teacher licences) | Medium |
| Curious adults | Understand the tech they use | No track, just the library | Medium |

## 3. What competitors do, and where we win

### Feature matrix
| | Text/MCQ apps (CSE app, Basic CS) | Visual apps (OS Visualizer, GATE CS Lab) | Brilliant | GeeksforGeeks | YouTube (Gate Smashers, Prof. Messer) | Cert prep apps (Pocket Prep, Dion) | ByteByteGo | **Us** |
|---|---|---|---|---|---|---|---|---|
| Interactive animations | ✗ | ✓ (calculator-style) | ✓ | ✗ | ✗ (passive video) | ✗ | Static diagrams | ✓ guided |
| OS / DBMS / CN / COA coverage | ✓ | ✓ | ✗ | ✓ | ✓ | Partial (cert syllabus) | Partial | ✓ |
| Guided story per lesson | ✗ | Partial | ✓ | ✗ | ✓ | ✗ | ✓ | ✓ |
| Practice questions | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ (main feature) | ✗ | ✓ incl. visual |
| Mapped to a specific exam | Loosely | GATE | ✗ | Loosely | Per channel | ✓ | Interviews | ✓ per track |
| Works offline | ✓ (images often break) | ✓ | ✗ | Partial | ✗ | Partial | ✗ | ✓ fully |
| No ads mid-lesson | ✗ | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ | ✓ |
| Distribution | Play search | None (10–100 installs) | Huge ad budget | SEO giant | Algorithm | Paid ads, SEO | Newsletter, books | Videos + shareable figures |

### What users complain about (from Play Store reviews)
- **Walls of text** and pictures that don't load offline.
- **Ads** on the back button and mid-reading.
- **Free content moved behind a paywall** later. One review: "34 topics being in the PRO category is the worst."
- **Outdated content** (GfG course reviews).
- **Broken certificates** and other small bugs that kill trust.

### How we do better
1. **Animation-first.** Every concept has a figure you touch. Text only supports it.
2. **Guided, not a calculator.** The existing visual apps are simulators with input boxes. Ours tell a story step by step, then let you play.
3. **A clear, permanent free tier.** Whatever launches free stays free.
4. **No ads inside lessons.** Ever.
5. **Fully offline** once a module is downloaded, images and figures included.
6. **Visible freshness.** Each lesson shows a "last reviewed" date and has a one-tap "report an error" button.
7. **Built-in distribution.** Every figure can be shared as a link or exported as a short video clip (see 4.6).

## 4. New features nobody in the market has

1. **Predict, then reveal.** Before an animation plays, the learner guesses what happens next ("Which router gets the packet?"). This is active recall, which makes concepts stick far better than watching.
2. **Break it.** Learners can deliberately break things (unplug a cable, kill the DNS server, cause a deadlock) and watch the consequences. You understand a system by seeing it fail.
3. **Interview answer cards.** Each concept ends with a 30-second model answer phrased the way interviewers want it. The learner tries their own answer first, then compares and self-rates.
4. **Track lens.** One lesson shows different callouts per track, e.g. "Network+ objective 1.4", "asked in TCS/Infosys interviews", "GCSE: networks".
5. **Readiness score.** Per track, e.g. "You're 72% ready for OS interview questions", based on lessons done and practice accuracy.
6. **Share and export.** Any figure becomes a link that opens in a browser with no install, or a vertical clip for Shorts/Reels/WhatsApp. Students share it, and it feeds the YouTube channel.
7. **Night-before mode.** A 15-minute visual rapid revision of a whole module before an interview or exam.
8. **Concept map.** A zoomable map of every concept showing what you've mastered and how topics connect (DNS appears in both Networking and Systems).
9. *(Later)* **Ask about this figure.** An AI tutor that knows the exact state of the animation on screen. This is the one thing ChatGPT can't do from a text prompt.

## 5. Curriculum (module map)
| # | Module | Example lessons | Tracks |
|---|---|---|---|
| M1 | **Networking (pilot)** | See section 6 | All |
| M0 | How a computer works | Bits and binary, logic gates, CPU fetch-decode-execute, memory hierarchy, storage, booting | All |
| M2 | Operating systems | Processes and threads, CPU scheduling, paging and virtual memory, deadlock, file systems, system calls | Placement, Cert, Systems |
| M3 | Databases | Tables and keys, normalization, indexes (B-trees), joins, transactions and ACID, concurrency | Placement, Systems |
| M4 | Computer architecture | Pipelining, caches, instruction sets, interrupts, DMA | Placement, School |
| M5 | Security basics | Encryption, hashing, HTTPS, authentication | Cert, Systems, School |
| M6 | Systems foundations | Client-server, load balancers, caching, CDNs, queues | Systems, Placement |
| Later | Digital logic, TOC, compilers (GATE); hardware troubleshooting (A+) | | Placement (GATE), Cert |

## 6. Pilot module: Networking (10 lessons)
1. What a network is: two computers, one cable, bits as pulses
2. Addresses: MAC vs IP (envelopes and street addresses)
3. Switches vs routers
4. A packet's journey across the internet, hop by hop
5. DNS: turning names into addresses
6. Ports, TCP and UDP
7. The TCP handshake and how lost packets get resent
8. The layer model: OSI / TCP-IP as an exploded stack
9. Wi-Fi and wireless basics
10. **Capstone: what happens when you type a URL and press Enter.** This classic interview question ties all ten lessons together.

Why networking first: it overlaps every track (CN for placements, Network+, GCSE networks, AP CSP "the internet", system design basics), and Hairline already has `router`, `patch`, `hub`, `relay`, `dish` and `exploded` figures to build from.

## 7. Business model
- **Free:** every lesson in the first module, the first two lessons of every other module, and sharing.
- **Pro:** all modules, all tracks, practice banks, readiness score, night-before mode, offline downloads, interview cards.
- **Pricing:** yearly plan plus a lifetime option, with regional prices (e.g. US $49/yr or $129 lifetime; India ₹499/yr or ₹999 lifetime). Final numbers will be tested.
- **Web checkout** (Stripe) next to Play/App Store billing to avoid the store cut on desktop.
- **Later:** school and teacher licences (B2B); a Cert track sold as a one-time "exam pack".
- **No ads in lessons.** If ads are ever used, they appear only on the free tier and outside lessons.

## 8. Roadmap
| Phase | What | Exit criteria |
|---|---|---|
| 0. Validate (4–6 weeks) | Lessons 4, 5 and 10 of Networking as a free web page, plus 3–5 YouTube videos/Shorts built from the same figures | 1,000+ visitors; 40%+ finish a lesson; 5%+ leave an email. Below half of that, rethink before building. |
| 1. MVP | Full Networking module, lesson engine, practice, offline, share links; web + Android | See spec 001 success criteria |
| 2. Placement pack | M2 OS + M3 Databases, Placement track, interview cards, Pro launch in India | First paying users; reviews ≥4.5 |
| 3. Go global | Cert track (Network+ first), Systems track, iOS, regional pricing | US/UK revenue > India revenue |
| 4. Expand | M0, M4, M5, M6; school licences; AI "ask about this figure" | |

## 9. Open questions
1. App name.
2. ~~Launch track~~ → **Decided 2026-11-08: Network+ first** (see Decision log).
3. Which languages after English: Hindi/Hinglish for India?

## 10. Decision log
| Date | Decision | Why |
|---|---|---|
| 2026-11-08 | Launch with the **Network+ track** | Higher willingness to pay (US/UK, $500+ already spent on exams), clear syllabus, performance-based questions suit interactive figures |
| 2026-11-08 | Pilot = **one module, four lessons** (spec `001-netplus-pilot`), web first | Learn what makes lessons engaging before scaling content. This replaces the 10-lesson Networking module in §6 and the Phase 0/1 split in §8. |

## 11. Engagement ideas backlog
How to make lessons and modules more interesting. "Pilot" means the idea is in spec 001 and will be measured. The rest wait for pilot data.

### Lesson-level
| Idea | What it is | Status |
|---|---|---|
| Ticket story | Each lesson is a help-desk ticket at a fictional café chain, and you close it by the end | Pilot |
| Predict, then reveal | Guess before the animation plays | Pilot |
| Break it | Unplug, misconfigure or crash parts and watch the effect | Pilot |
| Mistake replay | A wrong answer plays out what your answer would actually do | Pilot |
| Packet x-ray | Tap any packet to see what each layer added | Pilot |
| Performance-style questions | Drag, place and configure on figures, like Network+ hands-on questions | Pilot |
| Try it on your computer | Optional `ping` / `ipconfig` box linking to the real machine | Pilot (optional) |
| Depth toggle | "Simple" vs "exam depth" explanation on the same figure | Later |
| Sound and haptics | Subtle cues: packet delivered, connection refused | Later (test cheaply) |
| Narrated mode | Voice-over that follows the figure tour, for commuting | Later |
| Spot the difference | Two network states side by side: find what changed | Later |

### Practice and habit
| Idea | What it is | Status |
|---|---|---|
| Port Match | Timed matching of ports and protocols, with personal best | Pilot |
| Subnet Sprint | 5 fast subnetting questions | Pilot |
| Due-for-review list | Missed items come back | Pilot |
| Daily ticket | One 2-minute mini ticket each day | Later |
| Exam simulator | Timed mixed set with an exam-like interface and a score out of 900 | Later (Pro) |
| Readiness per objective | Heat map of the Network+ objectives | Later (Pro) |
| Night-before mode | 15-minute visual revision | Later (Pro) |

### Module-level
| Idea | What it is | Status |
|---|---|---|
| Story arc | The module is your "first week". Later modules are "first month" and so on, with the café chain growing (new branches, Wi-Fi, VPN, cloud) | Pilot (week 1) |
| Capstone scenario | Multi-fault troubleshooting using everything in the module | Pilot |
| Week summary | Objectives covered and accuracy per objective | Pilot |
| Network that grows | The café network you build persists across modules, so you keep adding to it | Later |
| Objective map | Every Network+ objective shown as a map you fill in | Later |
| Shareable result card | "I closed week 1" card with your stats, for LinkedIn | Later (growth) |
| Community challenge | A weekly "broken network" puzzle everyone solves | Later |

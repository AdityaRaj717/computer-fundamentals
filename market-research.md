# Computer Fundamentals App: Market Research (Play Store, Nov 2026)

## Question
Is there an app that teaches computer fundamentals (basics, networking, architecture, OS, DBMS) with interactive animations and no coding? Should it be built, and can it make money?

## What exists on the Play Store

Play shows installs in lakh buckets: 10L+ = 1M+, 5L+ = 500K+, 1L+ = 100K+.

### Tier A: "Computer basics" for general users (crowded, low value)
| App | Installs | Model | Notes |
|---|---|---|---|
| Learn Computer and Programming | 1M+ (11.2K reviews) | Ads + IAP | MS Office, shortcuts, hardware, coding. Text and pictures. |
| Learn Computer: Basics & Quiz (Code Play) | 500K+ (999 reviews) | Ads | 7 mini "labs" (PC build, cable sim), quizzes, certificates. |
| Learn Computer Course Offline (Hindi/English) | 100K+ | Pro courses | MS Office, typing, govt-exam computer questions. |

Audience: school kids, govt-exam aspirants, beginners. Paid by ads, low ARPU, lots of near-identical apps.

### Tier B: CS core subjects as notes and MCQs (the placement/GATE audience)
| App | Installs | Model | Notes |
|---|---|---|---|
| Computer Science Engineering (Shekh Ehsanur Rahman) | 100K+ (1.13K reviews) | Freemium "Pro" | 84 subjects, 26,874 MCQs, interview prep. Reviews complain about Pro pricing. |
| Basic Computer Science (Softecks) | 100K+ | Ads | Notes, MCQs, 27 small tools incl. a few visualizers. |
| COMPUTER ARCHITECTURE & ORG (Engineering Wale Baba) | 10K+ | Ads + IAP | Ebook-style notes. |
| Computer Networks - MasterNow | 1K+ | Ads + IAP | Notes + MCQs. |
| Complete Placement Preparation | 10+ | Free | OS/DBMS/CN/OOP notes for placements. |

Almost all of these are walls of text plus MCQs. None is built around animation.

### Tier C: Visual / interactive (your exact idea)
| App | Installs | Notes |
|---|---|---|
| Operating System Visualizer (Nakshatra Educational World) | **10+** | Animated CPU scheduling Gantt charts, page replacement, Banker's algorithm, producer-consumer, disk scheduling. Story-based intros. |
| Gate Computer Science / GATE CS Visual Lab (same dev) | **100+** | 50+ simulators across OS, DBMS, CN, COA, TOC, compilers. |
| Brilliant | 5M+ (1.15L reviews) | Polished interactive visuals, but focused on math, coding, algorithms, AI. Does not cover OS, DBMS or networking for exams. About ₹1,199/month in India (third-party price tracker). |

### The real competitors are off the Play Store
- YouTube: Gate Smashers' "Introduction to Operating System" alone has 5.4M views. Neso Academy, Jenny's Lectures, and others are free and good enough for most students.
- GeeksforGeeks (website plus a 1M+ install app) is the default reference for placement theory.
- ChatGPT and other AI assistants explain any concept for free when asked.
- Paid coaching: GO Classes GATE CSE course costs ₹41,299. PW GATE Wallah has 23 GATE CS batches.

## Demand
- GATE CS registrations: 99,555 (2023), 1,52,652 (2024), 2,07,851 (2025), 2,59,922 (2026). Growing every year.
- On top of that, lakhs of CSE/IT/BCA/MCA students take semester exams and placement rounds every year, where OS, DBMS, CN and OOP come up in interviews.
- Usage is seasonal: placement season (Jul to Dec), GATE (Feb), and semester exams.

## Money (benchmarks, not measured for this niche)
- Ads in India: about ₹2,400–8,500/month per 1,000 daily users (scienceofapps.com, Oct 2026).
- Subscriptions: consumer apps convert 2–5% of free users to paid. The average subscription app converts 1.9% of downloads within 35 days (Airbridge 2026).
- Example: 50,000 downloads/year × 2% × ₹499 = about ₹5 lakh/year gross, about ₹4.2 lakh after Play's 15% cut.
- Indian students pay for exam and placement results (coaching at ₹5k–40k) and don't pay much just to understand a concept.

## Verdict
**The gap is real, but it's narrow, and getting users is harder than building the app.**

1. Nobody has a polished, animation-first app for OS, DBMS, CN and COA aimed at placements and GATE. Existing apps are text dumps, and Brilliant doesn't cover these subjects.
2. A developer already built roughly this (OS Visualizer, GATE CS Visual Lab) and got 10–100 installs. A good product doesn't distribute itself. Plan for distribution from day one.
3. Skip Tier A ("computer basics for everyone"). It's saturated, ad-funded and low-paying.
4. Expect side income, not a business, unless distribution works. Once installs reach 5L+, it becomes meaningful.

## How to give it a real chance
- **Audience:** CS/IT students preparing for placements, semester exams and GATE. Start with OS, DBMS, CN and COA.
- **Distribution:** every animation is also a YouTube Short or long-form video. The animations double as marketing content, which funnels viewers into the app, and this is your main advantage over the existing visual apps.
- **Validate before building the full app:** make one module (e.g. OS: CPU scheduling, paging, deadlocks) as a web page or a few videos. Measure views, saves and email sign-ups. Decide on a kill threshold in advance.
- **Monetization:** keep the animations free. Charge for a placement pack (interview Q&A bank, one-page revision sheets, mock rounds) as a one-time ₹299–499 purchase or a cheap yearly plan. Students uninstall after placements, so lifetime or one-time pricing fits better than monthly. Keep ads light, since reviews of current apps complain about ads and paywalls.
- **Differentiate from ChatGPT:** an AI can explain in words, but it can't show a page table updating step by step. Lean on interactivity, exam-mapped content and "what interviewers ask".

## Going global (added after the first pass)

### Approach
Build one animation library (how a computer works, then OS, networking, databases) and sell it through audience-specific **tracks**. A track maps the same animations to a particular exam or goal and adds its own question bank. The animations are universal, while the exam mapping and pricing differ by audience.

### Audiences, ranked by willingness to pay
| Audience | Size signal | What they already pay | Fit |
|---|---|---|---|
| IT certification learners (CompTIA A+, Network+), mostly US/UK | A+ is two exams at about $265 each; Network+ voucher is about $358 | Pocket Prep, Dion Training, CertMaster. Professor Messer is free. | Very high. Hardware, OS and networking are the whole syllabus. |
| Developers learning system design (global) | ByteByteGo newsletter has 1M+ subscribers | ByteByteGo charges $189/yr or $499 lifetime for visual explanations | High. Networking, OS and databases come before system design. |
| School CS students: UK GCSE/A-level, US AP CSP (~163K takers in 2026) | AP CSP is growing; GCSE CS covers CPU, binary and networks | GCSE CS apps charge $3.99/mo or $12.99/yr; revision platforms charge £15–25/mo | Good. Schools and teachers can buy licences (B2B). |
| Indian CS students (placements, GATE: 2,59,922 CS registrations in 2026) | Largest volume | ₹299–499 one-time is realistic | Good for volume and reviews, low ARPU. |
| Non-technical professionals (PMs, tech sales, founders) | Weak evidence; mostly free resources today | Unknown | Speculative. Test later. |

### Why it pays more
- Ad eCPM: US interstitials earn about $6–12 against $0.50–1.50 in India (2026 developer reports), so a US user is worth 10–20× more per ad.
- Play and App Store support per-country prices. One product can charge $9.99 in the US and ₹299 in India.
- Selling on the web through Stripe avoids the 15–30% store cut for desktop buyers.

### Beachhead: the networking module first
Networking overlaps every audience: CN for placements, Network+, GCSE "networks", AP CSP "the internet", and system design basics. Hairline already has `router`, `patch`, `hub`, `relay`, `dish` and `cabinet` figures for it.

### Hairline (github.com/lucasmarkes/hairline): what it means for the build
- MIT licensed, so commercial use is fine. No dependencies. Works in React or plain DOM.
- It draws into the DOM, so the app should be web-first (React/Next.js), then wrapped for Play and the App Store with Capacitor or a TWA. A web app also brings global SEO.
- Figures respond to the **pointer**. Phones have touch and no hover, so every figure needs a touch interaction (drag or tap) plus its `play` auto-tour. Test this on a real phone early.
- The 33 stock figures are mostly metaphors (lockers, drawers, rails). Teaching animations like "TCP handshake" or "page table lookup" will be custom figures made with `/hairline-create`. Its "tour" stops map naturally onto lesson steps.
- The look is monochrome, isometric and minimal, which reads as premium and suits a global, higher-priced positioning.

## Caveats
- Install counts are Play's buckets, not exact numbers. Star ratings weren't captured.
- Brilliant's India price comes from a third-party tracker.
- Ad and conversion figures are general benchmarks, not data from this niche.

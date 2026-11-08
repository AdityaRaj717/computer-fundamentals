# Global Market Research: Apps That Teach CS Fundamentals

**Date:** 2026-11-09 | **Extends:** `market-research.md`, `docs/product-brief.md` | **Status:** research and recommendations only. Nothing in `app/`, `PRODUCT.md` or the spec was changed. Proposed changes are in section 8.

Every number has a source in brackets, listed in section 10. "Est." means a third-party estimate, not a company figure. "Derived" means I calculated it from cited numbers, and the calculation is shown.

---

## 1. Executive summary

**The short answer.** The biggest audiences for CS fundamentals pay the least, and the ones who pay the most are smaller. Build one free library for reach and charge the adults who are trying to get a tech job. Keep networking as the first module, and keep Network+ as its first exam mapping. Don't brand the app as a Network+ app, and make Security+ the second paid track.

**What I found**

1. **The subjects are tested at huge scale, mostly in Asia.** China's postgraduate CS exam ("408") is exactly data structures, computer organisation, operating systems and networks (45 + 45 + 35 + 25 of 150 marks) [33]. Around 3.3–3.8 million people sat China's postgraduate exam for 2026 overall [32]. India had 2,59,922 GATE CS registrations in 2026 [51], plus roughly 3 lakh computer engineering graduates a year going through placement interviews (derived from AISHE [29]). These are the largest pools in the world for OS, DBMS, networks and architecture, and they pay ₹300–3,000 or ¥50–100 for books and batches, not $100+ subscriptions.
2. **The paying pools are adults moving into or up in tech, mostly in English-speaking countries.**
   - CompTIA has awarded 3.6M+ certifications [23]. Security+ and A+ each have over 1 million holders, and Security+ added about 83,000 holders a year from 2019 to 2025 (derived from [23]).
   - Learners already pay $369–425 per exam [20][25], $15–20 a month for Pocket Prep [19], and $548–978 for CertMaster bundles [22].
   - Developers pay $119–499 for visual interview prep: NeetCode Pro is $119/yr [13], and ByteByteGo is $189/yr or $499 lifetime [11].
3. **Nobody teaches these subjects with guided, touchable animation on a phone.** I checked 45+ products (section 2). The visual ones are either:
   - passive (YouTube, NeetCode videos, ByteByteGo diagrams);
   - desktop calculators with no guidance (VisuAlgo, Packet Tracer, and the Nakshatra visualizers, which have 10–500 installs) [1][17][26];
   - or math-first (Brilliant).

   Brilliant does have "How Technology Works", "Digital Circuits" and "CS Fundamentals" courses [6], so the earlier claim that it doesn't cover this area was only half right. It doesn't teach exam-level OS, databases or networks.
4. **Store reviews show what learners hate** (sampled 1–2★ reviews across 16 apps, see section 2.3):
   - paywalls creeping over content that used to be free (Quizlet, Enki, Sololearn, Programming Hub);
   - hearts, lives and keys that lock learners out (Sololearn, Mimo, Hyperskill);
   - free trials that turn into annual charges, and cancelling that is hard (Sololearn, Brilliant, Unacademy);
   - AI tutors bolted on that make lessons worse (Brilliant's Koji, Sololearn, Quizlet);
   - "interactive" that only means multiple choice (Mimo);
   - wrong or outdated questions (Pocket Prep, GfG).

   The constitution's rules (free stays free, no dark patterns) answer these complaints directly. That's a selling point, not only an ethical stance.
5. **Timing:** Security+ SY0-801 launched on 17 November 2026, and SY0-701 retires on 11 June 2027 in English [24]. Every Security+ learner needs material for the new version in 2027, which opens a window for a new entrant.

**Recommendation in one table**

| Rank | Audience | Role | Why |
|---|---|---|---|
| 1 | Adults moving into IT: CompTIA A+, Network+, Security+ (US, UK, Canada, Australia, India's IT services workforce) | **Paid beachhead** | Highest willingness to pay per learner, a clear syllabus, performance-based questions (PBQs) that suit simulations, and question banks rather than teaching as the competition |
| 1b | CS students worldwide, India first (placements, GATE, semester exams) | **Free reach beachhead** (same lessons) | The largest volume, plus YouTube growth and reviews. Low ARPU, so cheap PPP prices for practice packs |
| 2 | Working developers and job-seekers: "under the hood" before system design and interviews | Second paid track (2027) | A 47–48M developer pool [37] that already pays $119–499 for visual prep [11][13]. Needs OS, networks and DB first, then system design |
| 3 | University CS courses (US, UK, India): OS, networks, DB and architecture for coursework | Paid with PPP; later B2B through instructors | Steady demand every semester. zyBooks proves instructors adopt animation-based material [16] |
| 4 | School CS (AP CSP, AP CSA, GCSE, A-level) | Later, B2B | AP CSP is growing (~163K) but GCSE CS is shrinking (82,428 in 2026, down 11% since 2024) [36]. Minors bring privacy obligations, and schools are slow to buy |
| 5 | China 408 | Long-term, partner only | A perfect subject match, but it needs a Chinese app, local payments, an ICP licence and a Bilibili/WeChat presence |
| — | Curious adults | Served by the free library and YouTube, not a paid target | Real demand (Branch Education: 2.78M subscribers, 125.5M views [40]), but even Brilliant, the leader here, has an estimated revenue of only $14–18M [3][4] |

**Pricing in short:** All teaching lessons stay free forever, with no hearts and no daily lesson cap. The paid tier sells exam-mapped practice and readiness: question banks, PBQ simulations, mock exams, readiness maps, offline packs and interview cards. US prices: about $59.99 a year, $11.99 a month, or a $29.99 "90-day exam pass". India, Vietnam and similar markets get about 75% off, and Brazil, Mexico, Indonesia and the Philippines about 50% off, following Codédex's published PPP tiers [14].

---

## 2. Competitor survey (47 products)

Installs, ratings and review counts are from the US Google Play listings, read on 2026-11-09 [1]. The IAP range is Play's "in-app purchase per item" range, not the plan price. Revenue is shown only where a public estimate exists, labelled with its source.

### 2.1 Master table

**A. Interactive learning (global)**

| Product | Audience, regions | CS-fundamentals subjects | Formats and exercise types | Visuals and animation | Retention | Price | Scale (Play; est. revenue) | Rating and main complaints |
|---|---|---|---|---|---|---|---|---|
| **Brilliant** | Teens to adults, global, English | Algorithmic Thinking, CS Fundamentals, How Technology Works, Digital Circuits, Search Engines, AI [6] | One idea per screen; interactive manipulatives, MCQ, numeric entry, drag; AI tutor "Koji" [1] | Best-in-class interactive diagrams, mostly math and logic | Streaks, daily free lesson limit [1] | $27.99/mo or $161.88/yr, 7-day trial, family plan for 6 [5] | 5M+ installs, 115K reviews, "10 million people" [1]; est. $14.3M (Getlatka) to $18.3M (Growjo) revenue [3][4] | 4.5★. Refund and auto-renew anger; Koji "wrecks the experience"; heavy premium upsell [2] |
| **Khan Academy** | K-12 and AP, global, many languages | Intro CS, AP CSP | Video, articles, practice, programming playground | Videos and some interactives | Mastery points | Free | 10M+, 174K reviews [1] | 4.1★. App interactivity bugs; India users say it's too syllabus-bound [2] |
| **Mimo** | Beginners, career changers, global | Web dev and Python; little CS theory | Bite-size lessons, MCQ, fill-the-gap, code playground, projects (Max) [8] | Little | Hearts/keys, streak, streak repair, leaderboard, certificates [8][47] | Basic free; Pro (mobile); Max (web+mobile); 7-day trial on yearly only [8] | 10M+, 740K reviews [1]; est. ~$10M/yr (Growjo via Getlatka) [7] | 4.7★. "Every lesson is just a quiz of multiple choice"; 2 keys a day makes free unusable; paywall before the first lesson [2] |
| **Sololearn** | Beginners, global | Languages, SQL; little OS or networking | MCQ, multi-select, fill-the-gap word bank, code runner, community comments [47] | Little | Hearts, streaks, XP, levels, followers, certificates [47] | PRO $69.99/yr or $12.99/mo; MAX $119.88/yr [9] | 10M+, 754K reviews, Editors' Choice, "35M+ learners" [1] | 4.5★. "AI integration ruined it"; impossible to cancel; trial charged as a full year; hearts block learning [2] |
| **Enki** | Developers, global | Coding and data | Daily workouts, quizzes | Little | Streaks, daily workout | IAP $7.99–74.99 [1] | 1M+, 28.5K reviews [1] | 4.6★. Features moved behind the paywall; 2.0 redesign hated [2] |
| **Codédex** | Teens and beginners, global; top markets include India, LatAm and SE Asia [14] | Python, web, some CS | Game-style chapters, code exercises, projects, monthly challenges | Pixel-art game world | Badges, avatar worlds, monthly challenge | Club $9.99–14.99/mo; PPP: India ₹349/mo or ₹2,699/yr (75% off), Brazil/Mexico/Indonesia/Philippines 50% off [14] | Web only; "2m+ learners" [14] | Dropping lifetime and adding a pricing grid raised paid signups 20% [14] |
| **Boot.dev** | Aspiring backend devs, mostly US | Backend coding; some CS (DSA, memory management) | Coding lessons, "training grounds" challenges, projects | Little | Heavy gamification: XP, levels, quests (Trustpilot praise) [10] | $49/mo or $349/yr (blog, Aug 2026); org $59/mo or $399/yr [10] | Web; Dec 2025 record of 3,075,904 lessons in a month [10]; grew from $6K to $110K MRR in 15 months (2023, founder interview) [10] | Praised for engagement and value [10] |
| **Hyperskill (JetBrains Academy)** | Self-taught devs, Europe and global | Java, Kotlin, Python, some theory topics | Theory cards, fill-the-gap, code tasks, projects | Little | Lives (48h freeze for free users) [2] | €399/yr or €49.90/mo [15] | App 10K+ [1] | 4.8★ but: free users frozen 48h; English only; crashes [2] |
| **Codecademy (Go app)** | Beginners, global | Coding plus a CS career path | Web lessons; the app is mainly for review | Little | Streaks | IAP $29.99–239.88 [1] | 1M+, 40.2K reviews [1] | 4.6★. The app can't do real lessons; logouts [2] |
| **Programming Hub** | Beginners, India and global | Coding | Lessons, quizzes, certificates | Little | Certificates | IAP up to $400 [1] | 10M+, 230K reviews [1] | 4.7★. "Free" courses aren't free; ads [2] |
| **freeCodeCamp** | Self-taught, global | Web, Python, some CS | Projects, challenges | Little | Certificates | Free (donations) | 1M+, 3.6★ [1] | App lags behind the web |
| **DataCamp** | Data learners | Python, SQL | In-browser exercises | Little | XP, streaks | IAP $8.99–330 [1] | 1M+, 39.2K reviews [1] | — |
| **Educative (Grokking)** | Developers, interviews, global | System design, DSA, OS and networking courses (text) | Text lessons with diagrams, in-browser code, AI mock interviews [12] | Static illustrations and slides | — | Standard ~$149/yr [12] | App 10K+, 3.8★ [1] | Reviews say hidden paywalls and that the original Grokking courses are gone [12] |
| **ByteByteGo** | Developers, interviews, global | System design, coding, OOD, ML | Text courses with detailed illustrations [11] | Famous static diagrams | Newsletter habit | $189/yr or $499 lifetime, no monthly, no refunds [11] | Newsletter 1M+ subscribers; "5 million people learning"; YouTube 1.44M [11] | No refunds |
| **NeetCode** | Interview prep, global | DSA, some system design | Video with animations, in-browser problems, AI hints, company tags [13] | Animated explanation videos (passive) | Roadmap, Discord | Pro $119/yr (list $199), lifetime $297 [13] | Web | — |
| **AlgoExpert** | Interview prep | DSA, system design | Videos, coding workspace | Video | — | Not verified (pricing page failed to load) | Web | — |
| **LeetCode** | Interview prep, global (CN site separate) | DSA, SQL, concurrency | Coding problems, contests, daily challenge | None | Daily challenge streak, badges | Premium IAP $35–159 [1] | App 100K+ [1]; 5M+ ranked users (rough, from user analysis) [46] | 4.7★. No customer service; app weaker than the web [2] |
| **VisuAlgo** (NUS) | University DSA students, global | Data structures and algorithms | Step-by-step animations, e-lectures, auto-generated quiz "training mode" [17] | Excellent algorithm animation, desktop-first | None | Free | Web | Desktop UI; DSA only |
| **zyBooks** (Wiley) | US university courses (B2B via instructors) | Intro programming, DSA, computer organisation, networks, OS and more | Animated "participation activities" plus auto-graded "challenge activities" [16] | Step-by-step animations inside a textbook | Graded by the course | Per-student course price (not captured) | One CS title alone has 550+ participation activities and 110+ auto-graded challenges [16] | Students pay because the course requires it |
| **Runestone Academy** | University and high school, free textbooks | Python, DSA | ActiveCode, CodeLens tracing, Parsons (drag code lines into order), MCQ, fill-in | Code tracing | Course-led | Free | Web | Dated UI |
| **CS50 (Harvard/edX)** | Global beginners | Intro CS, C, memory, algorithms | Lectures, problem sets, autograder | Lecture demos | Certificate | Free; paid certificate | 4.8M+ learners (Fortune, 2023) [18] | — |
| **Duolingo** (reference) | Language learners, global | — | Fill-the-blank, image match, audio, AI roleplay [47] | Characters and illustration | Streaks, freezes, friend streaks, leagues [47] | — | 500M+, 51.7M reviews [1] | The retention benchmark that others copy |

**B. India: placements, GATE and semester exams**

| Product | Subjects | Formats and exercises | Visuals | Price | Scale | Rating and complaints |
|---|---|---|---|---|---|---|
| **GeeksforGeeks** | Everything: DSA, OS, DBMS, CN, COA, TOC, compilers | Articles, MCQ quizzes, coding problems, video courses | Static diagrams | Free site plus paid courses; IAP up to $999.99 [1] | App 1M+ [1]; est. $17.6M revenue (ZoomInfo) [45]; founder says 400+ employees, bootstrapped [45] | 4.3★. Outdated courses; buggy quizzes; login problems [2] |
| **Scaler / InterviewBit** | DSA, system design, CS core | Live classes, mentors, problems; free "Scaler Topics" articles | Static | Academy ₹3.5 lakh+ [44] | — | High price, long programs |
| **Unacademy** | GATE CS and IT, placements | Live and recorded batches, test series | Video | Batch prices vary (not captured) | 100M+ across all exams, 1.26M reviews [1] | 3.2★. Batches deleted; no refunds; aggressive marketing; poor UI [2] |
| **PW (Physics Wallah), GATE Wallah** | GATE CS and IT | Live and recorded batches, DPPs, tests | Video | Low-cost batches (not captured) | 50M+ across all exams, 1.43M reviews [1] | 4.6★. Access expires; app hangs [2] |
| **Testbook** | Government and GATE exams | Mock tests, previous-year papers | None | IAP $3.99–49.99 [1] | 50M+, 891K reviews [1] | 3.9★ |
| **EduRev GATE CSE** | GATE CS | Notes, MCQ, tests | None | — | 50K+, 4.0★ [1] | — |
| **Neso Academy** | CN, OS, COA, DBMS, TOC, digital logic | Video lectures (also on YouTube) | Whiteboard video | IAP $1.49–49.99 [1] | 100K+ [1] | 4.3★ |
| **Nakshatra Educational World** (OS Visualizer, DBMS Master, TOC visual) | OS, DBMS, TOC | Simulators with input boxes | Animated Gantt charts and automata | Free | 10+, 500+ and 100+ installs [1] | Proof that a good visual tool doesn't distribute itself |
| **CS MCQ apps** (Computer Science Solved MCQs, Softecks, Engineering Hub) | All CS subjects | Notes plus MCQ | None | Ads, cheap Pro | 100K+ each (top ones) [1] | Walls of text (from the earlier research) |

**C. IT certification prep**

| Product | Exams | Formats and exercises | Visuals | Price | Scale | Rating and complaints |
|---|---|---|---|---|---|---|
| **Professor Messer** | A+, Network+, Security+ | Free full video courses, monthly live study groups, paid course notes and practice exams | Slides and video | Videos free | YouTube-first; Messer Connect app 100+ installs [1] | Loved, but passive |
| **Dion Training** | CompTIA, ISC2, PMI | Udemy video course, practice exams, PBQ-style questions | Video | Network+ course $119.99 list on Udemy (usually discounted) [21] | Jason Dion: "3 Million+ enrollments" (Udemy profile) [21] | — |
| **Total Seminars (Mike Meyers)** | CompTIA | Videos, TotalSims, TotalTester | Video, sims | Network+ bundle $580 with voucher [20] | — | — |
| **CompTIA CertMaster** (official) | All CompTIA | Learn (lessons, videos, PBQs), Labs, Practice (adaptive Qs) | Some interactive | Bundles $548–978 [22] | — | Expensive |
| **Pocket Prep** | 100+ exams incl. CompTIA | Question bank, quiz modes, "Missed Questions", mock exams [19] | Recently added pictures (users dislike it) [2] | Basic free; $15–20/mo [19]; IAP $20.99–124.99 [1] | IT app 100K+, 2.76K reviews [1] | 4.2★. New subscription too expensive; outdated or wrong questions [2] |
| **ExamCompass** | CompTIA | Free online practice quizzes | None | Free | App 1K+ [1] | — |
| **Cisco Networking Academy + Packet Tracer** | CCNA, networking basics, IoT, security | Courses, Packet Tracer topology simulation and labs, skills assessments [26] | Full network simulator, desktop-first | Free for NetAcad learners [26] | Global via schools | Powerful but complex and not guided |
| **NetCLI** | CCNA | Cisco CLI simulator on mobile | Terminal | IAP $29.99–41.99 [1] | 5K+ [1] | 4.3★ |
| **Network+ prep apps** (KeepPrep, EduPass, TechPrep, AleosApps) | Network+ | MCQ banks, flashcards, mock tests | None | Weekly $5.99, monthly $17.99, quarterly $39.99 (one iOS app) [20] | 50+ to 5K+ installs each [1] | Many small clones |
| **TryHackMe** | Security beginners | Browser-based labs ("rooms"), CTF tasks | VMs, not animation | Freemium | Pulse app 50K+, 2.8★ [1] | — |

**D. Memory tools**

| Product | Use | Exercise types | Price | Scale | Complaints |
|---|---|---|---|---|---|
| **Anki / AnkiDroid** | Med, language and cert learners | Spaced-repetition cards (FSRS), self-rating, cloze | Free; AnkiMobile $24.99 once; 4th-best-selling paid iOS app in the US in 2025 [27] | 10M+, 168K reviews [1] | Sync bugs, complexity [2] |
| **Quizlet** | Students, global | Flashcards, Learn, Test, Match (timed), AI study guides | Plus $35.99/yr [27] | 50M+, 925K reviews [1]; "60M+ people" [27] | Free tier gutted, ads, AI everywhere [2] |
| **RemNote** | University students | Notes that become SR cards | IAP $14.99–399.99 [1] | 500K+, 4.8★ [1] | — |
| **Knowt** | Students | AI flashcards from notes | IAP $7.99–249.99 [1] | 500K+ [1] | — |

**E. Regional players**

| Region | Product | What it is | Evidence |
|---|---|---|---|
| China | **Wangdao (王道考研)** | The standard 408 books and video courses (DS, COA, OS, CN) | The 2027 four-book 408 set has 50,000 reviews on JD; its free DS video course has about 25M views on Bilibili [33] |
| China | **Nowcoder (牛客网)** | Question bank for 408 and placement written tests | 408 bank: 1,619 OS and 1,820 CN questions [33] |
| China | **LeetCode China (力扣)** | Separate CN site | — |
| Brazil | **Alura** | Subscription school with 2,300+ courses | Annual plan 12× R$122; promos at R$99/mo; corporate R$125–197 per user per month [41] |
| Indonesia | **Dicoding** | Developer academy, large government and bank-funded programmes | ~933 employees (2025) [43]; DBS Coding Camp targets 70,000 youth [43] |
| Japan | **Progate** | Slide-plus-code beginner lessons | 2M registered users (Mar 2021) [42] |
| UK | **Seneca** | GCSE, A-level and AP revision | 1M+, 3.9★; "word fills become trial and error" [1][2] |
| US schools | **Code.org, CodeHS** | Free or low-cost K-12 curricula, AP CSP endorsed | Default for AP CSP teachers [49] |
| YouTube | **Branch Education, Gate Smashers, Neso, Computerphile** | Free animated or lecture explainers | Branch Education: 2.78M subscribers, 125.5M total views [40] |

### 2.2 What the apps are like to use (Lazyweb screens [47] plus reviews)

- **Every big app shares one skeleton:** a path of lesson nodes, a hearts, lives or keys counter, a streak, an XP counter, and a paywall with a trial timeline ("today → reminder on day 5 → billed on day 7/14"). Mimo, Sololearn, Duolingo and Quizlet all use it [47].
- **Exercise screens are cards, not systems.** Sololearn and Mimo show one question per screen with a progress bar, MCQ or a fill-the-gap word bank, then immediate feedback with an explanation [47]. Duolingo adds audio, image matching and AI roleplay. None of the screens in the library show a learner manipulating a working system.
- **Out-of-lives modals with a countdown** (Mimo) and a "Try Pro" banner on the home screen are standard. Reviews punish both [2].
- **Brilliant** isn't in the Lazyweb library. From its store listing and reviews, it is the polish benchmark: one interactive per screen, and a tutor that "can sketch right on your screen" [1]. Long-time users say the AI tutor made lessons worse [2].
- **Cert apps** look like 2015 question banks: lists, MCQ, a timer and a score. Pocket Prep is the cleanest, and its users still complain about wrong questions and price hikes [2].
- **India apps** are video players with batch schedules. Most 1★ reviews are about access, refunds and app stability, not the teaching [2].

### 2.3 Complaint patterns (1–2★ "most helpful" reviews, US Play, 2026-11-09 [2])

| Pattern | Apps where it shows up | Lesson for us |
|---|---|---|
| Free content later paywalled | Quizlet, Enki, Programming Hub, Sololearn, Hyperskill | Already ruled out by the constitution. Say so loudly in marketing |
| Hearts, lives or keys gating learning | Sololearn, Mimo, Hyperskill | Never gate lessons with lives |
| Trial turned into an annual charge; hard to cancel; no refund | Sololearn, Brilliant, Unacademy, LeetCode, PW | Honest trial reminders, one-tap cancel, a published refund window |
| AI bolted on, lessons worse | Brilliant (Koji), Sololearn, Quizlet | AI only where it reads the figure state (later), and always optional |
| "Interactive" means only MCQ | Mimo, Seneca | Our core advantage: real manipulation |
| Wrong or outdated questions | Pocket Prep, GfG | "Last reviewed" dates, report-an-error, 7-day fix (already in the constitution) |
| Weak app vs website, crashes | LeetCode, Codecademy Go, GfG, Unacademy, PW | Smooth on low-end Android (already in the constitution) |

---

## 3. Audience sizing

### 3.1 Segment table

| Segment | Size (sourced) | Willingness to pay, price norms | Languages | How to reach | Exam season |
|---|---|---|---|---|---|
| **University CS students** | US: 108,503 CIS bachelor's degrees in 2021-22, double 2011-12 [28]. India: computer engineering UG enrolment up ~38% in three years from 9.3 lakh, so about 12.8 lakh (derived) [29]; AICTE approved 15.98 lakh B.Tech seats for 2025-26, led by CS [30]. China: ~902,000 students in computing programmes (2017) [31]. No single global figure found; the total is clearly several million | Low per student. US students pay for required course material (zyBooks) [16]. India: ₹300–3,000. Codédex charges India ₹2,699/yr (75% off) [14] | English; Hindi/Hinglish for Indian YouTube; Chinese | YouTube, Reddit, Discord, college clubs, instructors (B2B), the GitHub Student Pack (Codédex is in it [14]) | Semester exams: Nov–Dec and Apr–May (India), Dec and May (US) |
| **Placement and interview prep** | India: ~3.2 lakh computer engineering graduates a year (derived: 12.8 lakh ÷ 4) plus BCA/MCA (BCA up 87% in 5 years [29]). TCS NQT alone has certified 1 lakh+ candidates [48]. Global: 5M+ ranked LeetCode users (rough) [46] | India: low, but they pay for outcomes (Scaler ₹3.5 lakh+ [44]). US and global devs: $119–499 for prep [11][13] | English; Hinglish | YouTube (Striver, Apna College, NeetCode), Reddit (r/developersIndia, r/cscareerquestions), LinkedIn | India placements Jul–Dec; US internship recruiting Aug–Nov |
| **Entrance exams** | GATE CS: 2,59,922 registrations (2026), up from 99,555 in 2023 [51]. China kaoyan 2026: est. 3.3–3.8M candidates in all subjects [32]; 408 CS is set by more schools from 2026 [33]. BUPT alone had 5,200 applicants for 310 places [33] | India: ₹5K–41K coaching (from the earlier research). China: ¥50–100 books (Taobao from ¥58) [33] | English/Hindi; Chinese | YouTube, Telegram; Bilibili and Zhihu (China) | GATE: early Feb, registration Aug–Oct. Kaoyan: registration Oct, first exam late Dec [32] |
| **School CS** | AP CSP: ~163K takers in 2026, up from 102K in 2021 [35]. AP CSA: 93,906 (2025) [34], ~81,500 (2026) [34]. GCSE CS: 82,428 (2026), down from 92,778 (2024) [36]. A-level, IB and CBSE figures not found | Families pay £15–25/mo for revision platforms (earlier research); schools buy licences | English; local languages for national syllabuses | Teachers, Code.org/CodeHS ecosystem [49], TikTok/YouTube revision channels | AP: May. GCSE/A-level: May–June. CBSE: Feb–Mar |
| **IT certifications** | CompTIA: 3.6M+ certifications awarded [23]. A+: 1M+ holders [23]. Security+: 500K certified by 2019 and 1M+ by 2025, so about 83K a year (derived) [23]. Network+ total not published. AWS and CCNA totals not found | High: Network+ exam $369, Security+ $425 [20][25]. Realistic total spend $410–590 [20]. Apps charge $15–20/mo [19] | English first; CompTIA also examines in Japanese, Portuguese, Spanish and Thai [24] | r/CompTIA, r/ITCareerQuestions, Professor Messer's community, YouTube, Discord | Year-round, with spikes before retirement dates: SY0-701 retires 11 Jun 2027 [24]; New Year resolution spike in Jan |
| **Bootcamp grads, career changers, self-taught devs** | ~69,000 bootcamp graduates in 2024 (Career Karma est.) [38]. 47.2–48.4M developers worldwide (SlashData) [37]. CS50x: 4.8M+ learners [18] | Medium–high in tier-1 countries: Boot.dev $349/yr [10], Codédex $9.99–14.99/mo [14], Sololearn $69.99/yr [9] | English; Portuguese, Spanish, Indonesian and Vietnamese for PPP markets (Codédex's top markets [14]) | YouTube, Reddit, Product Hunt, newsletters | Year-round; Jan spike |
| **Curious adults** | Brilliant "10 million people" [1]; Branch Education 2.78M subscribers and 125.5M views [40]; ByteByteGo "5 million learning" [11] | Medium, but expensive to convert (Brilliant leans on YouTube creator sponsorships with referral links, e.g. brilliant.org/Daniel) | English | YouTube, shareable figures, SEO | None |

### 3.2 What this means

- **Volume is in Asia, the money is in tier-1 English markets.** India and China together have several times more students sitting OS/CN/DBMS/COA exams than the US and UK, at maybe a tenth of the price per person. Codédex's 75% India discount [14] is a realistic guide.
- **Within certifications, Security+ and A+ are bigger than Network+.** Network+ has no published total. Security+ is also required for many US Department of Defense roles (DoD 8140 lists seven CompTIA certifications [23]). Networking content still feeds all three exams.
- **Conversion benchmarks:** RevenueCat's 2026 report puts the median download-to-paid conversion at day 35 at 2.6% in North America. Education has the lowest share of conversions on day 0, and 51–59% of education subscriptions are yearly [39]. Learners decide slowly, so a long free period with real value beats a hard paywall.
- **Illustrative arithmetic, not a forecast.** Take 100,000 installs, 30% from tier-1 countries converting at 2.6% at $60, and 70% from PPP countries converting at 1% at $15. Tier-1: 30,000 × 2.6% × $60 = $46,800. PPP: 70,000 × 1% × $15 = $10,500. The tier-1 minority brings 82% of revenue, so marketing spend should go there while YouTube brings the volume.

---

## 4. Exercise-type catalogue

★ = no competitor does this well for CS fundamentals on a phone, so it's a place where we can win.

| # | Exercise type | Who uses it | Good for | How it works as an interactive-animation exercise here |
|---|---|---|---|---|
| 1 | Single-answer MCQ | Everyone (Sololearn, Mimo, Pocket Prep, GfG, Testbook) | Quick recall, exam format | The options are figure states ("which of these packets is the reply?"), not text |
| 2 | Multi-select | Sololearn, Pocket Prep, CompTIA exams | Nuanced recall | Tap every faulty device in the topology |
| 3 | Fill the gap / word bank | Duolingo, Sololearn, Seneca, Hyperskill | Terms | Drop a header field label into the right slot of a packet; avoid the trial-and-error problem Seneca users report |
| 4 | Typed or numeric answer | Brilliant, zyBooks, subnetting apps | Calculation (subnets, page numbers, cache hits) | Type the answer, then the figure animates your value so you see if it fits |
| 5 | Drag to order a sequence | Runestone (Parsons), Brilliant, CompTIA PBQs | Processes (handshake, boot, fetch-decode-execute) | Order the TCP handshake cards, then the figure plays your order, including the failure if it's wrong |
| 6 | Match pairs (often timed) | Quizlet Match, Duolingo | Ports, protocols, acronyms | Port Match (already in the pilot) |
| 7 | Sort into buckets | Brilliant, Seneca | Classification | Drag protocols onto TCP or UDP lanes; the lane animates each protocol's behaviour |
| 8 | Label the diagram / hotspot | CertMaster, A+ apps, Pocket Prep's new pictures | Hardware and topology parts | Tap the switch, router or AP on the isometric figure |
| 9 | Predict the output (code) | Sololearn, Mimo, Enki, CS50 | Code reasoning | Generalised to "predict the next state" (row 10) |
| 10 | ★ Predict, then reveal on a working system | Brilliant (math and logic only) | Building a mental model; the strongest recall effect | Before the step plays: "which process runs next?", "where does this frame go?" Then the figure plays and shows why |
| 11 | ★ Step through an algorithm with checkpoints | VisuAlgo, zyBooks, Runestone CodeLens (DSA only; desktop) | OS scheduling, paging, deadlock, B-tree inserts, routing, transactions | A Next/Back stepper with a question at key steps; works by touch and keyboard |
| 12 | ★ Manipulate a simulation (sliders, toggles) | Brilliant, Packet Tracer (unguided), PhET-style sims | Cause and effect (quantum size, cache size, MTU, latency) | Live readout driven by the model (already an Anatomy figure rule) |
| 13 | ★ Break it / fault injection | Packet Tracer labs (desktop), TryHackMe (security VMs) | Understanding by failure | Unplug a cable, kill DNS, fill the disk, cause a deadlock, and watch the effects spread |
| 14 | Debug or fix a broken system | Boot.dev (code), CompTIA PBQs, Packet Tracer | Troubleshooting (Network+ domain 5) | Ticket-style "café Wi-Fi is down": find and fix the fault in the figure |
| 15 | ★ Build or wire a topology by touch | Packet Tracer (desktop), NetCLI (CLI), CertMaster Labs | PBQs, design | React Flow canvas: drag devices, draw links, assign IPs, then press Test |
| 16 | CLI simulation | NetCLI, Packet Tracer, TryHackMe | Real commands | Mini-terminal (`ping`, `ipconfig`, `tracert`) whose output drives the figure |
| 17 | ★ Packet or state x-ray | Wireshark (pro tool); none in learning apps | Layers and encapsulation | Tap a packet to peel its headers layer by layer (already in the pilot) |
| 18 | ★ Mistake replay | None found | Turning errors into lessons | A wrong answer plays out what would actually happen (already in the pilot) |
| 19 | ★ Spot the difference | None found in CS | Diagnosis, attention | Two network or memory states side by side: tap what changed |
| 20 | Spaced-repetition cards | Anki (FSRS), Quizlet, RemNote, Knowt | Long-term memory | ★ Visual cards: the "card" is a frozen figure state with one question, not text |
| 21 | Missed-question replay | Pocket Prep "Missed Questions" [19] | Fixing weak spots | The due-review list, with the original figure state restored |
| 22 | Timed drills | Quizlet Match, subnetting apps, Testbook | Speed (subnetting, ports) | Subnet Sprint, Port Match with personal bests (in the pilot) |
| 23 | Full timed mock exam | Pocket Prep, Dion, ExamCompass, Testbook, Unacademy | Exam readiness | Exam-like interface scored out of 900, including figure-based PBQs (Pro) |
| 24 | Performance-based question sims | CertMaster, Dion, Total Seminars TotalSims | The hardest part of CompTIA exams | ★ A touch-first PBQ built on our figures and React Flow, which is the main reason a cert learner pays |
| 25 | Previous-year question practice | GATE apps, Nowcoder 408 bank, Testbook | Exam pattern | Original questions "in the style of" GATE or 408, never copied, each linked to its figure |
| 26 | Explain in your own words (AI-graded) | Duolingo roleplay, Educative AI mock interviews, NeetBot [13] | Interviews, deep understanding | ★ The interview answer card: say or type an answer, get compared to a model answer, self-rate. Add AI grading later |
| 27 | Daily puzzle or challenge | LeetCode daily, Codédex monthly challenge | Habit | A 2-minute "daily ticket": one broken thing to fix |
| 28 | Boss fight / capstone | Boot.dev challenges, Codédex projects | Integration | A multi-fault capstone ticket per module (in the pilot) |
| 29 | Projects | Boot.dev, Hyperskill, Mimo Max | Portfolio | "Build the Brew & Byte network", which keeps growing across modules |
| 30 | Socratic AI tutor | Brilliant Koji, Khanmigo, Sololearn AI | Getting unstuck | Later and optional: "ask about this figure", using the exact figure state as context |
| 31 | Video plus quiz | Khan, Udemy, Unacademy, PW, Messer | Coverage | Not our format. Narrated mode only as an accessibility option |
| 32 | Community discussion per question | Sololearn, GfG | Peer help | Later; moderation cost |

---

## 5. Recommendations

### 5.1 Audience ranking, and why

1. **Paid beachhead: adults moving into IT (CompTIA A+, Network+, Security+), tier-1 English markets first.**
   - They pay the most per person and pay quickly, because an exam date is booked [20][25].
   - Their syllabus is networking, OS, hardware and security, which is our library.
   - Their hardest exam items are PBQs, which are simulations, so our format fits.
   - The competition is free video (Messer) plus question banks (Pocket Prep, Dion). Nobody teaches with interactive figures.
   - They are easy to find in r/CompTIA and on YouTube.
   - Start with the Network+ mapping already in the pilot. Add **Security+ SY0-801** next, because every learner needs new material before SY0-701 retires on 11 June 2027 [24]. Then add A+ Core 1 (networking and hardware).
2. **Free-reach beachhead: CS students worldwide, India first.** The same lessons, with track callouts ("asked in placement interviews", "GATE CN"). Distribute through YouTube Shorts, including Hinglish ones, during placement season (Jul–Dec) and GATE season (Aug–Feb). Charge a cheap PPP placement or GATE pack later. This builds volume, ratings and the YouTube channel, which bring tier-1 users too.
3. **Developers ("under the hood" before system design).** ByteByteGo and NeetCode show developers pay $119–499 for visual explanations [11][13], and ByteByteGo's are static. Add the Systems track once OS, networking and databases exist: caching, load balancers, queues and replication as interactive figures.
4. **University coursework, then B2B to instructors.** zyBooks shows US instructors assign animated, auto-graded material [16]. Once we have OS, networking, databases and architecture, offer an instructor dashboard.
5. **School CS (B2B).** AP CSP is growing [35]; GCSE CS is shrinking [36]. Hold this until there's an education compliance plan (COPPA, UK Children's Code).
6. **China 408.** Revisit only through a local partner or licensing deal. The subject match is perfect [33], but distribution is closed.

### 5.2 Positioning

**"See how computers and networks actually work. Touch them, break them, fix them."**

Where we win clearly:
- **Against question banks** (Pocket Prep, cert apps): we teach the concept before testing it, and our PBQs are real simulations.
- **Against video** (Messer, Gate Smashers, Branch Education): learners act instead of watching, and they can check themselves.
- **Against Brilliant:** we go to exam level in OS, networking and databases, with exam mapping and no daily lesson cap.
- **Against ByteByteGo and Educative:** our figures move and respond, and they aren't text.
- **Against VisuAlgo and Packet Tracer:** we're guided, phone-first and short.
- **Against every gamified coding app:** no lives, no paywall creep, honest trials. Put this in the store listing, because reviewers are asking for it [2].

### 5.3 Curriculum order

| Order | Module | Main tracks it feeds | Why here |
|---|---|---|---|
| 1 | **Networking** (pilot: OSI, ports, IPv4 and subnetting, troubleshooting) | Network+, Security+, A+, CCNA, GATE CN, 408 CN, AP CSP, Systems | The most shared subject across all audiences |
| 2 | **Security basics** (CIA triad, crypto, hashing, TLS, auth, common attacks) | Security+ SY0-801, Systems, AP CSP, GCSE | Catches the SY0-801 window [24] |
| 3 | **How a computer works** (binary, logic gates, CPU cycle, memory hierarchy, storage, boot) | A+, every student track, curious adults | The foundation for OS and architecture; strong Shorts potential (Branch Education's audience [40]) |
| 4 | **Operating systems** (processes, scheduling, memory and paging, deadlock, file systems) | Placements, GATE, 408, A+ (OS domain), uni | The best fit for predict and step-through exercises |
| 5 | **Databases** (keys, normalisation, indexes and B-trees, joins, transactions and ACID, concurrency) | Placements, GATE, uni, Systems | High interview frequency |
| 6 | **Systems foundations** (client-server, caching, CDNs, load balancing, queues, replication) | Developers | Opens the developer track |
| 7 | **Computer architecture** (pipelining, caches, ISA, interrupts, DMA) | GATE, 408, uni | Depth for exam tracks |
| 8 | **Data structures and algorithms (visual)** | Uni, placements, 408 | Crowded (VisuAlgo, NeetCode), so only once our step-through engine is mature |
| 9 | **Cloud basics** (virtualisation, containers, IaaS/PaaS/SaaS, regions) | AWS Cloud Practitioner, A+ | A cheap add-on with the existing figures |
| Later | Digital logic, TOC, compilers, discrete maths | GATE only | Narrow audience; do them last |

### 5.4 Must-have exercise types and retention mechanics

**Exercises, MVP and next module:**
1. Predict then reveal (#10)
2. Step-through with checkpoints (#11)
3. Manipulate the simulation (#12)
4. Break it (#13)
5. Mistake replay (#18)
6. Packet x-ray (#17)
7. Drag to order and sort into buckets (#5, #7)
8. Touch-built topology PBQs (#15, #24)
9. Timed drills (#22)
10. Visual spaced-repetition cards (#20) with missed-question replay (#21)
11. Interview answer card with self-rating (#26)
12. A capstone ticket per module (#28)

**Retention:**
- **Spaced review:** a due queue scheduled with FSRS-style intervals (the algorithm Anki uses), using figure-state cards. Basic review stays free, because it is part of learning that sticks.
- **Streak with automatic free freezes**, and no guilt notifications (constitution V). Weekly goals are an alternative to streaks for adults.
- **No hearts, lives or keys.** This is the most-complained-about mechanic [2].
- **Exam-date planner:** the learner enters their real exam date, and the app paces review to it. This is a real date, not a fake timer.
- **Readiness per objective** (heat map) and **night-before mode** (Pro).
- **Daily ticket:** one 2-minute broken system a day, which gives people a reason to open the app.
- **Shareable result cards** ("closed week 1", "subnetting personal best") for LinkedIn and Reddit.

### 5.5 Pricing and the free/paid split

**Rule:** we charge for *practice depth and exam readiness*, never for *understanding*. Every teaching lesson, figure and basic review is free forever, which keeps "free content stays free" safe even as the catalogue grows.

| Free forever | Pro |
|---|---|
| Every lesson in every module, all figures, share links | Exam-mapped question banks per track (Network+, Security+, A+, GATE, placements) |
| Predict, break-it, mistake replay inside lessons | PBQ simulations and full timed mock exams |
| Basic due-review queue, drills with personal bests | Readiness heat map per objective, exam-date planner, night-before mode |
| No ads in lessons, ever | Offline packs, interview answer card bank, (later) AI "ask about this figure" |

| Price tier | Countries (follow Codédex's GNI-PPP tiers [14]) | Yearly | Monthly | 90-day exam pass |
|---|---|---|---|---|
| Tier 1 | US, UK, CA, AU, Western Europe, Gulf | $59.99 | $11.99 | $29.99 |
| Tier 2 (~50% off) | Brazil, Mexico, Colombia, Chile, Indonesia, Philippines, Argentina | ~$30 | ~$6 | ~$15 |
| Tier 3 (~75% off) | India, Vietnam, Pakistan, Bangladesh, Nigeria | ₹1,199 (~$15) | ₹199 | ₹399 placement or GATE season pass |

Why these numbers:
- Tier 1 sits below Brilliant ($161.88) [5], Hyperskill (€399) [15] and ByteByteGo ($189) [11], and near Sololearn PRO ($69.99) [9].
- The exam pass matches how cert learners buy (Pocket Prep's $15–20 a month [19], and competitor apps' $39.99 quarterly plans [20]).
- Students uninstall after the season (earlier research), so season passes fit them better than subscriptions.
- Skip a lifetime plan at launch. Codédex dropped its lifetime tier and paid signups rose 20% [14]. Revisit it for the developer track, where lifetime is normal [11][13].
- These are hypotheses to A/B test once payments exist (they're out of scope for the pilot).

**Trial honesty:** a 14-day trial with a reminder 2 days before billing, cancelling from the settings screen in one tap, and a 14-day refund window on web purchases. This answers the most common 1★ reviews [2].

### 5.6 Launch and distribution plan

| Phase | When | What | Channels | Exit signal |
|---|---|---|---|---|
| 0. Pilot (now) | Nov 2026 – Jan 2027 | 4 Network+ lessons on the web, share links, email capture | 3–5 Shorts per lesson from the figures; r/CompTIA, r/ITCareerQuestions, r/networking; Professor Messer and Dion study-group communities (where their rules allow) | Spec 001 targets; ≥5% email capture |
| 1. Networking + Security | Feb – Jun 2027 | Full networking module, Security basics, Security+ SY0-801 lens, payments, Android (Capacitor) | Launch "SY0-801 visual" content before 11 Jun 2027 [24]; SEO page per concept (each figure is a URL); Product Hunt | First 100 paying users; ≥4.5★ |
| 2. India reach | Jul – Dec 2027 (placement season) | Placement and GATE callouts on networking, then the How-a-computer-works and OS modules; Hinglish Shorts | YouTube Shorts, Telegram and Discord groups, college coding clubs, Unstop or campus ambassadors | Installs and ratings; tier-3 conversion ≥1% |
| 3. Developers | 2028 | Databases + Systems foundations; Systems track | Dev newsletters, Hacker News, LinkedIn; collaborations with system-design creators | Tier-1 revenue > tier-3 |
| 4. B2B | 2028+ | Instructor dashboard (uni, community colleges, NetAcad instructors), then schools | Direct outreach, conferences (SIGCSE) | 10 paying classes |

Always-on habits:
- **One figure → one Short → one web page.** Branch Education's 125M views show the appetite for this [40].
- **Reply to every review** within 48 hours.
- **Publish a changelog** with "last reviewed" dates, as an answer to the "outdated questions" complaints.

### 5.7 Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Distribution fails (the Nakshatra apps got 10–500 installs [1]) | High | Video first; every figure is a public URL; validate before building more modules |
| Content is slow and costly to make (each interactive figure is hand-built) | High | One library, many tracks (constitution VI); a reusable figure kit; prioritise shared modules |
| AI chat explains concepts for free | Medium | Interactivity, exam mapping and PBQs are what AI chat can't give; add figure-aware AI later |
| Exam versions change (N10-009, SY0-801, A+ 220-1201) | Certain | Map objectives in a data layer; core lessons stay neutral |
| Trademark or "unofficial" confusion with CompTIA | Medium | Disclaimers (already planned); no CompTIA logos; original questions only |
| Brilliant expands into systems topics | Medium | Move faster on exam depth and tracks, which Brilliant avoids; PPP pricing it doesn't offer in its listed prices |
| Low ARPU in India pulls the roadmap toward cheap features | Medium | Keep tier-1 cert and developer tracks as the revenue focus; India stays the reach channel |
| Store fees (15–30%) | Certain | Web checkout through Stripe for desktop and web buyers |
| Minors in school tracks | Later | Age gate; no school track until there's a compliance plan |

---

## 6. Does Network+ stay the first module?

**Yes, as the first module and the first exam lens. No, as the identity of the app.**

- **Keep it.** Networking is the most reused subject: 25 of 150 marks in China's 408 [33], CN in GATE and placements, and the networking domains of Network+, Security+ and A+. It's already built, and it's the topic where touchable figures (packets, topologies, ports) add the most over text.
- **Change the frame.** Position the pilot as "how networks work", with Network+ as the first lens, so the same pages also work for a CS student. Measure both audiences in the pilot (traffic source, self-reported goal on email capture).
- **Change what comes second.** The product brief's Phase 2 is "Placement pack (OS + DB) in India". Make Phase 2 **Security basics + the Security+ SY0-801 lens**. India reach moves to Phase 3, timed with placement season, and the free lessons still go to India from day one.

---

## 7. What the earlier research got right and wrong

| Earlier claim | Verdict | Update |
|---|---|---|
| Nobody has an animation-first app for OS, DBMS, CN, COA | **Right** | Still true across 45+ products. The visual tools found are passive, desktop or unguided |
| Distribution is harder than building | **Right** | Nakshatra apps are still at 10–500 installs [1] |
| Brilliant doesn't cover these subjects | **Half right** | It has "How Technology Works", "Digital Circuits" and "CS Fundamentals" [6], but not exam-level OS, databases or networks |
| Brilliant costs about ₹1,199/month in India | Unverified | US price confirmed at $27.99/mo or $161.88/yr [5] |
| Network+ voucher is about $358 | Close | $369 retail; $357.99 is the discounted voucher [20] |
| School CS is a "good" segment | **Mixed** | AP CSP is growing [35]; GCSE CS fell 11% in two years [36] |
| Audiences ranked with IT certs first | **Right**, refined | Security+ (1M+ holders, SY0-801 timing) and A+ (1M+) are bigger than Network+ [23] |
| India is the largest volume | Right, but incomplete | China's 408 is the other giant and matches the subjects exactly [33]; it wasn't in the earlier research |
| Lifetime pricing suits students | Partly | Season passes fit students; Codédex's data argues against lifetime plans at launch [14] |
| Engagement ideas (predict, break it, mistake replay, packet x-ray) | **Right** | Confirmed as gaps: no competitor found doing them for CS on a phone (section 4) |
| Not covered before | New | Lives and hearts backlash, trial-billing anger, and AI-tutor backlash (section 2.3); PPP tier evidence; the RevenueCat conversion benchmark |

---

## 8. Proposed changes to the existing plan (not applied)

1. **`PRODUCT.md` → Users:** broaden the primary user from "career changers studying for Network+" to "adults moving into IT studying for CompTIA exams (Network+ first, then Security+ and A+)", and add "CS students worldwide (India first) use the same free lessons" as a secondary audience.
2. **`PRODUCT.md` → Positioning:** add "no lives, no paywall creep, honest trials", which answers the top complaints.
3. **`docs/product-brief.md` §7 Business model:**
   - replace "Free: every lesson in the first module, and the first two lessons of every other module" with "every teaching lesson free; Pro sells practice depth and readiness";
   - add the 90-day exam pass and the three PPP tiers;
   - drop the launch lifetime plan.
4. **`docs/product-brief.md` §8 Roadmap:** Phase 2 becomes Security basics + the Security+ SY0-801 lens (by June 2027); India placements move to Phase 3, timed to Jul–Dec.
5. **`docs/product-brief.md` §5 Curriculum:** reorder as in section 5.3 (Security second, DSA late, add Cloud basics).
6. **Constitution, Content Standards:** it still says "Hairline's isometric line style", while `PRODUCT.md` switched to the Anatomy kit on 2026-11-08. Change it to Anatomy (a PATCH bump).
7. **Spec 001:** add a "learner goal" question to email capture (cert / student / developer / curious) so the pilot measures which audience shows up.

---

## 9. Method and limits

- **Store data:** US Google Play listings and 1–2★ review samples (5 one-star and 3 two-star "most helpful" reviews per app), read in the built-in browser on 2026-11-09. Play shows install buckets, not exact counts. App Store ratings weren't collected.
- **Web research:** TinyFish search and fetch (free). No paid tools were used: no VidIQ, treg, TinyFish deep research or datasets. Branch Education's figures come from a public stats web page found through search, not from a VidIQ tool call.
- **App UI:** Lazyweb screen search across Mimo, Sololearn, Duolingo and Quizlet. Brilliant, Khan, Codecademy and Enki aren't in the library.
- **Not found** (shown as gaps rather than guessed): a global CS-student total, Network+ annual takers, AWS and CCNA certified totals, A-level/IB/CBSE CS entries, China's 408 total, AlgoExpert's current price, and PW/Unacademy GATE batch prices.
- Exercise types for each product come from their own pages, the Lazyweb screens and reviews. Where I didn't verify a feature, the cell is left empty or says "not captured".

## 10. Sources

1. Google Play US listings, read 2026-11-09: `play.google.com/store/apps/details?id=` + org.brilliant.android, com.sololearn, com.getmimo, com.enki.insights, org.khanacademy.android, com.freeit.java, free.programming.programming, com.pocketprep.android.itcybersecurity, com.quizlet.quizletandroid, com.ichi2.anki, com.remnote.v2, com.unacademyapp, xyz.penpencil.physicswala, com.testbook.tbapp, org.hyperskill.app.android, com.ryzac.codecademygo, com.datacamp, com.leetcode.android, com.nakshatra.os_vision, com.nakshatra.dbms_master, com.nakshatra.automind_toc, com.edurev.gatecse, itsmcqsapp.com.computerscience, com.messer.MesserConnect, com.examcompassng.ExamCompass, io.schjoldr.netcli, com.learnzapp.ccna, com.keepprep.network, com.edupass.comptianetworkplus, com.techprep.networkplus, com.anonymous.educativeGo, com.knowt.app, org.freecodecamp, org.nesoacademy, com.udemy.android, org.coursera.android, com.tryhackme.mobileapp, com.senecalearning.app, in.softecks.computerfundamentals, com.duolingo
2. Google Play 1–2★ review samples ("most helpful", US), same apps, 2026-11-09
3. Growjo, Brilliant.org revenue estimate: https://growjo.com/company/Brilliant.org
4. Getlatka, Brilliant revenue: https://getlatka.com/companies/Brilliant
5. Brilliant prices: https://nibble-app.com/blog/is-brilliant-worth-it ; https://e-student.org/brilliant-org-review/
6. Brilliant course catalogue: https://brilliant.org/courses/
7. Getlatka, Mimo (Growjo estimate): https://getlatka.com/companies/getmimo.com
8. Mimo plans: https://mimo.org/pro
9. Sololearn plans: https://www.sololearn.com/en/plans
10. Boot.dev: https://www.boot.dev/pricing ; https://www.boot.dev/blog/education/bootdev-vs-codecademy ; https://www.boot.dev/blog/news/bootdev-beat-2026-01 ; https://www.startupsfortherestofus.com/episodes/episode-688-growing-boot-dev-from-6k-to-110k-in-monthly-revenue-in-15-months ; https://www.trustpilot.com/review/www.boot.dev
11. ByteByteGo: https://bytebytego.com/ ; https://prachub.com/resources/bytebytego-pricing ; https://x.com/alexxubyte/status/1818676015646097858 ; https://www.youtube.com/ByteByteGo
12. Educative: https://devopscube.com/educative-io-review/ ; https://dev.to/alex_hunter_44f4c9ed6671e/is-educativeio-worth-it-in-2025-a-comprehensive-review-1n7j
13. NeetCode Pro: https://neetcode.io/pro
14. Codédex: https://www.codedex.io/pricing ; https://www.codedex.io/blog/introducing-localized-pricing ; https://www.codedex.io/blog/codedex-update-january-2025
15. Hyperskill pricing: https://hyperskill.org/pricing
16. zyBooks: https://www.zybooks.com/subjects/all-cs/ ; https://support.zybooks.com/hc/en-us/articles/360007333794-About-zyBooks
17. VisuAlgo: https://visualgo.net/
18. CS50: https://fortune.com/education/articles/nearly-5-million-people-have-taken-this-online-course-heres-how-it-can-kickstart-your-computer-science-career/
19. Pocket Prep: https://www.pocketprep.com/ ; https://www.pocketprep.com/frequently-asked-questions/
20. Network+ cost: https://totalsem.com/comptia-network-plus-exam-cost/ ; https://www.comptia.org/en-us/blog/the-new-network-n10-009-exam-your-questions-answered/ ; iOS Network+ prep pricing: https://apps.apple.com/bw/app/comptia-network-prep-2026/id6593684728
21. Udemy Network+ / Jason Dion: https://www.udemy.com/topic/comptia-network/ ; https://www.udemy.com/user/jason-dion/
22. CertMaster bundle prices: https://www.superprof.com/blog/comptia-network-exam-cost/
23. CompTIA: https://www.comptia.org/en-us/about-us/ ; https://www.comptia.org/en-us/about-us/news/press-releases/1-million-strong-how-comptia-security-shapes-cybersecurity-skills-around-the-world/ ; https://www.comptia.org/en-us/blog/10-reasons-why-you-should-get-comptia-a-certified/ ; DoD 8140: https://cybersecurityguide.org/programs/cybersecurity-certifications/security/
24. Security+ SY0-801 dates and exam languages: https://www.secuspark.com/blog/security-plus-sy0-801-release-date ; https://www.certcrush.app/blog/security-plus-sy0-801-vs-sy0-701-whats-changing-2026
25. Security+ exam price: https://www.coursera.org/articles/what-is-the-comptia-security-plus-certification
26. Cisco Packet Tracer: https://www.netacad.com/cisco-packet-tracer
27. Anki and Quizlet: https://nibble-app.com/blog/anki-vs-quizlet ; https://www.reddit.com/r/Anki/comments/1qyhf7x/ ; https://studycardsai.com/blog/flashcard-statistics
28. NCES Digest table 318.30: https://nces.ed.gov/programs/digest/d23/tables/dt23_318.30.asp
29. AISHE via Indian Express: https://indianexpress.com/article/education/enrollments-in-computer-engineering-surge-mechanical-sees-a-dip-aishe-report-9128852/ ; https://indianexpress.com/article/education/computer-engineering-emerges-as-indias-most-popular-branch-aishe-report-mehanical-civil-electrical-iit-jee-10780107/
30. AICTE intake: https://indianexpress.com/article/education/aicte-data-btech-seats-fill-fast-as-computer-science-drives-enrolment-to-eight-year-high-10166287/
31. China computing education (ASEE 2019): https://peer.asee.org/31997
32. China kaoyan 2026 numbers and dates: https://kaoyan.eol.cn/zaizhi/article/p6513 ; https://lib.kmu.edu.cn/info/1102/9686.htm
33. 408 exam: https://www.codefather.cn/post/1831923702136107009 ; https://cs.cqu.edu.cn/info/1553/11416.htm ; https://m.successkaoyan.com/jsj/51374.html ; https://www.nowcoder.com/kaoyan ; https://shangan408.online/learn ; https://www.jd.com/jiage/17130974907fc3ec027c.html ; https://www.taobao.com/list/product/408%E8%AE%A1%E7%AE%97%E6%9C%BA%E8%80%83%E7%A0%94.htm
34. AP CSA: https://apcentral.collegeboard.org/media/pdf/ap25-computer-science-a-score-distributions.pdf ; https://www.totalregistration.net/AP-Exam-Registration-Service/AP-Exam-Score-Distributions.php
35. AP CSP growth: existing `market-research.md`; https://www.facebook.com/tineocollegeprep/videos/1432746115282483/
36. GCSE CS entries: https://teachcomputing.org/blog/gcse-results-2026
37. SlashData developer population: https://www.slashdata.co/research/developer-population
38. Career Karma bootcamp report: https://careerkarma.com/blog/state-of-the-bootcamp-market-report-2024-statistics-and-share-analysis/
39. RevenueCat State of Subscription Apps 2026: https://www.revenuecat.com/state-of-subscription-apps
40. Branch Education stats: https://vidiq.com/youtube-stats/channel/@brancheducation/ ; https://branch.education/
41. Alura: https://www.sitesdetecnologia.com.br/alura-vale-a-pena/ ; https://benway.com.br/blog/alura-e-bom-review-2026
42. Progate: https://progate.com/about/news/373
43. Dicoding: https://www.reveliolabs.com/companies/dicoding-indonesia/employees ; https://www.dbs.com/newsroom/In_celebration_of_youth_pledge_day_DBS_Foundation_Dicoding_are_set_to_develop_70000_young_digital_talents_through_Coding_Camp_powered_by_DBS_Foundation
44. Scaler: https://www.scaler.com/topics/is-scaler-academy-worth-it/
45. GeeksforGeeks: https://www.zoominfo.com/c/geeksforgeeks/348290765 ; https://www.linkedin.com/posts/sandeep-jain-_for-first-5-years-i-had-no-income-from-geeksforgeeks-activity-7190182940348166146-7IF5
46. LeetCode user count analysis: https://leetcode.com/discuss/interview-question/6197372/FIgured-out-how-many-users-there-are-in-leetcode/
47. Lazyweb screen library (user's account), queried 2026-11-09: Mimo, Sololearn, Duolingo, Quizlet
48. TCS iON NQT: https://www.tcsion.com/hub/national-qualifier-test/
49. CodeHS and Code.org: https://codehs.com/ ; https://code.org/en-US/curriculum/computer-science-principles
50. (reserved)
51. GATE CS registrations: existing `market-research.md` (2023–2026 series)

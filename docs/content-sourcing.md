# How We Gather Content: Modules, Lessons and Sources

**Date:** 2026-11-09 | **Builds on:** `docs/global-market-research.md` (audiences, curriculum order) | **Status:** proposal. Nothing in `app/`, `PRODUCT.md`, the constitution or spec 001 was changed.

Sources are in brackets and listed at the end.

---

## 1. The short answer

**Don't build the app from one book, and don't build it from other apps.** Use four inputs, each for a different job:

| Job | Use | Don't use it for |
|---|---|---|
| **What to teach** (which modules and lessons, and how deep) | Official syllabuses and exam objectives: CompTIA, GATE, China's 408, the ACM/IEEE CS2023 curriculum, AP CSP, GCSE | Wording. Objectives are lists, not explanations |
| **Is it correct** | One trusted textbook per module, plus the primary standards (RFCs, vendor docs) | Deciding the lesson order. Textbooks follow a semester, not an exam or a 7-minute lesson |
| **How to teach it** | Research on student misconceptions, plus real learner questions (Reddit, Stack Exchange, YouTube comments) | Facts. Learners are often wrong, which is the point |
| **Have we missed anything** | Competitor apps and courses (Messer's video index, Neso's playlists, GfG's topic lists) | Copying anything. We compare coverage and granularity only |

So the answer to "book or apps?" is: **syllabus for the outline, book for the truth, research for the teaching, apps only to check coverage.**

Why not one book:
- A textbook is written for a 14-week course. Its order and depth don't match a Network+ learner, a GATE aspirant or a placement interview.
- Its wording, figures and exercises are copyrighted, and we must not copy them (section 4).
- One book has blind spots. A university networking textbook is written for a CS course, while Network+ also tests rack power, documentation and disaster recovery [2].

Why not other apps:
- Most competitors are question banks or text with MCQs (see the global research), so copying their structure means copying their weakness.
- Their questions are their copyright.
- In certification prep, recycled real exam questions ("brain dumps") get candidates' certifications revoked [2], so we must never go near them.

---

## 2. Layer 1: the spine (what to teach)

We build one **concept list** for each module: the union of every syllabus that tests that subject, with each concept tagged with who needs it and how deep.

| Subject | Syllabuses to merge | Status |
|---|---|---|
| Networking | CompTIA Network+ N10-009 (5 domains, 25 objectives) [2]; GATE 2027 CS Section 10 [3]; 408 computer networks part [7]; CS2023 "Networking and Communication" [4]; AP CSP "Computing Systems and Networks" | Network+ and GATE read in full (below); others still to merge |
| Security | Security+ SY0-801 (launched 17 Nov 2026); Network+ domain 4 [2]; CS2023 Security | Get the SY0-801 objectives PDF from CompTIA |
| How a computer works | A+ Core 1 hardware; GATE Sections 2–3 (digital logic, COA) [3]; GCSE and AP CSP | To merge |
| Operating systems | GATE Section 8 [3]; 408 OS part; A+ Core 2 OS; CS2023 OS [4] | To merge |
| Databases | GATE Section 9 [3]; CS2023 Data Management [4]; placement interview topics | To merge |

**Depth tags** per concept: `recognise` (name it, pick it in an MCQ), `explain` (say why, predict behaviour), `apply` (calculate, configure, troubleshoot). Network+ uses "explain", "compare and contrast", "summarise" and "given a scenario" verbs in its objectives [2]. Those map straight onto the tags, so the depth of each concept comes from the syllabus, not from our guess.

**Weighting:** where an exam publishes weights, they tell us where to spend effort. Network+: Concepts 23%, Implementation 20%, Operations 19%, Security 14%, Troubleshooting 24% [2]. For GATE, count past-paper marks per topic. Learners often say OS and CN together carry about 17–20 marks, but that's an unverified LinkedIn claim, so we count it ourselves from the official papers.

**Core vs track lessons.** Some concepts appear in several syllabuses (subnetting, TCP, DNS). These become **core lessons**, written once. Others appear in only one (Network+ disaster-recovery metrics, rack power, DHCP options) and become **track lessons**, shown only in that track. The constitution says tracks add "mapping, callouts and their own question banks" but doesn't mention track-only lessons. Section 8 proposes a small amendment.

---

## 3. Layer 2: sources of truth (is it correct)

Each module gets **one primary textbook** (our reference), **one or two cross-check sources**, and the **primary standards** for anything protocol-level. The licence decides what we may do with each one.

| Module | Primary reference | Licence: what we may do | Cross-checks and standards |
|---|---|---|---|
| Networking | *Computer Networks: A Systems Approach* (Peterson & Davie), free online | **CC BY 4.0** [5]: we may adapt text, structure and diagrams with attribution | Kurose & Ross (reference only, copyrighted); RFCs (IPv4 791, TCP 9293, DNS 1034/1035, DHCP 2131, ARP 826, private addresses 1918); Cisco and Microsoft docs for commands |
| Security | *Network Security: A Systems Approach* (same project) | Licence not checked yet; check before use [5] | NIST glossary; SY0-801 objectives |
| Operating systems | *Operating Systems: Three Easy Pieces* (Arpaci-Dusseau), free PDFs | **Free to read, not openly licensed.** The authors ask instructors to link to the chapters, not copy them [6]. So: read, cite and link; never copy | Silberschatz *Operating System Concepts* (reference) |
| Databases | *Database Design, 2nd ed.* (Watt & Eng, BCcampus) | **CC BY 4.0** [8]: may adapt with attribution | Silberschatz *Database System Concepts* (reference); PostgreSQL docs for real behaviour |
| How a computer works / architecture | Nand2Tetris course; Patterson & Hennessy (reference) | Check the course materials' licence before reuse | Intel and ARM docs for real-world callouts |
| DSA (later) | Open textbooks such as *Open Data Structures* | Licence not checked yet | CLRS (reference) |

Rules for using them:
- **Every lesson cites at least one of these** (the constitution already requires a cited, authoritative source [principle II]).
- **CC BY 4.0 sources are the only ones we adapt directly**, and only with attribution on the lesson's "sources" panel. Prefer CC BY over CC BY-SA, because share-alike would force our own lesson to carry the same licence.
- **Copyrighted books are for checking facts, never for wording, figures or exercises.**
- **AI is a drafting and cross-checking tool, not a source.** Every claim in an AI-drafted script must trace back to one of the sources above before review.

---

## 4. Copyright and exam rules (what keeps us safe)

1. **Facts and ideas are free; expression isn't.** US law says copyright doesn't protect "any idea, procedure, process, system, method of operation, concept, principle, or discovery" [9][10]. The TCP handshake, subnetting arithmetic and how a page table works are free to teach. A specific author's sentences, diagrams and exercise wording aren't.
2. **CompTIA objectives are copyrighted**, and the PDF says "reproduction or dissemination prohibited without the written consent of CompTIA" [2]. We may refer to objective numbers ("N+ 1.7") and describe the topic in our own words. We must not republish the objective lists.
3. **No brain dumps, ever.** CompTIA treats its exam content as protected intellectual property [11] and revokes certifications from candidates who use dump material [2]. Every question we write is original. Questions are written from the concept, not from anyone's question bank.
4. **Trademarks:** always "CompTIA Network+", never "Network+" alone in branding; no CompTIA logos; a "not affiliated" disclaimer [12]. This is already in `PRODUCT.md`.
5. **GATE and 408 past papers:** write our own questions "in the style of" them, and link to the official papers instead of reproducing them.

This isn't legal advice. Before charging money, a short review by a lawyer is worth it, especially for the exam-mapping claims.

---

## 5. Layers 3 and 4: how to teach it, and coverage checks

**Misconception research → predict steps and wrong answers.** CS education research has studied where learners go wrong, and those mistakes are exactly what our "predict, then reveal" and mistake-replay steps should target:
- **OS:** a concept inventory for operating systems built from student misconceptions (Webb & Taylor, SIGCSE 2014) [13], and studies of how students misunderstand virtual memory (Pamplona et al., 2013 and 2024) [14].
- **Networking:** a review of methods for teaching computer networks (Prvan & Ožegović, ACM TOCE 2020) [15], plus studies of simulators like Packet Tracer for exposing misconceptions [16].

For each lesson, collect 3–5 misconceptions. Each one becomes either a predict question ("most people think the switch sends it everywhere: watch") or a wrong answer whose replay shows the consequence.

**Learner questions → hooks and callouts.** Search r/CompTIA, r/networking, r/developersIndia and Network Engineering Stack Exchange for the concept, and note the 5 most common confusions. Use them as lesson hooks. Never copy anyone's post.

**Coverage check against competitors (after drafting, not before).** For each module, compare our lesson list with:
- Professor Messer's free course index for the exam;
- Neso Academy's or Gate Smashers' playlist (GATE);
- GfG's topic list (placements);
- Wangdao's 408 chapter list (China).

Anything they cover that we don't goes into a "gaps" list, and we decide in or out on purpose. This checks whether we missed something; it doesn't make their structure ours.

---

## 6. The per-lesson pipeline

Each lesson moves through the same steps, stored as files next to each other (the folder layout is a suggestion for the build session):

```
content/networking/13-subnetting/
  concept.md       what it is, depth tag, which syllabuses need it (objective numbers)
  sources.md       2+ references with chapter/section, licence, and what each was used for
  misconceptions.md  3-5 misconceptions with where they came from
  model.md         what the figure simulates: its states, inputs, and rules (the "truth" the animation runs on)
  script.md        steps of about 60 words max, predict prompts, break-it moments
  questions.md     original questions, each tied to a concept and a depth tag
  review.md        reviewer, date, what changed; "last reviewed" comes from here
```

1. **Concept card** from the spine (section 2).
2. **Source pack:** read the primary reference and one cross-check. Note anything they disagree on.
3. **Misconceptions** (section 5).
4. **Model spec:** write the rules the figure must obey (for example, "the switch floods unknown destinations, learns the source MAC, ages entries out after 300 s"). This is the main defence against animations that look right but teach something wrong.
5. **Script:** hook → guided tour → predict → free play / break it → recap → 3–5 questions → interview card (the lesson shape in the constitution).
6. **Questions:** original, tied to the depth tag, with an explanation that cites the source.
7. **Review:** an accuracy pass by someone who knows the subject, plus a 3-learner test. Then the lesson ships with its sources and "last reviewed" date.

---

## 7. Worked example: the Networking module

> **Superseded (2026-11-09):** the full merge of Network+, GATE, 408, CS2023, AP CSP, GCSE and placement-interview questions is in `docs/content/networking-concept-list.md`. It has 59 lessons in two parts, 12 of them track-only, plus exam-depth add-ons and per-audience paths. The draft below is kept as the first pass.

I built this from the two syllabuses I read in full: CompTIA Network+ N10-009 [2] and GATE 2027 CS Section 10 [3]. Merging 408, CS2023 and AP CSP is the next step and may add or reshape a few lessons. ★ marks the four pilot lessons in spec 001. "Core" lessons serve several tracks; "Track" lessons are Network+-only.

**Unit A: How networks are put together**

| # | Lesson | Network+ | GATE CN | Type |
|---|---|---|---|---|
| 1 | Hosts, links and packets: packet vs circuit switching | 1.6 (partly) | Switching basics | Core |
| 2 ★ | The layer model: OSI and TCP/IP | 1.1 | Principles of layering | Core |
| 3 | Speed and delay: bandwidth, latency, throughput, jitter, loss | 5.4 | Performance metrics | Core |
| 4 | Cables, fibre and radio: media and connectors | 1.5 | — | Track |
| 5 | Topologies and architectures (star, mesh, spine-and-leaf, three-tier) | 1.6 | — | Track |

**Unit B: Local networks (layer 2)**

| # | Lesson | Network+ | GATE CN | Type |
|---|---|---|---|---|
| 6 | Frames, MAC addresses and error detection (CRC) | 5.2 (CRC errors) | Error detection | Core |
| 7 | Sharing the wire: medium access and Ethernet | 1.5 (802.3) | MAC, Ethernet | Core |
| 8 | How a switch learns (MAC table, flooding) | 1.2, 5.5 | Ethernet | Core |
| 9 | VLANs and 802.1Q tagging | 2.2 | — | Track |
| 10 | Loops and spanning tree | 2.2, 5.3 | — | Track |
| 11 | Wi-Fi: bands, channels, SSIDs, WPA2/3 | 2.3, 5.4 | — | Core (light) / Track (deep) |

**Unit C: Between networks (layer 3)**

| # | Lesson | Network+ | GATE CN | Type |
|---|---|---|---|---|
| 12 | IPv4 addresses: public, private, loopback, APIPA | 1.7 | IPv4 | Core |
| 13 ★ | Subnetting and CIDR | 1.7 | CIDR | Core |
| 14 | ARP: finding the MAC for an IP | 4.2, 5.5 | (implied) | Core |
| 15 | DHCP: getting an address | 3.4 | — | Core |
| 16 | Routers, routing tables and the default gateway | 2.1, 5.3 | — | Core |
| 17 | Routing algorithms: distance vector vs link state | 2.1 (OSPF, BGP) | DV and LS routing | Core |
| 18 | NAT and PAT | 2.1 | NAT | Core |
| 19 | Fragmentation, MTU and TTL | 1.2 (TTL), 2.2 (MTU) | Fragmentation | Core |
| 20 | IPv6 basics and SLAAC | 1.8, 3.4 | — | Core |

**Unit D: Transport (layer 4)**

| # | Lesson | Network+ | GATE CN | Type |
|---|---|---|---|---|
| 21 ★ | Ports, TCP and UDP | 1.4 | — | Core |
| 22 | The TCP handshake and reliable delivery | 1.4 | TCP | Core |
| 23 | Flow control and congestion control | — | TCP flow and congestion control | Core (GATE depth) |
| 24 | Sockets: how programs use the network | — | Socket API | Core (light) |

**Unit E: Services and operations**

| # | Lesson | Network+ | GATE CN | Type |
|---|---|---|---|---|
| 25 | DNS: names to addresses, record types | 3.4 | DNS | Core |
| 26 | HTTP and HTTPS | 1.4 | HTTP | Core |
| 27 | Remote access: SSH, VPNs, jump boxes | 3.5 | — | Track |
| 28 | Watching the network: SNMP, syslog, flow data, packet capture | 3.2 | — | Track |
| 29 | Cloud and modern networks: VPC, SDN, zero trust | 1.3, 1.8 | — | Track |
| 30 | Physical installs, documentation and disaster recovery | 2.4, 3.1, 3.3 | — | Track |

**Unit F: Security and troubleshooting**

| # | Lesson | Network+ | GATE CN | Type |
|---|---|---|---|---|
| 31 | Attacks on the network: ARP/DNS poisoning, rogue DHCP, evil twin | 4.2 | — | Core (shared with Security) |
| 32 | Defences: ACLs, port security, 802.1X, zones | 4.1, 4.3 | — | Core (shared with Security) |
| 33 ★ | The troubleshooting method | 5.1 | — | Core |
| 34 | Tools: ping, traceroute, nslookup/dig, netstat, ipconfig | 5.5 | — | Core |
| 35 | Capstone: what happens when you type a URL | Mixed | Mixed | Core |

What this tells us:
- **All 25 Network+ objectives are covered** by 35 lessons, at roughly 7 minutes each.
- **27 lessons are core** and serve both Network+ and GATE/placement learners (lesson 11 has a light core version). **8 are Network+-only track lessons.** GATE adds depth (flow and congestion control, routing algorithms, sockets) rather than new lessons.
- **The four pilot lessons sit at 2, 13, 21 and 33**, so the pilot already samples the spine well. Lesson 33 (troubleshooting) depends on most of the others, so in the full module it becomes a recurring "ticket" thread rather than a single lesson.

---

## 8. Proposed changes and next steps

**Proposed (not applied):**
1. **Constitution VI:** allow "track lessons" for topics only one syllabus needs, while keeping the rule that tracks never fork core lessons. Version bump: MINOR.
2. **Constitution II:** add "AI may draft, but every claim must trace to a cited source before review", and "only CC BY sources may be adapted; other books are for checking only".
3. **Spec 001:** add `sources.md`, `misconceptions.md` and `model.md` to each pilot lesson's deliverables, so the pilot also tests this pipeline.

**Next steps, in order:**
1. Finish the networking concept list: merge 408, CS2023 and AP CSP into section 7's table. About a day of reading.
2. Do the same for Security, with the SY0-801 objectives.
3. Then How a computer works, OS and Databases. Each takes the same process: about one day for the spine, then lessons one at a time through the pipeline.
4. Pick a subject reviewer for each module (a networking engineer or instructor for Networking). This matters more than any book choice.

---

## Sources

1. `docs/global-market-research.md` (this project, 2026-11-09)
2. CompTIA Network+ N10-009 Exam Objectives v4.0, © 2023 CompTIA (copy hosted by ONLC): https://www.onlc.com/comptia/n10-009-exam-objectives.pdf ; domain weights also at https://www.comptia.org/en-us/certifications/network/
3. GATE 2027 CS syllabus, IIT Madras: https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/CS_GATE2027_Syllabus.pdf
4. ACM/IEEE-CS/AAAI Computer Science Curricula 2023 (17 knowledge areas, 270 CS Core hours): https://csed.acm.org/ ; https://csed.acm.org/wp-content/uploads/2024/04/CS2023Presentation1.pdf
5. *Computer Networks: A Systems Approach*, CC BY 4.0: https://book.systemsapproach.org/README.html ; security book: https://security.systemsapproach.org/README.html
6. *Operating Systems: Three Easy Pieces*: https://pages.cs.wisc.edu/~remzi/OSTEP/
7. 408 exam structure (CN 25 of 150 marks): https://www.codefather.cn/post/1831923702136107009
8. *Database Design, 2nd ed.*, CC BY 4.0: https://opentextbc.ca/dbdesign01/
9. 17 U.S.C. § 102(b): https://www.law.cornell.edu/uscode/text/17/102
10. US Copyright Office Circular 31, "Ideas, Methods, or Systems": https://www.copyright.gov/circs/circ31.pdf
11. CompTIA, Unauthorized Training Materials: https://www.comptia.org/en-us/resources/test-policies/unauthorized-training-materials/
12. CompTIA, Using CompTIA Trademarks: https://www.comptia.org/en-us/legal/trademarks/
13. Webb & Taylor, "Developing a pre- and post-course concept inventory to gauge operating systems learning", SIGCSE 2014: https://dl.acm.org/doi/abs/10.1145/2538862.2538886
14. Pamplona et al., "Exploring misconceptions of operating systems in an online course" (2013): https://dl.acm.org/doi/abs/10.1145/2526968.2526977 ; virtual memory study, IEEE Access 2024: https://ieeexplore.ieee.org/abstract/document/10634102/
15. Prvan & Ožegović, "Methods in teaching computer networks: a literature review", ACM TOCE 2020: https://dl.acm.org/doi/abs/10.1145/3394963
16. Allison, "Simulation-based learning via Cisco Packet Tracer to enhance the teaching of computer networks" (2022): https://dl.acm.org/doi/abs/10.1145/3502718.3524739

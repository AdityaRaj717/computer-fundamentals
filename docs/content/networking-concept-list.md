# Networking: Merged Concept List and Lesson Plan

**Date:** 2026-11-09 | **Method:** `docs/content-sourcing.md` (layer 1, the spine) | **Status:** draft for review. Nothing in `app/` or the spec was changed.

This replaces the 35-lesson draft in `content-sourcing.md` section 7. That draft used two syllabuses; this one merges six, plus a check against common placement-interview questions.

---

## 1. What was merged

| Syllabus | Version | What I read | Source |
|---|---|---|---|
| CompTIA Network+ | N10-009 (live since 20 Jun 2024) | All 5 domains, 25 objectives and their sub-topics | [1] |
| GATE CS | 2027 (IIT Madras) | Section 10, Computer Networks | [2] |
| China 408 | 2024 outline (the 2025–2026 outlines changed only "TCP/IP model" → "TCP/IP reference model" [4]) | Part 4, Computer Networks: six chapters | [3][4] |
| ACM/IEEE CS2023 | Final report | Networking and Communication (NC): 8 knowledge units, CS Core vs KA Core | [5] |
| AP CSP | Current CED | Topics 4.1 (The Internet) and 4.2 (Fault Tolerance) | [6] |
| AQA GCSE CS | 8525, first exams 2027 | Section 3.5 items listed in AQA's summary of changes | [7] |
| Placement interviews | GfG "OS, DBMS, CN interview questions" | The 20 networking questions (Q41–Q60) | [8] |

**Exam versions (checked 2026-11-09).** Every mapping is to the current version, never a retired one:

| Exam | Mapped to | Status | Next change to watch |
|---|---|---|---|
| CompTIA Network+ | N10-009 (V9) | Live since 20 Jun 2024. CompTIA estimates retirement in 2027 [1b]; Professor Messer estimates about Dec 2027 [1c] | V10 objectives not published yet. Remap when they appear |
| CompTIA Security+ (next module) | SY0-801 (V8) | Launched 17 Nov 2026. SY0-701 retires 11 Jun 2027 | Build on 801 only |
| GATE CS | GATE 2027 syllabus (Feb 2027 exam) [2] | Current | GATE 2028 syllabus (usually published mid-year) |
| China 408 | 2024 outline | The 2027 outline has no additions or removals, only the "TCP/IP reference model" wording [4b] | Check each September |
| AQA GCSE | 8525 updated spec, first exams 2027 [7] | Current | — |
| CS2023, AP CSP | Latest editions | Current | — |

**Core lessons are version-neutral.** How TCP or subnetting works doesn't change between exam versions. What changes is the objective mapping, track callouts and question banks, which live in each lesson's `concept.md` and `questions.md`. A new exam version means a remap, not a rewrite.

**How to read depth:**
- **R** = recognise, **E** = explain/predict, **A** = apply (calculate, configure, troubleshoot).
- **Network+** depth comes from each objective's verb ("summarise" = R, "explain/compare" = E, "given a scenario" = A) [1].
- **GATE and 408** topics that are tested with numerical problems are marked A.
- **CS2023**: **C** = CS Core (every CS graduate), **K** = KA Core (a networking course).
- **AP CSP and GCSE** are R/E only.

---

## 2. What merging changed

1. **The module is bigger than the first draft: 59 lessons, not 35.** Most of the growth comes from 408 and CS2023. They add the physical layer, error-correcting codes, sliding-window link protocols, medium-access methods, routing protocols in depth, multicast, mobile IP, email and FTP internals.
2. **It splits cleanly in two.**
   - **Part 1, "How networks work"** (48 lessons) serves every audience.
   - **Part 2, "Running networks"** (11 lessons) is almost purely Network+ (operations, physical installs, documentation, DR, detailed troubleshooting). It later doubles as a base for a CCNA track.
3. **Some "Network+-only" lessons from the first draft are really core.**
   - VLANs and spanning tree appear in 408 and CS2023.
   - Wi-Fi appears in all three.
   - Topologies is a top-20 interview question [8].

   Track-only lessons are now 12 of 59 (20%), against 8 of 35 (23%) in the first draft.
4. **GATE and 408 need calculation depth, not different lessons.** The same lesson gets an "exam-depth" add-on with numericals (section 5). That keeps the constitution's rule that tracks never fork core lessons.
5. **UK GCSE has shrunk its networking content.** From 2027, AQA removed LAN topologies, Ethernet, Wi-Fi, UDP and FTP from 8525 [7]. School learners need only about 12 lessons.
6. **Placement interviews concentrate on about 18 lessons** (section 6). The capstone "what happens when you enter google.com" is one of the 20 questions [8].

---

## 3. Part 1: How networks work (48 lessons)

★ = pilot lesson in spec 001. Type: **Core** (several audiences), **Core-light** (short; needed by few audiences in depth), **Track** (one audience).

### Unit A: The big picture

| # | Lesson | N+ | GATE | 408 | CS2023 | AP CSP | GCSE | Interview | Type |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Networks, the Internet and the Web (LAN/WAN, ISPs, autonomous systems; Internet ≠ Web) | 1.6 E | — | 1(一) E | Fund. C | 4.1 | (network types: not re-read) | Q41 | Core |
| 2 | Packets vs circuits (packet, circuit and message switching; datagram vs virtual circuit) | — | Switching A | 2(一)4–5 E | Fund. C | 4.1 | — | — | Core |
| 3 ★ | Layers: OSI, TCP/IP and encapsulation | 1.1 E | Layering E | 1(二) E | Fund. C | 4.1 | 4-layer model E | Q43–45 | Core |
| 4 | Speed and delay: bandwidth, throughput, the four delays, RTT, jitter, loss | 5.4 A | Perf. metrics A | 1(一)3 A | Fund. C (queueing) | 4.1 | — | Q54 | Core |
| 5 | Redundancy and fault tolerance | 3.3 E | — | — | — | 4.2 | — | — | Core-light |

### Unit B: Signals and media

| # | Lesson | N+ | GATE | 408 | CS2023 | AP CSP | GCSE | Interview | Type |
|---|---|---|---|---|---|---|---|---|---|
| 6 | Bits as signals: baud vs bit rate, encoding, modulation (add-on: Nyquist and Shannon) | — | — | 2(一)1–3 A | SingleHop K | — | — | — | Core-light |
| 7 | Cables, fibre and radio (media, connectors, transceivers) | 1.5 E | — | 2(二) R | SingleHop K | — | — | — | Core |

### Unit C: Local networks (layer 2)

| # | Lesson | N+ | GATE | 408 | CS2023 | AP CSP | GCSE | Interview | Type |
|---|---|---|---|---|---|---|---|---|---|
| 8 | Frames and MAC addresses | — | Data link E | 3(一)(二) E | SingleHop K | — | — | Q47 | Core |
| 9 | Catching errors: parity, checksum, CRC, Hamming | 5.2 R | Error detection A | 3(三) A | Reliability K | — | — | — | Core |
| 10 | Reliable links: stop-and-wait, sliding window, Go-Back-N, Selective Repeat | — | — | 3(四) A | Reliability K | — | — | — | Core (408 depth) |
| 11 | Sharing the medium: FDM/TDM/WDM/CDM, ALOHA, CSMA/CD, CSMA/CA, token passing | 2.2 R (duplex) | MAC A | 3(五) A | SingleHop K | — | — | — | Core |
| 12 | Ethernet (802.3) | 1.5, 2.2 E | Ethernet E | 3(六)2 E | SingleHop K | — | — | — | Core |
| 13 | Hubs, repeaters and how a switch learns | 1.2, 5.5 E | — | 2(三), 3(八) E | Fund. C, SingleHop K | — | — | Q48 | Core |
| 14 | VLANs and 802.1Q tagging | 2.2 A | — | 3(六)4 E | SingleHop K | — | — | — | Core |
| 15 | Loops and spanning tree | 2.2, 5.3 A | — | — | SingleHop K | — | — | — | Core-light |
| 16 | Wi-Fi (802.11) (Network+ add-on: channels, bands, WPA2/3, antennas) | 2.3 A | — | 3(六)3 E | SingleHop K, Mobility K | — | — | — | Core |
| 17 | WAN links and PPP | — | — | 3(七) E | — | — | — | — | Track (408) |

### Unit D: Between networks (layer 3)

| # | Lesson | N+ | GATE | 408 | CS2023 | AP CSP | GCSE | Interview | Type |
|---|---|---|---|---|---|---|---|---|---|
| 18 | Routers, forwarding and the default gateway | 2.1, 5.3 E | — | 4(一)2, 4(八) E | Routing K | 4.1 | IP at internet layer E | Q46 | Core |
| 19 | The IPv4 packet: header, TTL, fragmentation, MTU | 1.2, 2.2 E | Fragmentation A | 4(三)1 A | — | — | — | — | Core |
| 20 | IPv4 addresses: classes, public/private, loopback, APIPA | 1.7 A | IPv4 E | 4(三)2 E | — | 4.1 | — | Q59 | Core |
| 21 ★ | Subnetting, CIDR and route aggregation | 1.7 A | CIDR A | 4(三)3 A | Routing K | — | — | Q50 | Core |
| 22 | ARP: finding the MAC for an IP | 4.2, 5.5 E | — | 4(三)4 E | — | — | — | — | Core |
| 23 | DHCP: getting an address | 3.4 A | — | 4(三)4 E | — | — | — | — | Core |
| 24 | ICMP, ping and traceroute | 1.4, 5.5 A | — | 4(三)4 E | — | — | — | Q56 | Core |
| 25 | NAT and PAT | 2.1 E | NAT A | 4(三)2 E | Routing K | — | — | — | Core |
| 26 | Routing algorithms: distance vector vs link state | — | DV, LS A | 4(二) A | Routing K | — | — | — | Core |
| 27 | Routing the Internet: autonomous systems, static vs dynamic, RIP, OSPF, BGP | 2.1 E | — | 4(五) E | Routing K | — | — | — | Core |
| 28 | IPv6 | 1.8, 3.4 E | — | 4(四) E | Routing K | 4.1 | — | Q49 | Core |
| 29 | Unicast, broadcast, multicast, anycast | 1.4 E | — | 4(六) E | — | — | — | — | Core-light |
| 30 | Mobile networks: cellular and mobile IP | 1.5 R | — | 4(七) E | Mobility K | — | — | — | Core-light |

### Unit E: Transport (layer 4)

| # | Lesson | N+ | GATE | 408 | CS2023 | AP CSP | GCSE | Interview | Type |
|---|---|---|---|---|---|---|---|---|---|
| 31 ★ | Ports, TCP and UDP | 1.4 E | — | 5(一) E | Applications C | 4.1 | TCP at transport layer E | Q53 | Core |
| 32 | UDP and checksums | — | — | 5(二) E | Reliability K | — | — | — | Core-light |
| 33 | TCP connections: the handshake and teardown | 1.4 E | TCP A | 5(三)2 A | Reliability K | — | — | Q51 | Core |
| 34 | TCP reliable delivery: sequence numbers, ACKs, retransmission | — | TCP A | 5(三)3 A | Reliability K | 4.1 | — | — | Core |
| 35 | TCP flow control | — | Flow control A | 5(三)4 A | Reliability K | — | — | — | Core |
| 36 | TCP congestion control (slow start, AIMD; Reno/Cubic named) | — | Congestion control A | 5(三)5, 4(一)4 A | Reliability K | — | — | — | Core |
| 37 | Sockets: how programs use the network | — | Socket API E | — | Applications C | — | — | — | Core-light |

### Unit F: Applications

| # | Lesson | N+ | GATE | 408 | CS2023 | AP CSP | GCSE | Interview | Type |
|---|---|---|---|---|---|---|---|---|---|
| 38 | Client-server, peer-to-peer, cloud and edge | — | — | 6(一) E | Applications C | — | — | — | Core |
| 39 | DNS: names to addresses | 3.4 A | DNS E | 6(二) E | Applications C | — | — | Q60 | Core |
| 40 | HTTP, HTTPS and the Web | 1.4 E | HTTP E | 6(五) E | Applications C | 4.1 | HTTP, HTTPS E | Q52 | Core |
| 41 | Email: SMTP, POP3, IMAP, MIME | 1.4 E | — | 6(四) E | — | — | SMTP, IMAP E | Q57 | Core |
| 42 | File transfer: FTP, SFTP, TFTP | 1.4 E | — | 6(三) E | — | — | — | — | Core-light |
| 43 | Capstone: what happens when you type a URL | Mixed | Mixed | Mixed | Mixed | 4.1 | Mixed | Q58 | Core |

### Unit G: Securing the network (shared with the Security module)

| # | Lesson | N+ | GATE | 408 | CS2023 | AP CSP | GCSE | Interview | Type |
|---|---|---|---|---|---|---|---|---|---|
| 44 | Attacks on the network: DoS, spoofing, ARP/DNS poisoning, on-path, rogue DHCP, evil twin | 4.2 R | — | — | Security K | — | (security methods: not re-read) | — | Core |
| 45 | Defences: firewalls, ACLs, screened subnet, NAC/802.1X, IDS/IPS, honeypots | 4.1, 4.3 A | — | — | Security K | — | — | — | Core |
| 46 | Remote access and VPNs | 3.5 E | — | — | Security K | — | — | Q55 | Core |

### Unit H: Troubleshooting basics

| # | Lesson | N+ | GATE | 408 | CS2023 | AP CSP | GCSE | Interview | Type |
|---|---|---|---|---|---|---|---|---|---|
| 47 ★ | The troubleshooting method | 5.1 E/A | — | — | — | — | — | — | Core |
| 48 | Troubleshooting tools: ping, traceroute, nslookup/dig, netstat, ipconfig/ip, arp, tcpdump, nmap | 5.5 A | — | — | — | — | — | Q56 | Core |

## 4. Part 2: Running networks (11 lessons, Network+ track)

| # | Lesson | N+ | Other | Type |
|---|---|---|---|---|
| 49 | Topologies and architectures: star, mesh, spine-and-leaf, three-tier, traffic flows | 1.6 E | CS2023 SingleHop K (LAN topologies); interview Q42 | Track, also on the interview path |
| 50 | Appliances and middleboxes: load balancers, proxies, CDNs, NAS/SAN, QoS | 1.2 E | CS2023 Emerging K (middleboxes) | Track |
| 51 | Cloud and modern networks: VPC, NFV, SDN/SD-WAN, VXLAN, IaC, zero trust, SASE | 1.3 R, 1.8 R | 408 4(一)3 SDN; CS2023 Emerging K | Track (SDN part core-light) |
| 52 | Network services: NTP/PTP, LDAP, SNMP, syslog | 1.4, 3.4 E | — | Track |
| 53 | Watching the network: SNMP, flow data, packet capture, SIEM | 3.2 A | — | Track |
| 54 | Physical installations: racks, IDF/MDF, power, environment | 2.4 E | — | Track |
| 55 | Documentation, life cycle and change management | 3.1 E | — | Track |
| 56 | Disaster recovery and high availability | 3.3 E | AP CSP 4.2 (links to lesson 5) | Track |
| 57 | Cable and interface problems | 5.2 A | — | Track |
| 58 | Service problems: VLANs, STP, routes, gateways, duplicate IPs, DHCP exhaustion | 5.3 A | — | Track |
| 59 | Performance and wireless problems | 5.4 A | — | Track |

**Totals:**
- 59 lessons: 39 Core, 8 Core-light, 12 Track (lesson 17 for 408, lessons 49–59 for Network+).
- At about 7 minutes each, Part 1 is about 5.6 hours and Part 2 about 1.3 hours.

---

## 5. Exam-depth add-ons (calculation drills)

These attach to an existing lesson and appear only on the tracks that need them. Each is a figure in "numbers" mode plus timed drills.

| Lesson | Add-on | Needed by |
|---|---|---|
| 4 | Transmission, propagation and queueing delay; throughput; bandwidth-delay product | GATE, 408 |
| 6 | Nyquist and Shannon capacity | 408 |
| 9 | CRC by polynomial division; Hamming code | GATE, 408 |
| 10 | Sliding-window efficiency; window-size limits for GBN/SR | 408 |
| 11 | CSMA/CD minimum frame size; ALOHA throughput | GATE, 408 |
| 19 | Fragment offsets and counts | GATE, 408 |
| 21 | Subnet sprint; route aggregation | Network+, GATE, 408 |
| 26 | Distance-vector table updates; Dijkstra on a link-state graph | GATE, 408 |
| 33–34 | Sequence and acknowledgement number tracing | GATE, 408 |
| 36 | Congestion-window trace (slow start, threshold, timeouts) | GATE, 408 |
| 31 | Port Match drill | Network+ (ports listed in objective 1.4 [1]) |

---

## 6. Paths through the module (one library, many tracks)

| Path | Lessons | Count |
|---|---|---|
| **Network+** | All except 6, 10, 17, 26, 32, 35, 36, 37, 38 | 50 |
| **GATE CS** | 1–4, 8, 9, 11–13, 18–22, 25, 26, 31, 33–37, 39, 40, 43, plus add-ons | 25 |
| **408** | 1–4, 6–36, 38–43, plus add-ons | 41 |
| **Placement interviews** | 1, 3, 4, 8, 13, 18, 20, 21, 24, 28, 31, 33, 39, 40, 41, 43, 46, 49 | 18 |
| **University course (CS2023 CS Core only)** | 1, 2, 3, 4, 13, 31, 37, 38, 39, 40 | 10 |
| **School (AP CSP, GCSE 2027)** | 1, 2, 3, 4, 5, 18, 20, 28, 31, 34, 40, 41 | 12 |
| **Curious adults** | 1, 3, 4, 18, 21, 31, 39, 40, 43 | 9 |

The pilot's four lessons (3, 21, 31, 47) are on the Network+ path. Three of them (3, 21, 31) are also on the GATE, 408 and interview paths, which supports keeping them as the pilot.

---

## 7. Coverage check: what is deliberately left out

| Item | From | Decision |
|---|---|---|
| Quantum networking; satellite, mmWave, visible light | CS2023 Emerging K [5] | Out. A one-line mention in lesson 7 at most |
| "Implement a client-server socket app", "design and implement a reliable protocol" | CS2023 learning outcomes [5] | We're no-code, so lessons 37 and 10 explain and simulate. An optional "try the code" box later |
| TCP Vegas, Cubic details | CS2023 Reliability K [5] | Named in lesson 36, not taught |
| Acronym list (about 190 terms) | Network+ [1] | A glossary drill, not lessons |
| Proposed hardware/software lab list | Network+ [1] | Not content. Useful for figure ideas |
| GCSE 3.5 network types, wired vs wireless, security methods | AQA 8525 | **Not yet read**: the changes summary only lists changed items [7]. Read the full spec before building the school path |
| AP CSP official CED wording | College Board | Read through a teacher's site that cites CED codes CSN-1.A–E [6]. Check against the official CED before building the school path |

Every Network+ objective (all 25), every GATE CN topic, every 408 CN chapter and every CS2023 NC knowledge unit maps to at least one lesson above, apart from the exclusions in this table.

---

## 8. Next steps for Networking

1. **Misconceptions per lesson** (layer 3): start with the four pilot lessons. AP CSP materials already name common traps, such as "Internet = Web" and "bandwidth = latency" [6]. The networking-education review is the next source [9].
2. **Get the official 408 PDF** from yz.chsi.com.cn and confirm the 2026 outline line by line. I used a 2024 copy plus a report that the 2025–2026 outlines changed one phrase [3][4].
3. **Pick a reviewer** for the module, ideally a working network engineer or instructor.
4. **Order of building:** the pilot (3, 21, 31, 47) first. Then the rest of Unit A and Unit E (high reuse), then Units C and D.
5. **After Networking: Security**, using the SY0-801 objectives (they need to be downloaded from CompTIA).

---

## Sources

1. CompTIA Network+ N10-009 Exam Objectives v4.0 (copy hosted by ONLC): https://www.onlc.com/comptia/n10-009-exam-objectives.pdf
1b. CompTIA Network+ page (V9, launch date, estimated retirement 2027): https://www.comptia.org/en-us/certifications/network/
1c. Professor Messer, N10-008 vs N10-009 (estimated N10-009 retirement about December 2027): https://www.professormesser.com/after-class/differences-between-n10-008-and-n10-009/
2. GATE 2027 CS syllabus: https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/CS_GATE2027_Syllabus.pdf
3. 408 outline, Computer Networks (2024 copy): https://www.educity.cn/kyyy/5105642.html
4. "计算机考研408的'不变'与'剧变'", CSDN, 2 Jul 2026 (outline unchanged except the TCP/IP wording; 200+ schools use 408): https://blog.csdn.net/qiwsir/article/details/162522066
4b. 2027 408 outline unchanged except the TCP/IP wording (Baidu Kuku summaries, Nov 2026): https://kuku.baidu.com/landing/tscp_doc/752ae59bd3d630240bad672c6a94e33d
5. CS2023 Networking and Communication knowledge area (copy of the final report section): https://srg-ics-uplb.github.io/cmsc137/acm2023-nc.pdf ; official site https://csed.acm.org/
6. AP CSP Topic 4.1 (teacher-made, cites CED codes CSN-1.A–E): https://www.apcsexamprep.com/pages/ap-csp-course-bi4-the-internet
7. AQA GCSE Computer Science 8525, Summary of changes (first exams 2027): https://www.aqa.org.uk/files/e5e3609b-98ee-4a88-b4ff-da9dc40904cd/faf3ab172b76f13781ac8dbe12783c16915663e0.pdf
8. GeeksforGeeks, "50+ OS, DBMS, CN Interview Questions": https://www.geeksforgeeks.org/interview-prep/os-cn-dbms-interview-questions/
9. Prvan & Ožegović, "Methods in teaching computer networks: a literature review", ACM TOCE 2020: https://dl.acm.org/doi/abs/10.1145/3394963

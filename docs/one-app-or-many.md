# One App or One App per Subject?

**Date:** 2026-11-09 | **Decision proposed:** one app (and one website), with subjects as courses inside it. Use per-subject and per-exam *store pages and web pages* as separate front doors.

## Evidence

### What happened to apps that split by subject (Google Play US, read 2026-11-09 [1])

| Family | App | Installs |
|---|---|---|
| Programiz (split by language) | Learn Python | 1M+ |
| | Learn C | 500K+ |
| | Learn C++ / Learn Java | 100K+ each |
| Softecks (split by CS subject) | Computer Fundamentals | 100K+ |
| | Operating Systems / DBMS / Discrete Mathematics | 10K+ each |
| Nakshatra (split by CS subject, visual) | OS Visualizer / DBMS Master / TOC Visual | 10+ / 500+ / 100+ |
| Pocket Prep (split by profession, not subject) | IT & Cyber / Professional / Behavioral Health | 100K+ / 100K+ / 50K+ |
| Testbook (main app + exam spin-offs) | Testbook main / PSTET / BSSC spin-offs | 50M+ / 10K+ / 10K+ |

### Single apps with many subjects or courses [1]

| App | Installs |
|---|---|
| Sololearn | 10M+ |
| Mimo | 10M+ |
| Programming Hub | 10M+ |
| Khan Academy | 10M+ |

The pattern: in a split family, one "front" app gets most installs and the others get a small share. Testbook's exam spin-offs sit at 10K+ next to a 50M+ main app. Every big learning app keeps subjects in one app. The exception is Khan Academy Kids, a separate app for a different *audience* (young children), not a different subject.

### Duolingo went the other way, from split to one app

Duolingo Math started as a separate app. In October 2023 Duolingo moved Math and Music into the main app "so that you can learn more subjects in one place", with one streak, shared XP and leaderboards, and shared quests across subjects. Their stated goal is "one app to learn anything" [2].

### Store rules

- **Apple 4.3(a):** "Don't create multiple Bundle IDs of the same app", for example a separate map app for every city [3]. Five apps sharing one lesson engine and differing only in content are exactly what this rule rejects.
- **Google Play's spam policy** doesn't allow apps that are "repetitive", that merely provide the same experience as other apps [4]. Developers report removals for having multiple highly similar apps [4].

### The way to get per-subject marketing without separate apps

- **Google Play custom store listings:** up to 50 tailored listings, each reached through a Google Ads campaign or its own unique URL [5].
- **Apple custom product pages:** alternative listings shared through unique URLs and used in Apple Ads campaigns [6].
- Our web app can have its own landing page per subject and per exam, which also helps search.

## Why one app fits this product specifically

1. **The subjects are connected.** The networking lessons point to OS and security topics (ports → processes, attacks → the Security module). China's 408 exam now asks combined questions across subjects, for example OS process management with networking's sliding windows [7]. Split apps would break those links.
2. **One library, many tracks** (constitution VI) is a single-app idea. A GATE path crosses CN, OS, DBMS and COA. A placement path crosses all of them too.
3. **One subscription.** A learner who buys for networking gets OS later without a new purchase, and the value of Pro grows with every module.
4. **Shared progress and habit:** one streak and one review queue across subjects, as Duolingo did [2].
5. **Ratings and reviews add up** in one listing instead of starting from zero five times.
6. **Building cost:** one codebase, one release, one set of store reviews. This matters for a solo founder.

## When a second app would make sense

Only for a genuinely different audience or experience, the way Khan Academy Kids differs from Khan Academy. For example, a school or teacher app with classroom dashboards, or a China app if we ever partner there (different payments, licensing and stores). Not for OS vs DBMS vs architecture.

## What this means for the build

- One app, with subjects as courses (Networking first). The home screen opens on the learner's track.
- One web domain with pages per subject (`/networking`, `/operating-systems`) and per exam (`/network-plus`, `/gate-cs`). Every figure is also its own shareable URL.
- Custom store listings and custom product pages per exam audience once there's more than one track.

## Sources

1. Google Play US listings, read 2026-11-09 via the built-in browser (com.programiz.learnpython/.learnc/.learncpp/.learnjava, in.softecks.computerfundamentals/.operatingsystems/.dbms/.discretemathematics, com.nakshatra.os_vision/.dbms_master/.automind_toc, com.pocketprep.android.itcybersecurity/.professional/.behavioralhealth, com.testbook.tbapp/.pstet/.bsscinterlevel, com.sololearn, com.getmimo, com.freeit.java, org.khanacademy.android, org.khankids.android)
2. Duolingo, "The Duolingo App Now Has Math, Music, and Language", 11 Oct 2023: https://blog.duolingo.com/new-subjects/
3. Apple App Review Guidelines 4.3: https://developer.apple.com/app-store/review/guidelines/
4. Google Play Console Help, Spam policy: https://support.google.com/googleplay/android-developer/answer/9899034 ; developer reports: https://community.kodular.io/t/how-to-avoid-violating-googles-repetitive-content-policy/145435
5. Google Play custom store listings: https://support.google.com/googleplay/android-developer/answer/9867158 ; https://google.play/business/customstorelistings/
6. Apple Custom Product Pages: https://developer.apple.com/app-store/custom-product-pages/
7. CSDN, "计算机考研408的'不变'与'剧变'", 2 Jul 2026: https://blog.csdn.net/qiwsir/article/details/162522066

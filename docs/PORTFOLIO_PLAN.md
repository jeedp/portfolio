# Portfolio plan: content, structure and visual system

For **Jed B. Padro**, 4th-year BS Computer Engineering student, Southern Leyte State University.
Goal: the most *effective* portfolio, not the longest. Every section must help a recruiter decide to contact you.

---

## 1. Recommended sections (and why)

| # | Section | Purpose | Essential? |
|---|---|---|---|
| 1 | Navigation | Get anywhere in one click; résumé always one click away | Essential |
| 2 | Hero | Who you are, what you do, what you want, in under 10 seconds | Essential |
| 3 | About | The person behind the projects: background, interests, how you work | Essential |
| 4 | Technical skills | Scannable stack, grouped, no ratings | Essential |
| 5 | Selected works | The proof. The most important section on the page | Essential |
| 6 | Education & experience | Context and credibility: degree, summer internship, thesis, training | Essential |
| 7 | Certifications | Supporting evidence, visually secondary | Essential (short) |
| 8 | Résumé | One-page version for applications | Essential |
| 9 | Contact | One obvious way to reach you | Essential |
| 10 | Footer | Name, year, links, back to top | Essential (minimal) |

### Additional sections, evaluated

| Section | Verdict | Reason |
|---|---|---|
| Currently learning | **Include, as one line** inside Skills | Shows direction (AI/ML) without claiming skill you don't have yet |
| Technical interests | **Fold into About** | A separate section would repeat About |
| Achievements | **Merge into Certifications** until you have awards | An empty "Achievements" heading looks worse than none |
| Publications / research | **Skip for now**; add the thesis paper when published | Nothing published yet |
| GitHub activity | **Optional, small** (recent repos list) | Proves you code regularly; keep it under the projects |
| Blog / articles | **Skip until you have 2–3 posts** | An empty blog hurts credibility. Don't write about the internship's internal system: it's covered by a non-disclosure agreement |
| Testimonials | **Skip** unless your internship supervisor or thesis adviser gives a real quote | Never invent them |
| Volunteering | **Skip** unless it is technical (e.g. teaching, org tech lead) | Not relevant otherwise |
| Personal philosophy | **One sentence inside About** | A whole section reads as filler |

## 2. Section order

Hero → About → Skills → Selected works → Education & experience → Certifications → Résumé → Contact → Footer.

(Recruiters often prefer projects before skills. Your brief puts Skills first; that works because the skills section is short and the hero's "View projects" button jumps straight to the work.)

## 3. What each section should contain

**Hero**
- Label: *Computer Engineering Student*
- Headline: *Building ideas into practical technology.*
- One or two sentences: what you build (desktop, IoT, web), and that you are looking for a software engineering internship.
- Buttons: **View projects** (primary), **Download résumé** (secondary). Small GitHub and LinkedIn links.
- Professional portrait.

**About**
- Two short paragraphs: background and what draws you to systems where software meets hardware; how you learn and work.
- Quick facts row: Education · University · Location · Current focus.

**Technical skills**
- Grouped: Programming, Web development, Databases, Embedded systems, Development tools.
- Real logos, names always visible, no bars or percentages (they invite doubt and say nothing).
- One "Currently learning" line: artificial intelligence and machine learning.

**Selected works** (case-study style, three projects)
For each project: number and title · one-line overview · status · the problem · what it does (3 features) · **your contribution** · technologies · one concrete result or challenge solved · visual · repository link.
- Show on the page as **featured case studies with varied layouts**, with an expandable "Project details" panel for problem, objective, contributions and challenges.
- Individual project pages are worth it only once each project has screenshots, a demo video and a longer write-up. Until then, on-page case studies are stronger than thin separate pages.

**Education & experience** (one timeline)
- BS Computer Engineering, SLSU (present).
- Web Developer Intern, Project LODI (DOST Central Office, IT Division), Jul – Sep 2026: bug fixes in an internal web application. Keep details general (NDA): no system names, stack, numbers or bug details.
- Thesis: SLSU Campus Wayfinding System (in development).
- With limited formal employment, the summer internship, thesis and real projects *are* the experience. Present them with the same care as jobs: role, organisation, dates, what you did.

**Certifications**
- Show only completed, verifiable credentials: the five Cisco Networking Academy courses, with thumbnails and links to the originals.
- Add seminars, workshops and awards only when they are real and relevant.

**Résumé**
- "Want the full picture?" with Download PDF and View résumé buttons.
- The PDF is generated from the same data as the site, so the two never disagree.

**Contact**
- "Have a project or opportunity in mind?"
- Email as a large link with a copy button, plus LinkedIn and GitHub.
- No contact form: email is simpler, always works, and nothing pretends to send. (A form is optional later via Formspree.)

## 4. Recruiter perspective

| Reader | Looks for first | What convinces them |
|---|---|---|
| Technical recruiter | Name, role, availability, location, résumé | Clear title, "open to internships", one-click résumé |
| Hiring manager | 1–2 strong projects and *your* part in them | Real constraints solved: 14 MB → 1.5–3 MB on a Pi; dual-core FreeRTOS; production Laravel bug fixes |
| Internship coordinator | Degree, year, school, internship, contact | Education & experience timeline, certificates |
| Collaborator | What you build, stack, repos | Skills, repository links, GitHub activity |

**Immediately visible:** name, role, availability, what you build, the two main buttons.
**Credible:** real repos, specific numbers, honest status ("in development"), your contribution named on team projects.
**Impressive projects:** a real problem, constraints, a measurable result, and a decision you can explain.
**Unnecessary:** skill percentages, long biographies, hobby lists, quotes, every tutorial project.
**Unprofessional:** fake screenshots, invented metrics or testimonials, broken links, "coming soon" sections, a contact form that silently fails, inconsistent facts between site and résumé.

## 5. UX and navigation

- **Nav:** JP · Home · About · Skills · Projects · Experience · Contact · [Résumé]. Sticky, gains a background after scrolling, active section indicator, full-screen menu on mobile.
- **Primary CTAs:** View projects, Download résumé, Email me. The résumé button lives in the nav, so it is never more than one click away.
- **Motion:** one entrance on load, gentle fade-in as sections appear, hover states on links, buttons and project images. Everything stops under reduced motion. No parallax, cursor effects or moving backgrounds.
- **Mobile:** single column, text before images, 44px tap targets, no sideways scroll.
- **10-second test:** the hero alone must answer *who*, *what* and *how to contact*.

## 6. Writing guidelines

Plain, specific, first person. A number beats an adjective. Name your role on team projects. Say "in development" where it is true. Never invent experience, metrics, awards, quotes or certifications.

## 7. Essential vs optional

**Essential:** everything in section 1, a working résumé PDF, real repository links, responsive layout, accessibility basics (contrast, focus, alt text).
**Optional:** dark/light toggle, GitHub activity list, copy-email button, contact form, project detail pages.

## 8. Common mistakes to avoid

Skill bars · generic taglines ("passionate developer") · listing every tutorial · fake or mock screenshots presented as real · broken or private repo links without saying so · walls of text · heavy animation · facts that differ between the site and the résumé · an outdated "last updated".

## 9. How to stand out among CompE and software students

1. **Lean into hardware + software.** Few web portfolios can show firmware, a Raspberry Pi server and the UI on top. That is your differentiator.
2. **Show engineering decisions, not just features.** "Separate FreeRTOS tasks on separate cores so a slow network never holds the gate" says more than "IoT gate".
3. **Use real evidence:** screenshots, hardware photos, a 30-second demo video, the bug write-up.
4. **Keep it current:** thesis status, "Updated" date, recent repos.

## 10. Sitemap

```
/ (single page)
├── #home          Hero
├── #about         About + quick facts
├── #skills        Skills + currently learning
├── #projects      Selected works (3 case studies) + recent GitHub repos
├── #experience    Education & experience timeline
├── #certifications Certificates (with originals)
├── #resume        Résumé CTA
└── #contact       Contact
/resume.pdf        Résumé (generated from site data)
/certificates/*.pdf  Original certificates
/404.html          Custom not-found page
```

## 11. Content checklist

- [x] Name, title, availability, location
- [x] Portrait
- [x] About: two paragraphs, quick facts
- [x] Skills grouped, with logos, no ratings; currently learning
- [x] Three projects: overview, problem, features, contribution, stack, result, status, repo
- [ ] **Real screenshots**: TrainSMART app windows; parking gate hardware photo and dashboard; wayfinding kiosk screens
- [ ] Optional: a 30–60 second demo video per project
- [x] Timeline: degree, summer internship, thesis
- [ ] Degree start year and expected graduation (add when you want them shown)
- [x] Certificates with originals
- [x] Résumé PDF consistent with the site
- [x] Email, LinkedIn, GitHub

---

## 12. Visual system (established before implementation)

**Direction:** premium minimalist, editorial. Typography and whitespace carry the design; one accent; no dashboard tiles, no cursor effects.

**Colour**
| Token | Dark (default) | Light |
|---|---|---|
| Background | `#0c0d0f` deep charcoal | `#fafaf9` warm off-white |
| Surface | `#131417` | `#ffffff` |
| Line | white at 8% | black at 8% |
| Text | `#f5f5f4` | `#0c0d0f` |
| Secondary text | `#a1a1aa` | `#52525b` |
| Muted | `#71717a` | `#71717a` |
| Accent | `#3b82f6` electric blue | `#2563eb` |

**Type:** Geist (UI and text), Geist Mono (small labels and numbers). Hero 56–84px, section titles 40–60px, project titles 32–44px, body 17–18px at 1.65 line height, labels 12px mono. Tight tracking on large type only; uppercase only for 12px labels.

**Layout:** 1200px max content, 12-column grid. Each section header: a narrow left column with the section number and label, the title on the right. Section spacing 128px desktop / 88px mobile.

**Components:** Button (primary filled blue, secondary outline), TechBadge (logo + name), SectionHeader (number, label, title), ProjectFeature (three layout variants: image right, image left, wide image), Timeline, Credential, QuickFacts.

**Projects, varied:** 01 TrainSMART with the visual on the right; 02 Smart Parking Gate with the visual on the left; 03 Campus Wayfinding with a wide campus map and the problem, objective and status in three columns. Visuals are real material (the OpenStreetMap campus map) or clearly labelled system diagrams, never mock screenshots.

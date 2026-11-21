// Builds the résumé PDF from src/data/profile.ts, so the PDF always matches the website.
//
//   npm run resume            -> public/resume.pdf  (public: no phone number; served by the website)
//   npm run resume:private    -> private/Jed-Padro-Resume.pdf  (adds the phone number from resume.private.json)
//
// Options: --private (include the phone from resume.private.json), --out <file>.
// Needs Chrome or Edge; set CHROME_PATH if it is not found.
import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const args = process.argv.slice(2)
const isPrivate = args.includes('--private')
const outArg = args.includes('--out') ? args[args.indexOf('--out') + 1] : null
const out = resolve(outArg ?? (isPrivate ? 'private/Jed-Padro-Resume.pdf' : 'public/resume.pdf'))

const { profile, skills, projects, timeline, certificates, education, softSkills } = await import('../src/data/profile.ts')
const phone = isPrivate && existsSync('resume.private.json') ? JSON.parse(readFileSync('resume.private.json', 'utf8')).phone : null

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
const bare = url => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

// small outline icons (Lucide / Tabler, MIT/ISC), drawn instead of emoji so every PDF reader shows them
const icon = d => `<svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`
const icons = {
  mail: icon('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>'),
  phone: icon('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>'),
  linkedin: icon('<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>'),
  github: icon('<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>'),
  globe: icon('<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>'),
}

const contacts = [
  { i: icons.mail, text: profile.email, href: `mailto:${profile.email}` },
  // with the phone: a two-column grid, the long LinkedIn address in the first column; without it: one column
  ...(phone
    ? [{ i: icons.phone, text: phone, href: `tel:${phone.replace(/\s/g, '')}` }, { i: icons.linkedin, text: bare(profile.linkedin), href: profile.linkedin }, { i: icons.github, text: bare(profile.github), href: profile.github }]
    : [{ i: icons.github, text: bare(profile.github), href: profile.github }, { i: icons.linkedin, text: bare(profile.linkedin), href: profile.linkedin }]),
  { i: icons.globe, text: 'jeedp.github.io/portfolio', href: 'https://jeedp.github.io/portfolio/' },
].filter(Boolean)

// Experience: real roles only (no placeholders, no education)
const ojt = timeline.find(t => t.type === 'work')
const industry = timeline.find(t => t.type === 'training' && !t.placeholder)

// Résumé bullets per project, built from the same facts as the site, in résumé voice
const projectBullets = {
  wayfinding: [
    'Offline touchscreen kiosk that guides visitors to buildings and offices on the SLSU campus; team of two.',
    'Cut floor-plan drawings from 14 MB to 1.5–3 MB each so the vector map runs smoothly on a Raspberry Pi 4.',
    'Built the QR hand-off that continues a route on a visitor’s phone with live GPS over HTTPS.',
    'Wrote the setup script and guide that turn a blank SD card into a working kiosk.',
  ],
  parking: [
    'Automated vehicle entry with RFID authorisation, ultrasonic slot sensing and a servo-driven gate on an ESP32.',
    'Kept gate control and networking on separate FreeRTOS cores, so the gate never waits on the network.',
    'Built a live slot dashboard with Bluetooth LE manual control; unit-tested the gate and RFID logic.',
  ],
  trainsmart: [
    'Desktop app to plan routines, log workouts and sets, and track body measurements over time.',
    'Designed the relational data model in T-SQL and built user accounts with input validation.',
  ],
}
const projectStack = {
  wayfinding: ['JavaScript', 'Node.js', 'Express', 'SQLite', 'Raspberry Pi'],
  parking: ['C++', 'ESP32', 'FreeRTOS', 'Firebase', 'Node.js', 'Vite'],
  trainsmart: ['C#', 'Windows Forms', 'SQL Server'],
}
const projectOrder = ['wayfinding', 'parking', 'trainsmart']

const skillRows = [
  ['Languages', [...skills.find(s => s.name === 'Programming').items, 'SQL']],
  ['Web & backend', skills.find(s => s.name === 'Web development').items],
  ['Databases', skills.find(s => s.name === 'Databases').items],
  ['Embedded', skills.find(s => s.name === 'Embedded systems').items],
  ['Tools', [...skills.find(s => s.name === 'Development tools').items, 'PlatformIO']],
  ['Soft skills', softSkills],
]
const certs = certificates.filter(c => !c.placeholder)

const bullets = list => `<ul>${list.map(b => `<li>${esc(b)}</li>`).join('')}</ul>`
const entry = ({ title, tag, right, sub, list }) => `
  <div class="entry">
    <div class="row"><h3>${esc(title)}${tag ? ` <span class="tag">${esc(tag)}</span>` : ''}</h3><span class="date">${esc(right ?? '')}</span></div>
    ${sub ? `<p class="sub">${sub}</p>` : ''}
    ${list ? bullets(list) : ''}
  </div>`

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(profile.name)} — Résumé</title>
<style>
${[400, 500, 600, 700].map(w => `@font-face { font-family: Inter; font-weight: ${w}; font-display: block; src: url(https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.18/files/inter-latin-${w}-normal.woff2) format("woff2"); }`).join(' ')}
  @page { size: Letter; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --ink: #0f172a; --body: #334155; --muted: #64748b; --line: #e2e8f0; --accent: #2563eb; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { width: 8.5in; height: 11in; padding: 0.46in 0.55in 0.4in; font: 400 9pt/1.4 Inter, "Segoe UI", Arial, sans-serif; color: var(--body); position: relative; }
  body::before { content: ""; position: absolute; inset: 0 0 auto 0; height: 5px; background: var(--accent); }
  a { color: inherit; text-decoration: none; }

  header { display: grid; grid-template-columns: auto 1fr; align-items: end; gap: 4px 14px; padding-bottom: 12px; border-bottom: 1px solid var(--line); }
  h1 { font-size: 24pt; font-weight: 700; letter-spacing: -0.03em; line-height: 1; color: var(--ink); }
  .role { white-space: nowrap; margin-top: 6px; font-size: 9.6pt; font-weight: 500; color: var(--accent); }
  .contact { justify-self: end; display: grid; grid-template-columns: ${phone ? 'auto auto' : 'auto'}; gap: 3px 10px; font-size: 8.1pt; color: var(--body); }
  .contact a { white-space: nowrap; display: inline-flex; align-items: center; gap: 4px; }
  .contact svg { color: var(--accent); }

  section { margin-top: 10px; }
  h2 { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; font-size: 7.6pt; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); }
  h2::after { content: ""; flex: 1; height: 1px; background: var(--line); }

  .summary { color: var(--body); }
  .entry + .entry { margin-top: 6px; }
  .row { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
  h3 { font-size: 9.6pt; font-weight: 600; color: var(--ink); letter-spacing: -0.005em; }
  .tag { margin-left: 4px; padding: 0.5px 5px; border-radius: 3px; background: #eff6ff; color: var(--accent); font-size: 7.2pt; font-weight: 600; vertical-align: 1px; }
  .date { flex-shrink: 0; font-size: 8.3pt; color: var(--muted); font-variant-numeric: tabular-nums; }
  .sub { margin-top: 1px; font-size: 8.5pt; color: var(--muted); }
  .sub b { font-weight: 500; color: var(--body); }
  ul { margin-top: 3px; list-style: none; }
  li { position: relative; padding-left: 11px; }
  li + li { margin-top: 1px; }
  li::before { content: ""; position: absolute; left: 1px; top: 0.62em; width: 4px; height: 1px; background: var(--accent); }

  .skills { display: grid; grid-template-columns: 96px 1fr; gap: 2px 10px; }
  .skills dt { font-weight: 600; color: var(--ink); }
  .coursework { margin-top: 3px; }
  .coursework b { font-weight: 600; color: var(--ink); }
  .certs { display: grid; grid-template-columns: 1fr 1fr; gap: 1px 24px; }
  .certs div { display: flex; justify-content: space-between; gap: 8px; }
  .certs span:first-child { color: var(--ink); }
  .issuer { font-weight: 500; letter-spacing: 0.02em; text-transform: none; font-size: 8pt; color: var(--muted); }
</style></head><body>
  <header>
    <div>
      <h1>${esc(profile.name)}</h1>
      <p class="role">${esc(profile.title)} · ${esc(profile.subtitle)}</p>
    </div>
    <div class="contact">${contacts.map(c => `<a href="${esc(c.href)}">${c.i}${esc(c.text)}</a>`).join('')}</div>
  </header>

  <section>
    <h2>Summary</h2>
    <p class="summary">Fourth-year Computer Engineering student at Southern Leyte State University with hands-on experience in web development, databases and embedded systems, from bug fixes in a production Laravel app to an ESP32 parking gate and an offline Raspberry Pi kiosk. Seeking a software engineering internship to contribute to real projects and keep growing.</p>
  </section>

  <section>
    <h2>Experience</h2>
    ${ojt ? entry({ title: ojt.title, right: ojt.period, sub: `<b>${esc(ojt.org)}</b> · ${esc((ojt.tech ?? []).join(' · '))}`, list: [
      'Traced, fixed and documented five bugs in a production Laravel app with about 260 API routes.',
      'Debugged the Internal Control Questionnaire module across Blade views, jQuery and the JSON API.',
    ] }) : ''}
    ${industry ? entry({ title: industry.title, right: industry.period, sub: `<b>${esc(industry.org)}</b>` }) : ''}
  </section>

  <section>
    <h2>Projects</h2>
    ${projectOrder.map(id => {
      const p = projects.find(x => x.id === id)
      return entry({ title: p.title, tag: p.status ? `${p.kind.replace('Undergraduate thesis', 'Thesis')} · ${p.status}` : null, right: p.year, sub: esc(projectStack[id].join(' · ')), list: projectBullets[id] })
    }).join('')}
  </section>

  <section>
    <h2>Education</h2>
    <div class="entry">
      <div class="row"><h3>${esc(education.degree)}</h3><span class="date">${esc(education.period)} · ${esc(education.expected)}</span></div>
      <p class="sub"><b>${esc(education.school)}</b> · ${esc(education.location)}</p>
      <p class="coursework"><b>Relevant coursework:</b> ${esc(education.coursework.join(', '))}</p>
    </div>
  </section>

  <section>
    <h2>Technical skills</h2>
    <dl class="skills">${skillRows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v.join(', '))}</dd>`).join('')}</dl>
  </section>

  <section>
    <h2>Certifications <span class="issuer">Cisco Networking Academy · DICT-ITU DTC Initiative</span></h2>
    <div class="certs">${certs.map(c => `<div><span>${esc(c.title)}</span><span class="date">${esc(c.date)}</span></div>`).join('')}</div>
  </section>
</body></html>`

const tmp = join(tmpdir(), `jed-resume-${isPrivate ? 'private' : 'public'}.html`)
writeFileSync(tmp, html)

const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean)
const browser = candidates.find(p => existsSync(p))
if (!browser) { console.error('No Chrome or Edge found. Set CHROME_PATH and run again.'); process.exit(1) }

mkdirSync(dirname(out), { recursive: true })
execFileSync(browser, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--virtual-time-budget=8000', `--print-to-pdf=${out}`, pathToFileURL(tmp).href], { stdio: 'ignore' })
console.log(`Wrote ${out}${isPrivate ? ' (private: includes phone)' : ' (public: no phone)'}`)

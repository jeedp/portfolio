// Builds the résumé PDF from src/data/profile.ts, so the PDF always matches the website.
// Plain layout on purpose: black text, no tags or icons, verb-first bullets.
//
//   npm run resume            -> public/resume.pdf  (public: no phone number; served by the website)
//   npm run resume:private    -> private/Jed-Padro-Resume.pdf  (adds the phone number from resume.private.json)
//
// Options: --private (include the phone from resume.private.json), --out <file>.
// The internship is covered by a non-disclosure agreement: keep its bullets general.
// Needs Chrome or Edge; set CHROME_PATH if it is not found.
import { writeFileSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const args = process.argv.slice(2)
const isPrivate = args.includes('--private')
const out = resolve(args.includes('--out') ? args[args.indexOf('--out') + 1] : (isPrivate ? 'private/Jed-Padro-Resume.pdf' : 'public/resume.pdf'))

const { profile, certificates, education, seniorHigh, scholarship } = await import('../src/data/profile.ts')
const phone = isPrivate && existsSync('resume.private.json') ? JSON.parse(readFileSync('resume.private.json', 'utf8')).phone : null

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
const bare = url => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

const contact = [
  `<a href="mailto:${profile.email}">${esc(profile.email)}</a>`,
  phone && esc(phone),
  `<a href="${profile.github}">${esc(bare(profile.github))}</a>`,
  `<a href="${profile.linkedin}">${esc(bare(profile.linkedin))}</a>`,
  `<a href="https://jeedp.github.io/portfolio/">jeedp.github.io/portfolio</a>`,
].filter(Boolean).join('<span class="sep">|</span>')

// title, place, dates, bullets
const job = (title, org, dates, items) => `
  <div class="entry">
    <div class="row"><p><b>${title}</b></p><p class="date">${dates}</p></div>
    <p class="org">${org}</p>
    ${items ? `<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>` : ''}
  </div>`

const certs = certificates.filter(c => !c.placeholder)

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(profile.name)} Résumé</title>
<style>
  ${[400, 600, 700].map(w => `@font-face { font-family: Inter; font-weight: ${w}; font-display: block; src: url(https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.18/files/inter-latin-${w}-normal.woff2) format("woff2"); }`).join(' ')}
  @page { size: Letter; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { width: 8.5in; height: 11in; padding: 0.5in 0.6in; font: 400 9.5pt/1.4 Inter, Arial, sans-serif; color: #111; }
  a { color: inherit; text-decoration: none; }
  h1 { font-size: 21pt; font-weight: 700; letter-spacing: -0.01em; text-align: center; }
  .contact { margin-top: 4px; text-align: center; font-size: 8.4pt; white-space: nowrap; color: #333; }
  .sep { margin: 0 4px; color: #999; }
  h2 { margin-top: 11px; padding-bottom: 2px; border-bottom: 1px solid #111; font-size: 10pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; }
  .entry { margin-top: 6px; }
  .row { display: flex; justify-content: space-between; gap: 16px; }
  .date { flex-shrink: 0; }
  .org { font-style: italic; color: #222; }
  ul { margin-top: 2px; padding-left: 15px; }
  li { margin-top: 0; }
  .plain { margin-top: 4px; }
  .skills p { margin-top: 2px; }
</style></head><body>
  <h1>${esc(profile.name)}</h1>
  <p class="contact">${contact}</p>

  <h2>Education</h2>
  ${job(esc(education.degree), `${esc(education.school)}, ${esc(education.location)}`, `Aug 2023 – May 2027 (expected)`, [
    `${esc(scholarship.name)} (${esc(scholarship.law)}), 2023 – present`,
    `Relevant coursework: ${esc(education.coursework.join(', '))}`,
  ])}
  ${job(`${esc(seniorHigh.level)}`, `${esc(seniorHigh.school)}, ${esc(seniorHigh.location)}`, '2021 – 2023', ['Graduated with honors'])}

  <h2>Experience</h2>
  ${job('Web Developer Intern, Project LODI', 'DOST Central Office, Planning and Evaluation Service, Information Technology Division', 'Jul – Sep 2026', [
    'Completed a 240-hour internship under the League of Developers Initiative.',
    'Fixed and documented bugs in an internal Laravel web application.',
    'Traced each issue through the front end, back end and database before fixing it.',
    'Followed the division’s coding standards.',
  ])}

  <h2>Projects</h2>
  ${job('SLSU Campus Wayfinding System', 'Undergraduate thesis · JavaScript, Node.js, Express, SQLite, Raspberry Pi', '2026 – present', [
    'Building an offline touchscreen kiosk, with one teammate, that guides visitors around campus.',
    'Cut floor-plan files from 14 MB to under 3 MB each to keep the map smooth on a Raspberry Pi 4.',
    'Built a QR code hand-off that continues the route on a visitor’s phone with live GPS.',
    'Wrote a setup script that turns a blank SD card into a working kiosk.',
  ])}
  ${job('Smart Parking Gate System', 'Team project, hardware built by teammates · C++, ESP32, FreeRTOS, Firebase, JavaScript', '2026', [
    'Wrote the ESP32 firmware for RFID entry, the two servo gates and the free-space count.',
    'Ran gate control and Firebase sync as separate FreeRTOS tasks on the two cores.',
    'Built the web dashboard, including manual gate control over Bluetooth LE.',
    'Wrote unit tests for the gate and RFID logic with PlatformIO.',
  ])}
  ${job('TrainSMART', 'Solo project · C#, Windows Forms, SQL Server', '2025', [
    'Built a Windows desktop app for planning workouts, logging sets and tracking body measurements.',
    'Designed a nine-table SQL Server database and added user accounts with hashed passwords.',
  ])}

  <h2>Skills</h2>
  <div class="skills">
    <p><b>Languages:</b> C, C++, C#, Java, Python, JavaScript, PHP, SQL</p>
    <p><b>Web:</b> HTML, CSS, Laravel, Node.js, Express</p>
    <p><b>Databases:</b> MySQL, SQL Server, SQLite, Firebase</p>
    <p><b>Embedded:</b> Arduino, ESP32, Raspberry Pi, FreeRTOS</p>
    <p><b>Tools:</b> Git, GitHub, VS Code, Visual Studio, PlatformIO, Postman, Laragon</p>
  </div>

  <h2>Certifications</h2>
  <p class="plain">Cisco Networking Academy (DICT-ITU DTC Initiative): ${certs.map(c => `${esc(c.title)} (${esc(c.date)})`).join(', ')}</p>
</body></html>`

const tmp = join(tmpdir(), `jed-resume-${isPrivate ? 'private' : 'public'}.html`)
writeFileSync(tmp, html)
const browser = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => existsSync(p))
if (!browser) { console.error('No Chrome or Edge found. Set CHROME_PATH and run again.'); process.exit(1) }
mkdirSync(dirname(out), { recursive: true })
const before = existsSync(out) ? statSync(out).mtimeMs : 0
// A separate profile, so an already-running Chrome/Edge can't swallow the job without printing.
const profileDir = join(tmpdir(), `jed-resume-browser-${Date.now()}`)
execFileSync(browser, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--user-data-dir=${profileDir}`, '--virtual-time-budget=8000', `--print-to-pdf=${out}`, pathToFileURL(tmp).href], { stdio: 'ignore' })
// Edge's launcher can return before the PDF is written; wait for a fresh file (up to 30 s).
const started = Date.now()
while (!(existsSync(out) && statSync(out).mtimeMs > before && statSync(out).size > 0)) {
  if (Date.now() - started > 30000) { console.error(`Timed out waiting for ${out}`); process.exit(1) }
  await new Promise(r => setTimeout(r, 250))
}
await new Promise(r => setTimeout(r, 300)) // let the writer finish
console.log(`Wrote ${out}${isPrivate ? ' (private: includes phone)' : ' (public: no phone)'}`)

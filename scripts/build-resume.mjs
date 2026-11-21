// Builds public/resume.pdf from src/data/profile.ts, so the PDF always matches the site.
// Usage: npm run resume   (needs Chrome or Edge; set CHROME_PATH if it is not found)
import { writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const { profile, about, skills, projects, timeline, certificates } = await import('../src/data/profile.ts')

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
const work = timeline.filter(t => !t.placeholder && t.type !== 'education')
const certs = certificates.filter(c => !c.placeholder)

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(profile.name)} – Résumé</title>
<style>
  @page { size: A4; margin: 14mm 15mm; }
  * { box-sizing: border-box; }
  body { margin: 0; font: 10.2pt/1.45 "Segoe UI", Arial, sans-serif; color: #1b2433; }
  h1 { margin: 0; font-size: 21pt; letter-spacing: -.01em; color: #0b1220; }
  .role { margin: 2px 0 6px; font-size: 11pt; color: #0369a1; font-weight: 600; }
  .contact { color: #4b5768; font-size: 9.4pt; }
  .contact a { color: inherit; text-decoration: none; }
  h2 { margin: 14px 0 6px; padding-bottom: 3px; border-bottom: 1.5px solid #0284c7; font-size: 10.5pt; letter-spacing: .04em; text-transform: uppercase; color: #0b1220; }
  p { margin: 0 0 4px; }
  .row { display: flex; justify-content: space-between; gap: 12px; }
  .row b { color: #0b1220; }
  .muted { color: #5b6677; }
  ul { margin: 3px 0 8px; padding-left: 16px; }
  li { margin-bottom: 2px; }
  .item { margin-bottom: 8px; break-inside: avoid; }
  .skills div { margin-bottom: 2px; }
</style></head><body>
  <h1>${esc(profile.name)}</h1>
  <p class="role">${esc(profile.title)} | ${esc(profile.subtitle)}</p>
  <p class="contact">${esc(profile.location)} · <a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a> · <a href="${esc(profile.github)}">${esc(profile.github.replace('https://', ''))}</a> · <a href="${esc(profile.linkedin)}">linkedin.com/in/jed-padro</a> · <a href="https://jeedp.github.io/portfolio/">jeedp.github.io/portfolio</a></p>

  <h2>Summary</h2>
  <p>${esc(about.paragraphs[0])}</p>

  <h2>Education</h2>
  <div class="row"><b>BS Computer Engineering</b><span class="muted">In progress</span></div>
  <p class="muted">Southern Leyte State University (SLSU), Philippines</p>

  <h2>Experience</h2>
  ${work.map(w => `<div class="item"><div class="row"><b>${esc(w.title)}</b><span class="muted">${esc(w.period)}</span></div>
    <p class="muted">${esc(w.org)}</p>${w.description ? `<p>${esc(w.description)}</p>` : ''}</div>`).join('')}

  <h2>Projects</h2>
  ${projects.map(p => `<div class="item"><div class="row"><b>${esc(p.title)}</b><span class="muted">${esc(p.kind)}${p.status ? ', ' + esc(p.status.toLowerCase()) : ''}</span></div>
    <p>${esc(p.summary)}</p><ul>${[...(p.challenges ?? []).slice(0, 1).map(c => `${c.challenge} ${c.solution}`), ...(p.challenges ? [] : p.contributions.slice(1, 2)), ...p.features.slice(0, 2)].map(t => `<li>${esc(t)}</li>`).join('')}</ul>
    <p class="muted">${esc(p.tech.join(', '))}</p></div>`).join('')}

  <h2>Technical skills</h2>
  <div class="skills">${skills.map(s => `<div><b>${esc(s.name)}:</b> ${esc(s.items.join(', '))}</div>`).join('')}</div>

  <h2>Certifications</h2>
  ${certs.map(c => `<div class="row"><span>${esc(c.title)}</span><span class="muted">${esc(c.date)}</span></div>`).join('')}
  <p class="muted">Cisco Networking Academy, through the DICT-ITU DTC Initiative</p>
</body></html>`

const tmp = join(tmpdir(), 'jed-resume.html')
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

mkdirSync('public', { recursive: true })
const out = resolve('public/resume.pdf')
execFileSync(browser, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${out}`, pathToFileURL(tmp).href], { stdio: 'ignore' })
console.log(`Wrote ${out}`)

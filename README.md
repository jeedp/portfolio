# Jed B. Padro — Portfolio and online résumé

Personal portfolio of Jed B. Padro, Computer Engineering student at Southern Leyte State University and aspiring software engineer.

Live at **https://jeedp.github.io/portfolio/**

Built with React, TypeScript, Vite, Tailwind CSS, Lucide icons and Framer Motion.

Technology logos come from [Simple Icons](https://simpleicons.org) (CC0); see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for all third-party assets.

## Run it locally

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:5173/portfolio/ in your browser. The page reloads as you edit.

Other commands:

| Command | What it does |
| --- | --- |
| `npm run build` | Type-checks and builds the production site into `dist/` |
| `npm run preview` | Serves the built `dist/` folder so you can check it before deploying |
| `npm run resume` | Rebuilds `public/resume.pdf` from your data (needs Chrome or Edge installed) |
| `npm run thumbs` | Renders certificate thumbnails from the PDFs in `public/certificates/` |

## Project structure

```
public/            files served as-is: favicon, résumé PDF, 404 page, social preview image
scripts/           build-resume.mjs, which turns your data into public/resume.pdf
src/
  data/profile.ts  ALL your personal content: name, links, about, skills, projects, timeline, certificates
  components/      reusable pieces: Button, Badge, Section, Navbar, Avatar, ProjectVisual, BackToTop
  hooks/           theme toggle, active nav section, GitHub repositories
  sections/        one file per page section: Hero, About, Skills, Projects, Experience, Resume, Contact
  App.tsx          puts the sections in order
  index.css        colours and fonts for the dark and light themes
.github/workflows/ deploy.yml publishes the site to GitHub Pages on every push to main
```

## Updating your information

Almost everything lives in **`src/data/profile.ts`**. Change it, save, and the site and the résumé section update.

- **Name, title, links, availability line, hero text:** the `profile` object at the top.
- **Your photo:** put a square photo at `public/profile.jpg` and set `photo: 'profile.jpg'`. Until then a "JP" monogram shows.
- **About me:** the `about.paragraphs`, `about.highlights` and `about.interests` lists.
- **Skills:** the `skills` list. Each group has a name, an icon (`code`, `globe`, `database`, `cpu` or `wrench`) and its items.
- **Projects:** the `projects` list. To add a screenshot, put the image in `public/projects/` (for example `public/projects/trainsmart.png`) and set `image: 'projects/trainsmart.png'` on that project. Until then the card shows a diagram of how the project works. `category` (`Desktop`, `IoT` or `Web`) drives the filter buttons.
- **Experience and education:** the `timeline` list. Entries with `placeholder: true` show as dashed "add this" cards; replace them with real entries or delete them.
- **Certificates:** the `certificates` list. Put the PDF in `public/certificates/`, set `file: 'certificates/<name>.pdf'` and `image: 'certificates/<name>.jpg'`, then run `npm run thumbs` to render the thumbnail from the PDF (needs Python with PyMuPDF: `pip install pymupdf`).
- **Project write-ups:** each project's `focus` (the engineering problem it's really about), `details` (shown in the expandable panel) and `availability` (where the code lives) are in the `projects` list.

### The résumé PDF

`public/resume.pdf` is generated from the same data, so it never drifts from the site:

```bash
npm run resume
```

It looks for Chrome or Edge. If it can't find one, set `CHROME_PATH` to your browser's path. You can also simply replace `public/resume.pdf` with a résumé you made elsewhere; the download buttons will serve whatever file is there.

### The contact form

Out of the box the form does not pretend to send anything. When a visitor presses the button, their own email app opens with the name, subject and message filled in, addressed to you.

To receive messages directly instead:

1. Create a free form at [formspree.io](https://formspree.io) and copy its form ID (the part after `/f/`).
2. For local development, create a `.env` file in the project folder containing `VITE_FORMSPREE_ID=your_id`.
3. For the live site on GitHub Pages: repo **Settings → Secrets and variables → Actions → Variables**, add a variable named `VITE_FORMSPREE_ID` with your ID, then push or re-run the deploy workflow.

The button then reads "Send message" and only shows "Message sent" after Formspree confirms it.

## Deploying

### GitHub Pages (current setup)

The workflow in `.github/workflows/deploy.yml` builds the site and publishes `dist/` on every push to `main`.

One-time setting: in the repo, open **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.

The site is served at `/portfolio/`, which is set in `vite.config.ts`. If you rename the repository, change `base` there to match.

### Vercel

Import the repository at [vercel.com/new](https://vercel.com/new). Vercel detects Vite automatically (build command `npm run build`, output `dist`). The config switches the base path to `/` on Vercel by itself. Add `VITE_FORMSPREE_ID` under Project Settings → Environment Variables if you use Formspree.

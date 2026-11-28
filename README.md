# Jed B. Padro — Portfolio

Personal portfolio and résumé of Jed B. Padro, Computer Engineering student at Southern Leyte State University.

**Live:** https://jeedp.github.io/portfolio/

Built with React, TypeScript, Vite, Tailwind CSS and Framer Motion. Third-party assets are credited in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Run it

```bash
npm install
npm run dev       # local preview
npm run build     # production build in dist/
npm run resume    # rebuild public/resume.pdf from the site's data
```

## Update the content

Everything personal (profile, projects, experience, education, skills, certificates) lives in [`src/data/profile.ts`](src/data/profile.ts). Project screenshots and demo videos go in `public/projects/`, certificates in `public/certificates/`. Pushing to `main` deploys to GitHub Pages.

# Alan Anto — Portfolio

Personal portfolio built with React, TypeScript and Vite, deployed to GitHub Pages with GitHub Actions.

## Editing content

All text, projects, skills and certifications live in [`src/data.ts`](src/data.ts).
To add a GitHub or demo link to a project, set its `github` / `demo` field — the card shows the buttons automatically.

Put your CV at `public/CV.pdf`.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

1. Push this folder to a GitHub repository (branch `main`).
2. In the repo: **Settings → Pages → Source: GitHub Actions**.
3. Every push to `main` builds and deploys the site via `.github/workflows/deploy.yml`.

The build uses a relative base path, so it works both as `username.github.io` and as `username.github.io/<repo-name>/`.

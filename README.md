# Ectropa

The public website for Ectropa, a private family holding company.

## Editing content

All public copy and the hero-media reference are in `src/content.ts`. See `CONTENT-GUIDE.md` for the interview questions, asset specifications, publishing steps, and maintenance schedule.

## Local development

```bash
pnpm install
pnpm dev
```

## Production build

```bash
pnpm build
```

The static site is written to `dist/`. The `public/CNAME` file is copied into that folder automatically.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml` and deploys `dist/` to GitHub Pages. In repository settings, Pages must use **GitHub Actions** as its source.

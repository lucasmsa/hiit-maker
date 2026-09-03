# 7. Deploy through the Vercel Git integration, hiit.lucasmsa.dev, installable PWA

Date: 2026-09-03

## Status

Accepted

## Decision

- The Vercel project is renamed `hiitmaker` (`hiitmaker.vercel.app`).
  `hiit-maker.vercel.app` belongs to an unrelated product.
- Custom domain `hiit.lucasmsa.dev`. The apex is reserved for the personal site.
- Production deploys from `prod`, previews from pull requests, through the
  Vercel Git integration. The GitHub Action deploy job and its secrets are
  removed.
- CI (GitHub Actions, Node 22, pnpm) on pushes to `dev` and `prod` and on pull
  requests: install, typecheck, lint, unit and component tests, build,
  Playwright. SonarCloud is removed.
- Installable PWA via `vite-plugin-pwa`: manifest, icons, precache of the app
  shell and the catalog images, scope `/`.

## Context

The previous workflow deployed from CI with a third-party action while a Vercel
badge in the README implied the Git integration was also connected. A HIIT timer
is used on a phone at the gym, where the network is unreliable and a home-screen
icon matters.

## Consequences

- The workflow file has no secrets.
- Canonical URL in meta tags and README is `https://hiit.lucasmsa.dev`.

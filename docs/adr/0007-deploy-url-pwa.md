# 7. Deploy through the Vercel Git integration, a custom subdomain, installable PWA

Date: 2026-09-03

## Status

Accepted. Amended 2026-09-04: the domain is `hiit-maker.lucasmsa.com`.
`lucasmsa.dev` was never registered; `lucasmsa.com` was bought instead and its
apex serves the personal site.

## Decision

- The Vercel project is renamed `hiitmaker` (`hiitmaker.vercel.app`).
  `hiit-maker.vercel.app` belongs to an unrelated product.
- Custom domain `hiit-maker.lucasmsa.com`. The apex is reserved for the personal site.
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
- Canonical URL in meta tags and README is `https://hiit-maker.lucasmsa.com`.

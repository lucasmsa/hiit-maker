# 1. Vite, React 19, Tailwind v4, Zustand and motion replace the CRA stack

Date: 2026-09-03

## Status

Accepted

## Decision

- Build with Vite and React 19 under TypeScript `strict`. Package manager is pnpm.
  `react-scripts` 3.4.3, webpack 4 and Jest 24 are removed.
- Tests: Vitest for stores, utils and the timer (fake clocks); Testing Library for
  the builder and run screens; Playwright for two golden paths (build then run a
  HIIT workout; run a gym session and log a set).
- Styling: Tailwind v4 on top of design tokens declared once as CSS custom
  properties (`src/styles/tokens.css`). No runtime CSS-in-JS. styled-components
  is removed.
- Motion: `motion` v12 for layout animation and springs. Every animation is
  gated on `prefers-reduced-motion`.
- State: Zustand with the `persist` middleware ([ADR-0002](0002-stores-and-migration.md)).
  Redux, redux-thunk, redux-persist and redux-devtools-extension are removed.
- Components render only. Event handlers, effects and derived state live in
  `use*` hooks; pure calculations in `src/lib`; constants in their own modules.
- Dependencies that were declared and never imported are dropped: axios, moment,
  miragejs, react-beautiful-dnd, react-toastify, react-tooltip, react-scroll,
  react-collapse, react-countdown, react-countdown-hook, react-animations,
  react-aspect-ratio, react-show, react-transition-group, json-loader,
  @steveeeie/react-page-transition and the redux-mock-store test helper.

## Context

Audit of the 2023 codebase on Node 22:

| Check | Result |
|---|---|
| `yarn build` | fails with `ERR_OSSL_EVP_UNSUPPORTED` unless `--openssl-legacy-provider` is set |
| `yarn lint` | exits 2, eslint 6 cannot parse `es2021` in the config |
| `yarn audit` | 41 critical, 326 high, all transitive through react-scripts 3 |
| Declared dependencies never imported | 20 of 47 |
| Statement coverage | 17.8%, store only |
| Typecheck | passes only because `skipLibCheck` skips the ambient `type.d.ts`, which has a generic used without an argument |

Upgrading CRA in place keeps an unmaintained build tool and most of the audit.
Next.js adds a server for an app that fetches nothing.

## Consequences

- One lockfile (`pnpm-lock.yaml`); `yarn.lock` is deleted.
- Vercel detects pnpm and Vite from the repo; no build command override.
- Components under `src/components` are replaced, not migrated file by file.
  The store tests are the only tests that carry over, rewritten for the new
  store API.

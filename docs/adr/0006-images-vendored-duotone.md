# 6. Exercise photos are vendored and share one duotone treatment

Date: 2026-09-03

## Status

Accepted

## Decision

- Photos come from sources whose license allows redistribution without
  attribution requirements (Unsplash License, Pexels License). Each is stored as
  WebP at 480 and 960 px wide under `public/exercises/<slug>-{480,960}.webp`.
- `public/exercises/ATTRIBUTION.md` lists, per file: source URL, author, license.
  A photo without a recorded source is not shipped.
- Tiles show the photos in full colour, square with the original 1.25 rem
  radius (amended 2026-09-03: the red duotone treatment of the first pass was
  dropped after review to match the 2023 tiles).
- Every `<img>` has `alt` set to the exercise name and an `onError` fallback to
  the muscle-group icon.

## Context

The 24 catalog images were hotlinked to fitness blogs and stock sites. Six now
return HTML or block cross-origin embedding (`ERR_BLOCKED_BY_ORB`), which is what
the blank tiles were. None had `alt`. The load event waited on all 24 (about
7 s on the live site).

## Consequences

- The catalog is offline-capable and precached by the service worker
  ([ADR-0007](0007-deploy-url-pwa.md)).
- Adding an exercise means adding a photo with a recorded source.

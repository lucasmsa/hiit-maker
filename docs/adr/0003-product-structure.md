# 3. Splash, two modes, library, routes, languages

Date: 2026-09-03

## Status

Accepted

## Decision

- Amended 2026-09-04 by [ADR-0008](0008-drop-gym-mode.md): gym mode and the
  splash are removed, and `/` is the builder. The rest of this record stands.
- `/` is a two-panel splash: HIIT or Gym. The choice is remembered; later
  visits to `/` redirect to that mode's first screen. The logo returns to the
  splash.
- HIIT's first screen is the builder of the current workout. Saved workouts are
  reached through a switcher next to the workout name (switch, new, duplicate,
  rename, delete); there is no separate library page (amended 2026-09-03 after
  review: the original app opened on the builder and that order stays).
- Routes: `/hiit` (builder of the current workout), `/hiit/:id` (builder),
  `/hiit/:id/run`;
  `/gym` (library), `/gym/:id` (plan), `/gym/:id/run`; `/settings`.
- Share: `/hiit/shared#<base64url(JSON)>` carries a whole workout in the URL
  fragment. Opening it imports the workout into the library. No backend.
- The HIIT catalog grows from 24 to about 40 exercises across Chest, Back, Legs,
  Core, Shoulders, Arms and Cardio. Exercises inside a set can be reordered by
  drag and by keyboard (move up/down).
- Fully responsive. The builder stacks into catalog sheet, set editor and
  summary bar under 1024 px. The run screen is designed phone-first.
- Languages: English and Brazilian Portuguese from one dictionary keyed by
  string id. Default follows `navigator.language`; a toggle in settings
  overrides it. Seconds are labelled "s". Weights are in kg.
- The product name stays HIIT Maker. A live product at hiitmaker.com uses the
  same name; this project is not affiliated and does not use that domain.

## Context

The 2023 app had one implicit training, a 5 sets by 5 exercises cap, tooltips
clipped by the horizontal scroller, "segs" (Portuguese) inside an English UI, a
"muslce" typo, and a "use a desktop" wall below 1070 px width.

## Consequences

- The library is the unit of persistence; the builder edits one item of it.
- Every user-facing string goes through the dictionary from day one.

# 4. Gym mode: routines by day, prescriptions, light log

Date: 2026-09-03

## Status

Accepted

## Decision

- A routine is an ordered list of days. A day is a name plus ordered entries.
- An entry is an exercise reference (catalog id or a custom free-text name) plus
  a prescription: `sets`, `reps` as a range (`8-10`) or `holdSeconds`, optional
  `tempo` text (`3s up / 3s down`), `perSide` flag, optional `notes`, `optional`
  flag, optional `restSeconds` override. The routine carries a default
  `restSeconds` (90).
- A session log records, per entry and set: `weightKg`, `reps`, `done`, `at`.
  The last logged values per exercise prefill the next session. No charts.
- Rest between sets uses the run engine ([ADR-0005](0005-run-engine.md)) as a
  single-phase timer.
- Seeded gym catalog of about 35 exercises tagged by muscle group and equipment.
  The visual is the muscle-group icon; gym exercises have no photos.
- One built-in template ships: "Push / Pull / Legs + prehab" with days Warm-up,
  Push, Pull, Legs and Daily, taken from the maintainer's routine, notes
  included.

## Context

The interval model (train seconds, rest seconds) cannot express `3x8-10`, holds,
tempo or per-side work. A separate data model is smaller than a unified one with
mode flags on every field.

## Consequences

- Two catalogs (HIIT, gym) with independent seeds; a custom entry is stored by
  name and never added to the catalog.
- Session logs are the only append-only data in the app and the first candidate
  for a size cap if localStorage fills.

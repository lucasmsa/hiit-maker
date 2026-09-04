# 8. Gym mode is removed; the app is a HIIT builder again

Date: 2026-09-04

## Status

Accepted. Supersedes [ADR-0004](0004-gym-data-model.md) and amends
[ADR-0003](0003-product-structure.md).

## Decision

- Gym mode is removed: routines, prescriptions, the seeded catalog and template,
  session logging and the rest bar. 29 source files and 3073 lines go, along with
  112 dictionary keys per language and 30 tests.
- The splash goes with it. With one mode there is nothing to pick, so `/` is the
  builder of the current workout, which is where the 2023 app opened.
- The HIIT and Gym chips leave the brand rail. The rail keeps the logo, the
  GitHub link, settings and the language toggle.
- Nothing is archived in-tree. The work is reachable at tag `gym-mode` and in the
  history of pull request #11.

## Context

The gym data model never shared anything with the interval model: sets and reps
with tempo and per-side flags against a flat schedule of timed phases. Two
catalogs, two libraries, two run screens and two session shapes, joined only by
a mode switch.

The maintainer's verdict after using it: "gym is a bit buggy, the ux is kinda
terrible, dont know if worth dropping or adjusting it, the name of the app is
HIIT maker, so, yea".

The product argument is the same one: a portfolio project wins on a sharp thesis
carried through one surface, not on a count of features. Building the interval
timer well beats building it alongside a weaker lifting tracker.

## Consequences

- The builder, the run screen and settings are the whole app. Every remaining
  screen serves the interval workout.
- `Settings` loses the weight unit row, which existed only for session logging.
- A lifting tracker, if it happens, starts as its own project with a data model
  built for progressive overload rather than one bolted onto a timer.

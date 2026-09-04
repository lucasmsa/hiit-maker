# 2. Two Zustand stores, versioned persistence, one-time Redux migration

Date: 2026-09-03

## Status

Accepted

## Decision

- `useLibraryStore` holds saved HIIT workouts, gym routines, gym session logs,
  settings (defaults, language, units, mute) and the last chosen mode. Persisted
  under the key `hiit-maker/library`, `version: 1`, with a `migrate` function.
- `useRunStore` holds the active session: schedule, phase index, phase start
  timestamp, pause bookkeeping. Persisted under `hiit-maker/run` so a reload
  resumes the run. Remaining time is derived from timestamps
  ([ADR-0005](0005-run-engine.md)), so no per-second writes happen.
- Every placed exercise and set carries an id from `crypto.randomUUID()`.
- Amended 2026-09-04: the builder caps a set at 5 exercises and a workout at 8
  sets, and refuses the same exercise twice inside one set. The counters and the
  refusal toast from the 2023 app come back with them. The same exercise in two
  different sets stays allowed, which is what the ids are for. Lifting the caps
  produced a set of 19 exercises with one movement listed twice, which is not a
  circuit anyone would run.
- Reset of a workout touches that workout only. Settings live in their own slice
  and have their own reset.
- Actions are typed functions on the store. No string action types, no optional
  payload bag, no throwing for validation; invalid input is refused at the
  boundary (input clamping, disabled controls) and never reaches the store.
- On first load, if `localStorage['persist:hiit-maker']` exists (the old
  redux-persist root), its `training.trainSetLoops` and `trainingDefaultValues`
  are converted into one workout named "Imported workout" plus settings, then
  the key is removed. A fixture captured from the live app drives the unit test.

## Context

Bugs found in the Redux store: `RESET_TRAINING` returned the whole initial state
and wiped settings; the persisted root included the 1 s countdown so
localStorage was written every tick; `REMOVE_CURRENT_SET` computed the new index
without looking at which set was removed and callers patched it with a second
dispatch; `TrainingAction.payload` was optional-everything with 16 non-null
assertions; reducers threw and components wrapped `dispatch` in `try/catch`;
exercises were keyed by name so adding "Plank" twice collided.

## Consequences

- Any change to the persisted shape bumps `version` and adds a migration case.
- The run survives a reload and a phone lock, which the old app did not.

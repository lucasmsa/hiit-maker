# 5. Run engine: wall clock, audio cues, wake lock

Date: 2026-09-03

## Status

Accepted

## Decision

- A workout compiles to a flat schedule: `{ kind: warmup | train | rest |
  setRest, exerciseId?, durationMs }[]`. The run store keeps `phaseIndex`,
  `phaseStartedAt` (epoch ms), `pausedAt` and `pausedMs`. Remaining time is
  `durationMs - (now - phaseStartedAt - pausedMs)`. A 250 ms tick only triggers
  re-render; phase advance happens when remaining reaches zero, catching up
  across multiple phases if the tab was suspended.
- Audio through Web Audio: short ticks at 3, 2, 1 and a two-tone chime on phase
  change and on finish. The `AudioContext` is created on the Start tap. Mute is
  persisted.
- `navigator.wakeLock.request('screen')` on start, re-acquired on
  `visibilitychange`, released on pause and finish. Absent API: no-op.
- The gym rest timer is the same engine with a one-phase schedule.

## Context

The old countdown recreated a `setInterval` on every tick, so each second was
1000 ms plus render latency, and background tabs throttled it to a crawl. It had
no wall-clock reference, no sound, and phones went to sleep mid-set.

## Consequences

- Timer tests run on fake clocks and assert against timestamps, not tick counts.
- Audio is unavailable until the first user gesture; the Start control is that
  gesture.

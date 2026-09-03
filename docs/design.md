# Design plan

The 2023 interface is the specification. Its assets (logo, muscle icons, body
silhouettes, skewed labels, pulsing play button, set-progress dots and ring) are
reused from git history, not redrawn. New screens (gym mode, settings, splash)
are composed from the same parts. Changes are limited to defects (clipped
tooltips, dead photos, broken layouts, no keyboard access) and to what the
product now needs (saved workouts, gym mode, phone layout).

Subject: a workout builder for bodyweight interval circuits and gym routines.
Primary job: build fast on a laptop, read the timer from a phone on the floor.

## Palette (from the original `global.ts`)

| Token | Hex | Role |
|---|---|---|
| brand | #EE373F | left bar, primary actions, train phase |
| brand-deep | #DF2C2C | hover and pressed on red |
| ink | #282828 | text, black chips, repetitions bar |
| paper | #FFFFFF | canvas and cards |
| paper-dim | #EBEBEB | input pills, dividers |
| go | #43C079 | target-muscle fills, add-set, rest phases |
| warmup | #F2A93B | warm-up phase (new; nothing existed before) |

## Type

- Montserrat for headings, chips, set titles and numbers; Roboto for body and
  labels. Both self-hosted through fontsource.
- Sizes stay close to the original: chips 20 px, set title 32 px, total time
  56 px, countdown about 12 vw on desktop and 22 vw on phones. No full-screen
  digits: the user finds a giant counting number stressful.
- Sentence case except the original upper-case labels TRAIN, REST, SET REST,
  N SET REPETITIONS, PROGRESS, which are kept as they were.

## Signature elements, all original

- Logo: `branding.svg`, the two i's drawn as dumbbells. White on red, ink on
  white. Never redrawn.
- Skewed black labels (Target muscles, Total time) and the red "Start now".
- Muscle icons: `chest_icon`, `legs_icon`, `back_icon`, `core_icon` verbatim;
  shoulders, arms and cardio are drawn as filled white pictograms in the same
  16 by 16 style and reviewed next to the originals at 16 and 24 px.
- Body map: `targetMusclesFront` and `targetMusclesBack` black silhouettes with
  the green `coloredChest`, `coloredAbs`, `coloredBack`, `coloredLegs` overlays
  positioned as the original component did; shoulders and arms get overlays in
  the same green; cardio is a small heart mark beside the figure.
- Run screen: top banner with the exercise photo and status, countdown, the
  PROGRESS block with exercise dots joined by lines, the ring that fills around
  the current dot during TRAIN and the line that fills during REST, the
  enlarging circle on the last exercise, right bar with the next exercises,
  pulsing red play/stop buttons. Same composition, new engine underneath.

## Layout

Builder (>= 1024 px) as in 2023: red left bar with logo, icon row (GitHub,
settings, now also HIIT | Gym and language), search, muscle groups with a
square-tile row each and a chevron at the right edge; centre card "Set N" with
the vertical set stepper (dots, add set, remove set), exercise rows with
TRAIN / REST pills, SET REST, and the black "+ N SET REPETITIONS -" bar at the
bottom; right column with Target muscles, Total time, Start now and the play
button. The workout name and a switcher for saved workouts sit above the set
card. The builder is the first screen after the splash.

Phone: the same blocks stacked; the catalog opens as a bottom sheet; a sticky
bottom bar holds total time and Start now.

Gym pages, settings and the splash reuse the red bar, the skewed labels and the
pills; nothing introduces a new visual device.

## Tiles

Square photos, 1.25 rem radius, full colour, hover lift as before. The name is
shown inside the tile on hover and focus over a bottom gradient; no floating
tooltip, so nothing can clip. Scrollbars are hidden; the chevron and the
partially visible next tile are the scroll affordance.

## Motion

Original: hover lift on tiles, pulsing play button, ring and enlarging circle
on the run screen. New: layout springs on add and reorder, phase colour fade.
Nothing plays without a user action except the splash reveal. Reduced motion
leaves opacity only.

## Copy

Buttons say what happens: Add set, Start now, Save routine, Log set. Errors
state cause and fix in one sentence. Everything in en and pt-BR.

## History

2026-09-03, first pass: replaced the logo, redrew icons, swapped the body map
for line art, replaced the ring with full-screen digits, added a library page
before the builder, used Big Shoulders Display and Atkinson Hyperlegible. The
maintainer rejected all of it. This plan supersedes that pass.

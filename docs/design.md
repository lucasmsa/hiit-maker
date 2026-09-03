# Design plan

Subject: a workout builder for bodyweight interval circuits and gym routines.
Audience: someone assembling a circuit on a laptop, then running it from a phone
propped on the floor two meters away. Primary job: build fast, read the timer
from a distance.

## Palette

| Token | Hex | Role |
|---|---|---|
| brand | #EE373F | the 2021 red, kept; rail, primary actions, train phase |
| brand-deep | #C8232B | pressed and hover states on red |
| brand-soft | #FDE8E9 | washes behind selected tiles and chips |
| chalk | #F4F4F1 | builder canvas |
| ink | #1B1917 | text on chalk |
| black | #000000 | run screen ground, true black for OLED phones |
| recover | #1E9E6A | rest phases and "done" states |
| warmup | #F2A93B | warm-up phase |

Rest and warm-up colors exist for phase semantics on the run screen and appear
nowhere else.

## Type

- Display: Big Shoulders Display, variable, weights 700 to 900. Every headline,
  exercise name on a tile, set title, and the timer digits. Timer digits render
  in fixed-width boxes so the countdown does not jitter.
- Body: Atkinson Hyperlegible, 400 and 700. Chosen for letterform
  distinguishability at distance (1 l I, 0 O). Base 17 px, line-height 1.5,
  measure under 70 characters.
- Scale (ratio 1.25 from 17): 13.6, 17, 21, 27, 34, 42, 53, 66, 83. Timer:
  clamp(96px, 28vw, 320px).
- Sentence case everywhere. The only capitalized words are the phase word on the
  run screen (TRAIN, REST, WARM-UP, DONE), a scoreboard convention.
- Fallbacks: display falls to Arial Narrow then sans-serif; body to system-ui.
  Fonts are self-hosted through fontsource so the PWA works offline.

## Signature device

One 12 degree skew, cut with clip-path, borrowed from the slanted labels of the
2021 design and from running-track lane markers. It appears in exactly three
places: section chips (the old "Target muscles / Total time" labels), the splash
divider between HIIT and Gym, and the leading edge of the run progress bar.
Nothing else is decorated. Tiles have a 6 px radius; buttons 8 px; there are no
drop shadows except the lifted state while dragging.

## Photos

Tiles are 4:3 photos in duotone at rest: grayscale under a brand-red multiply
layer. Hover, focus and "placed in a set" restore full color. Every tile carries
its name inside the tile, bottom-left in display type over a dark gradient; no
tooltips.

## Layout

Desktop builder (>= 1024 px), left aligned:

```
+-----------+------------------------------+-------------+
| red rail  | set editor                   | summary     |
| search    | [chip] Set 1  x3             | chip Muscles|
| group     |   tile  Push up   30s  15s   | body map    |
|  tiles >  |   tile  Plank     30s  15s   | chip Total  |
| group     |   + add exercise             |  00:11:15   |
|  tiles >  | [chip] Set 2  x3             | Start       |
+-----------+------------------------------+-------------+
```

Phone: one column. Catalog opens as a bottom sheet from an "Add exercise"
button. Summary is a sticky bottom bar with total time and Start.

Run screen: black, full bleed, digits fill the width, phase word above, exercise
name below, progress bar along the bottom edge with the skewed leading edge,
next-up tile at the bottom right on wide screens and under the name on phones.

Splash: two panels split by the skewed divider, HIIT on brand red, Gym on black,
each with one word in display type at 20 vw. Choosing a panel expands it over
the other and the header of that mode settles into place. That is the only
non-user-triggered motion in the app.

## Motion

- Adding an exercise: the tile flies from the catalog into the set (layout id).
- Reordering: layout springs, stiffness 500, damping 40.
- Phase change on the run screen: the ground color sweeps from the bottom
  edge, 400 ms, ease-out.
- Everything is disabled under prefers-reduced-motion except opacity fades.

## Copy

Buttons say what happens: "Add set", "Start workout", "Save routine", "Log set".
Empty library: "No workouts yet. Build one or open the example." Errors state the
cause and the fix in one sentence.

## Reviewed against defaults

Dropped from the first draft: a cream canvas (replaced by chalk gray so the red
reads hot rather than earthy); uniform rounded cards for sets (sets are a list
under a chip); all-caps labels in the builder (sentence case); a monospace face
for seconds (body face with tabular figures).

import { useState, type CSSProperties } from 'react';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { LaneChip } from '@/components/ui/LaneChip';
import { Dialog, BottomSheet } from '@/components/ui/Dialog';
import { ExerciseTile } from '@/components/ui/ExerciseTile';
import { Digits } from '@/components/ui/Digits';
import { PhaseBar } from '@/components/ui/PhaseBar';
import { MuscleIcon } from '@/components/ui/MuscleIcon';
import { NumberField, TextInput, Field } from '@/components/ui/Field';
import { Toggle } from '@/components/ui/Toggle';
import { Wordmark } from '@/components/ui/Wordmark';
import { SlidersIcon, PlusIcon } from '@/components/ui/icons';
import { hiitGroups } from '@/data/hiit-catalog';
import { BodyMap } from '@/components/hiit/BodyMap';

export function DevUi() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [muted, setMuted] = useState(false);
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-10 p-6">
      <section className="flex flex-col gap-3">
        <h2 className="text-5">Wordmark</h2>
        <div className="flex items-center gap-8">
          <Wordmark label="Home" className="text-brand" />
          <div className="rounded-button bg-brand p-4">
            <Wordmark label="Home" className="text-white" />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-5">Buttons</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Start workout</Button>
          <Button variant="secondary">Add set</Button>
          <Button variant="ghost">Cancel</Button>
          <Button variant="danger">Delete workout</Button>
          <Button size="lg">Start workout</Button>
          <Button disabled>Disabled</Button>
          <IconButton label="Settings">
            <SlidersIcon />
          </IconButton>
          <IconButton label="Add" tone="brand">
            <PlusIcon />
          </IconButton>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-5">Lane chips</h2>
        <div className="flex flex-wrap items-center gap-4">
          <LaneChip>Target muscles</LaneChip>
          <LaneChip tone="brand">Start now</LaneChip>
          <LaneChip tone="soft">Set 2</LaneChip>
          <LaneChip tone="outline">Outline</LaneChip>
          <LaneChip size="sm">Total time</LaneChip>
          <LaneChip size="sm" tone="brand" icon={<MuscleIcon name="core" />}>
            Core
          </LaneChip>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-5">Exercise tiles</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <ExerciseTile name="Push-up" photo="push-up" group="chest" onSelect={() => undefined} />
          <ExerciseTile name="Plank" photo="plank" group="core" placed onSelect={() => undefined} />
          <ExerciseTile name="Burpee" photo="burpee" group="cardio" />
          <ExerciseTile name="Missing photo" photo="does-not-exist" group="legs" onSelect={() => undefined} />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-5">Digits and phase bar</h2>
        <div className="flex flex-col gap-4 rounded-button bg-black p-6 text-white">
          <Digits value="00:11" />
          <Digits value="1:05:09" className="text-brand" style={{ '--digits-size': '4rem' } as CSSProperties} />
          <PhaseBar progress={0.62} color="var(--color-brand)" label="Train" />
          <PhaseBar progress={0.3} color="var(--color-recover)" label="Rest" height={8} />
          <PhaseBar progress={0.85} color="var(--color-warmup)" label="Warm-up" height={24} />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-5">Muscle icons</h2>
        <div className="flex flex-wrap gap-6 text-ink">
          {hiitGroups.map((group) => (
            <div key={group} className="flex flex-col items-center gap-2">
              <MuscleIcon name={group} size={48} />
              <MuscleIcon name={group} />
              <MuscleIcon name={group} size={16} />
              <span className="text-1">{group}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 rounded-button bg-brand p-4 text-white">
          {hiitGroups.map((group) => (
            <LaneChip key={group} size="sm" icon={<MuscleIcon name={group} size={16} />}>
              {group}
            </LaneChip>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-5">Body map</h2>
        <div className="flex flex-wrap gap-10">
          <BodyMap counts={{}} />
          <BodyMap counts={{ chest: 2, core: 1, legs: 3 }} />
          <BodyMap counts={{ back: 2, shoulders: 1, arms: 1, cardio: 2 }} />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-5">Fields</h2>
        <div className="grid max-w-md gap-4">
          <Field id="name" label="Workout name">
            <TextInput id="name" defaultValue="Tuesday circuit" />
          </Field>
          <NumberField id="train" label="Train" value={seconds} onChange={setSeconds} min={5} max={600} step={5} unit="s" />
          <Toggle id="mute" label="Sound cues" checked={!muted} onChange={(on) => setMuted(!on)} />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-5">Dialogs</h2>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setDialogOpen(true)}>
            Open dialog
          </Button>
          <Button variant="secondary" onClick={() => setSheetOpen(true)}>
            Open sheet
          </Button>
        </div>
        <Dialog id="demo" open={dialogOpen} onClose={() => setDialogOpen(false)} title="Remove this set?">
          <p className="mb-6">The three exercises inside it are removed too.</p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => setDialogOpen(false)}>
              Remove set
            </Button>
          </div>
        </Dialog>
        <BottomSheet id="sheet" open={sheetOpen} onClose={() => setSheetOpen(false)} title="Add exercise">
          <div className="grid grid-cols-2 gap-3">
            <ExerciseTile name="Squat" photo="squat" group="legs" onSelect={() => setSheetOpen(false)} />
            <ExerciseTile name="Dead bug" photo="dead-bug" group="core" onSelect={() => setSheetOpen(false)} />
          </div>
        </BottomSheet>
      </section>
    </main>
  );
}

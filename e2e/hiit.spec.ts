import { expect, test, type Locator, type Page } from '@playwright/test';

const EXAMPLE_NAME = 'Full body starter';
const EXAMPLE_ID = 'example-full-body';
const CIRCUIT_NAME = 'Tuesday circuit';

type ExpectedSet = { exercises: Array<[train: number, rest: number]>; loops: number; setRest: number };

function expectedClock(warmup: number, sets: ExpectedSet[]): string {
  let total = warmup;
  sets.forEach((set, setIndex) => {
    for (let loop = 0; loop < set.loops; loop += 1) {
      set.exercises.forEach(([train, rest], exerciseIndex) => {
        total += train;
        const lastOfSet = exerciseIndex === set.exercises.length - 1 && loop === set.loops - 1;
        if (!lastOfSet) {
          total += rest;
        }
      });
    }
    if (setIndex < sets.length - 1) {
      total += set.setRest;
    }
  });
  const minutes = String(Math.floor(total / 60)).padStart(2, '0');
  const seconds = String(total % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function tile(scope: Locator, name: string): Locator {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return scope.locator('button.tile').filter({
    has: scope.page().locator('.tile-caption', { hasText: new RegExp(`^${escaped}$`) }),
  });
}

function setRegion(page: Page, index: number): Locator {
  return page.getByRole('region', { name: `Set ${index}`, exact: true });
}

function placedRow(set: Locator, name: string): Locator {
  return set.getByRole('listitem').filter({ hasText: name });
}

function totalTime(page: Page): Locator {
  return page.getByRole('timer', { name: 'Total time' });
}

async function clockSeconds(digits: Locator): Promise<number> {
  const text = (await digits.textContent()) ?? '';
  return text
    .split(':')
    .map(Number)
    .reduce((total, part) => total * 60 + part, 0);
}

async function createWorkout(page: Page): Promise<void> {
  await page.goto('/hiit');
  await page.getByRole('button', { name: 'New workout' }).click();
  await expect(page).toHaveURL(/\/hiit\/[^/]+$/);
  await page.getByLabel('Workout name', { exact: true }).fill(CIRCUIT_NAME);
}

async function buildTuesdayCircuit(page: Page): Promise<void> {
  await createWorkout(page);
  const rail = page.getByRole('complementary', { name: 'Exercise catalog' });
  const set1 = setRegion(page, 1);

  await expect(totalTime(page)).toHaveText(expectedClock(90, []));

  await tile(rail, 'Push-up').click();
  await tile(rail, 'Plank').click();
  await expect(placedRow(set1, 'Push-up')).toBeVisible();
  await expect(placedRow(set1, 'Plank')).toBeVisible();

  await placedRow(set1, 'Push-up').getByLabel('Train').fill('20');
  await expect(placedRow(set1, 'Push-up').getByLabel('Train')).toHaveValue('20');

  await page.getByRole('button', { name: 'Add set' }).click();
  const set2 = setRegion(page, 2);
  await expect(set2).toBeVisible();
  await tile(rail, 'Burpee').click();
  await expect(placedRow(set2, 'Burpee')).toBeVisible();

  await expect(totalTime(page)).toHaveText(
    expectedClock(90, [
      { exercises: [[20, 15], [30, 15]], loops: 3, setRest: 60 },
      { exercises: [[30, 15]], loops: 3, setRest: 60 },
    ]),
  );
}

test.describe('hiit golden path on desktop', () => {
  test.skip(({ isMobile }) => isMobile === true, 'desktop layout');

  test('first visit shows the splash and HIIT opens the library', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: /^HIIT/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /^Gym/ })).toBeVisible();
    await page.getByRole('button', { name: /^HIIT/ }).click();
    await expect(page).toHaveURL(/\/hiit$/);
    await expect(page.getByRole('heading', { name: 'Workouts' })).toBeVisible();
    await expect(page.getByRole('link', { name: EXAMPLE_NAME })).toBeVisible();
  });

  test('builds a two-set workout and reports its total time', async ({ page }) => {
    await buildTuesdayCircuit(page);
    await page.goto('/hiit');
    await expect(page.getByRole('link', { name: CIRCUIT_NAME })).toBeVisible();
  });

  test('shares a workout through the link and saves it from the shared page', async ({ page, context }) => {
    await buildTuesdayCircuit(page);
    const workoutUrl = page.url();

    await page.getByRole('button', { name: 'Share link' }).click();
    await expect(page.getByRole('button', { name: 'Link copied' })).toBeVisible();
    const sharedUrl = await page.evaluate(() => navigator.clipboard.readText());
    expect(sharedUrl).toMatch(/\/hiit\/shared#.+/);
    expect(sharedUrl).not.toBe(workoutUrl);

    const shared = await context.newPage();
    await shared.goto(sharedUrl);
    await expect(shared.getByRole('heading', { name: CIRCUIT_NAME })).toBeVisible();
    await shared.getByRole('button', { name: 'Save to library' }).click();
    await expect(shared).toHaveURL(/\/hiit$/);
    await expect(shared.getByRole('link', { name: CIRCUIT_NAME })).toHaveCount(2);
  });

  test('runs the example workout on the wall clock', async ({ page }) => {
    await page.clock.install();
    await page.goto(`/hiit/${EXAMPLE_ID}/run`);

    await expect(page.getByRole('heading', { name: EXAMPLE_NAME })).toBeVisible();
    await page.getByRole('button', { name: 'Start workout' }).click();

    const remaining = page.getByRole('timer', { name: 'Remaining' });
    await expect(page.getByText('WARM-UP', { exact: true })).toBeVisible();
    await expect(remaining).toHaveText(/^\d{2}:\d{2}$/);

    await page.clock.fastForward(90_000);
    await expect(page.getByText('TRAIN', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Push-up' })).toBeVisible();

    await page.getByRole('button', { name: 'Pause' }).click();
    await expect(page.getByRole('button', { name: 'Resume' })).toBeVisible();
    const frozen = (await remaining.textContent()) ?? '';
    await page.clock.fastForward(5_000);
    await expect(remaining).toHaveText(frozen);

    await page.getByRole('button', { name: 'Resume' }).click();
    await expect(page.getByRole('button', { name: 'Pause' })).toBeVisible();

    await page.getByRole('button', { name: 'Skip' }).click();
    await expect(page.getByText('REST', { exact: true })).toBeVisible();
    await expect(page.getByText(/^Next:/)).toBeVisible();

    const beforeReload = await clockSeconds(remaining);
    await page.reload();
    await expect(page.getByText('REST', { exact: true })).toBeVisible();
    const afterReload = await clockSeconds(remaining);
    expect(afterReload).toBeLessThanOrEqual(beforeReload);
    expect(afterReload).toBeGreaterThan(0);

    await page.getByRole('button', { name: 'Stop', exact: true }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.getByRole('heading', { name: 'Stop workout?' })).toBeVisible();
    await dialog.getByRole('button', { name: 'Stop workout' }).click();
    await expect(page).toHaveURL(new RegExp(`/hiit/${EXAMPLE_ID}$`));
  });
});

test.describe('hiit builder on a phone', () => {
  test.skip(({ isMobile }) => isMobile !== true, 'phone layout');

  test('adds an exercise through the catalog sheet', async ({ page }) => {
    await createWorkout(page);
    const set1 = setRegion(page, 1);
    await set1.getByRole('button', { name: 'Add exercise' }).click();

    const sheet = page.getByRole('dialog', { name: 'Exercise catalog' });
    await expect(sheet).toBeVisible();
    await tile(sheet, 'Squat').click();
    await expect(placedRow(set1, 'Squat')).toBeVisible();

    await sheet.getByRole('button', { name: 'Close', exact: true }).click();
    await expect(sheet).toBeHidden();
    await expect(totalTime(page)).toHaveText(
      expectedClock(90, [{ exercises: [[30, 15]], loops: 3, setRest: 60 }]),
    );
  });

  test('library and builder do not scroll sideways', async ({ page }) => {
    const fitsViewport = () => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);

    await page.goto('/hiit');
    await expect(page.getByRole('heading', { name: 'Workouts' })).toBeVisible();
    expect(await fitsViewport()).toBe(true);

    await page.getByRole('button', { name: 'New workout' }).click();
    await expect(setRegion(page, 1)).toBeVisible();
    expect(await fitsViewport()).toBe(true);
  });
});

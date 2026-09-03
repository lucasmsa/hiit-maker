import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { GymLibrary } from '@/routes/gym/Library';
import { GymPlan } from '@/routes/gym/Plan';
import { GymRun } from '@/routes/gym/Run';

export function installDialogPolyfill() {
  HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
    this.setAttribute('open', '');
  };
  HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
    this.removeAttribute('open');
    this.dispatchEvent(new Event('close'));
  };
}

export function renderGymAt(path: string) {
  const router = createMemoryRouter(
    [
      { path: '/gym', element: <GymLibrary /> },
      { path: '/gym/:id', element: <GymPlan /> },
      { path: '/gym/:id/run', element: <GymRun /> },
    ],
    { initialEntries: [path] },
  );
  const view = render(<RouterProvider router={router} />);
  return { ...view, router };
}

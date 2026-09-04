import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { AppShell } from '@/components/shell/AppShell';
import { HiitBuilder } from '@/routes/hiit/Builder';
import { HiitShared } from '@/routes/hiit/Shared';

export function renderHiitRoute(initialEntry: string) {
  const router = createMemoryRouter(
    [
      {
        element: <AppShell />,
        children: [{ path: '/shared', element: <HiitShared /> }],
      },
      { path: '/', element: <HiitBuilder /> },
      { path: '/w/:id', element: <HiitBuilder /> },
      { path: '/w/:id/run', element: <div>run</div> },
    ],
    { initialEntries: [initialEntry] },
  );
  return { router, ...render(<RouterProvider router={router} />) };
}

export function installDialogPolyfill() {
  const prototype = HTMLDialogElement.prototype;
  if (typeof prototype.showModal !== 'function') {
    prototype.showModal = function showModal(this: HTMLDialogElement) {
      this.setAttribute('open', '');
    };
  }
  if (typeof prototype.close !== 'function') {
    prototype.close = function close(this: HTMLDialogElement) {
      this.removeAttribute('open');
    };
  }
}

import { RouterProvider } from 'react-router';
import { router } from '@/app/router';

export function App() {
  return <RouterProvider router={router} />;
}

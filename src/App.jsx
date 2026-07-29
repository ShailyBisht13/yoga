import { RouterProvider } from 'react-router-dom';
import { AppProvider } from '@/context';
import { useLenis } from '@/hooks';
import { router } from '@/router';

function AppProviders({ children }) {
  useLenis();
  return <AppProvider value={{}}>{children}</AppProvider>;
}

export default function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}

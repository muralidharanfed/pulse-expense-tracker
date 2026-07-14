import { RouterProvider } from 'react-router-dom';
import { SettingsProvider } from '@/context/SettingsContext';
import { AppDataProvider } from '@/context/AppDataContext';
import { ToastProvider } from '@/context/ToastContext';
import { TransactionModalProvider } from '@/context/TransactionModalContext';
import { router } from '@/routes/AppRoutes';

function Providers({ children }) {
  return (
    <SettingsProvider>
      <AppDataProvider>
        <ToastProvider>
          <TransactionModalProvider>{children}</TransactionModalProvider>
        </ToastProvider>
      </AppDataProvider>
    </SettingsProvider>
  );
}

export default function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}

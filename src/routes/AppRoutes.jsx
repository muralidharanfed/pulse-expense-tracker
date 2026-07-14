import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import Dashboard from '@/pages/Dashboard';
import Transactions from '@/pages/Transactions';
import Analytics from '@/pages/Analytics';
import Budget from '@/pages/Budget';
import Achievements from '@/pages/Achievements';
import Settings from '@/pages/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'transactions', element: <Transactions /> },
      { path: 'analytics', element: <Analytics /> },
      { path: 'budget', element: <Budget /> },
      { path: 'achievements', element: <Achievements /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
]);

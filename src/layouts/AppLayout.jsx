import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/layout/Sidebar';
import MobileNav from '@/components/layout/MobileNav';
import Topbar from '@/components/layout/Topbar';
import FloatingAddButton from '@/components/common/FloatingAddButton';
import { useTransactionModal } from '@/context/TransactionModalContext';

export default function AppLayout() {
  const location = useLocation();
  const { openAdd } = useTransactionModal();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 min-w-0 pb-24 lg:pb-10">
        <Topbar />
        <main className="px-5 sm:px-8 py-4">
          <AnimatePresence mode="wait">
            <div key={location.pathname}>
              <Outlet />
            </div>
          </AnimatePresence>
        </main>
      </div>
      <MobileNav />
      <FloatingAddButton onClick={openAdd} />
    </div>
  );
}

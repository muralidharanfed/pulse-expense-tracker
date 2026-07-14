import { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Receipt } from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import FilterBar from '@/components/transaction/FilterBar';
import TransactionCard from '@/components/transaction/TransactionCard';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { useAppData } from '@/context/AppDataContext';
import { useTransactionModal } from '@/context/TransactionModalContext';
import { useToast } from '@/context/ToastContext';
import { getCategoryMeta } from '@/utils/constants';

export default function Transactions() {
  const { transactions, deleteTransaction } = useAppData();
  const { openEdit } = useTransactionModal();
  const { showToast } = useToast();
  const [filters, setFilters] = useState({ search: '', category: 'all', type: 'all', sort: 'desc' });
  const [pendingDelete, setPendingDelete] = useState(null);

  const filtered = useMemo(() => {
    let list = [...transactions];
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      list = list.filter((t) => {
        const meta = getCategoryMeta(t.category);
        return t.note?.toLowerCase().includes(q) || meta.label.toLowerCase().includes(q);
      });
    }
    if (filters.category !== 'all') list = list.filter((t) => t.category === filters.category);
    if (filters.type !== 'all') list = list.filter((t) => t.type === filters.type);
    list.sort((a, b) => (filters.sort === 'desc' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)));
    return list;
  }, [transactions, filters]);

  const confirmDelete = () => {
    deleteTransaction(pendingDelete);
    showToast('Transaction deleted.', 'info');
    setPendingDelete(null);
  };

  return (
    <PageTransition>
      <div className="flex flex-col gap-5 pb-10">
        <FilterBar filters={filters} setFilters={setFilters} />

        <Card className="p-4 sm:p-5">
          {filtered.length === 0 ? (
            <EmptyState
              icon={Receipt}
              title={transactions.length === 0 ? 'No transactions yet' : 'No matches found'}
              description={
                transactions.length === 0
                  ? 'Add your first transaction using the + button.'
                  : 'Try adjusting your search or filters.'
              }
            />
          ) : (
            <div className="flex flex-col gap-2.5">
              <AnimatePresence initial={false}>
                {filtered.map((t) => (
                  <TransactionCard key={t.id} transaction={t} onEdit={openEdit} onDelete={setPendingDelete} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </Card>
      </div>

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete transaction?"
        description="This action can't be undone. The transaction will be permanently removed."
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </PageTransition>
  );
}

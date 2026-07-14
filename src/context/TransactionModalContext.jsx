import { createContext, useContext, useState, useCallback } from 'react';
import Modal from '@/components/ui/Modal';
import TransactionForm from '@/components/transaction/TransactionForm';
import { useAppData } from '@/context/AppDataContext';
import { useToast } from '@/context/ToastContext';

const TransactionModalContext = createContext(null);

export function TransactionModalProvider({ children }) {
  const [state, setState] = useState({ open: false, editing: null });
  const { addTransaction, updateTransaction } = useAppData();
  const { showToast } = useToast();

  const openAdd = useCallback(() => setState({ open: true, editing: null }), []);
  const openEdit = useCallback((tx) => setState({ open: true, editing: tx }), []);
  const close = useCallback(() => setState({ open: false, editing: null }), []);

  const handleSubmit = (data) => {
    if (state.editing) {
      updateTransaction(state.editing.id, data);
      showToast('Transaction updated.', 'success');
    } else {
      addTransaction(data);
      showToast(data.type === 'income' ? 'Income added.' : 'Expense added.', 'success');
    }
    close();
  };

  return (
    <TransactionModalContext.Provider value={{ openAdd, openEdit }}>
      {children}
      <Modal open={state.open} onClose={close} title={state.editing ? 'Edit Transaction' : 'Add Transaction'}>
        <TransactionForm
          key={state.editing?.id || 'new'}
          defaultValues={state.editing || undefined}
          onSubmit={handleSubmit}
          onCancel={close}
        />
      </Modal>
    </TransactionModalContext.Provider>
  );
}

export function useTransactionModal() {
  const ctx = useContext(TransactionModalContext);
  if (!ctx) throw new Error('useTransactionModal must be used within TransactionModalProvider');
  return ctx;
}

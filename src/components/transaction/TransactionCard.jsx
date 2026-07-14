import { motion } from 'framer-motion';
import { Pencil, Trash2 } from 'lucide-react';
import { getCategoryMeta } from '@/utils/constants';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { useSettings } from '@/context/SettingsContext';

export default function TransactionCard({ transaction, onEdit, onDelete }) {
  const { currencySymbol } = useSettings();
  const meta = getCategoryMeta(transaction.category);
  const Icon = meta.icon;
  const isIncome = transaction.type === 'income';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
      className="glass rounded-2xl p-4 flex items-center gap-3 group"
    >
      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${meta.color}20` }}>
        <Icon size={18} style={{ color: meta.color }} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-primary truncate">{transaction.note || meta.label}</p>
        <p className="text-xs text-muted">
          {meta.label} · {formatDate(transaction.date)}
        </p>
      </div>
      <span className={`font-mono text-sm font-semibold shrink-0 ${isIncome ? 'text-[#2dd4a7]' : 'text-primary'}`}>
        {isIncome ? '+' : '-'}
        {formatCurrency(transaction.amount, currencySymbol).replace('-', '')}
      </span>
      <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(transaction)}
          aria-label="Edit transaction"
          className="p-1.5 rounded-lg text-secondary hover:text-primary hover:bg-white/5"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={() => onDelete(transaction.id)}
          aria-label="Delete transaction"
          className="p-1.5 rounded-lg text-secondary hover:text-[#ff6b6b] hover:bg-[#ff6b6b]/10"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </motion.div>
  );
}

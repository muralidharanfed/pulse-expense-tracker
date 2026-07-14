import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import { Receipt } from 'lucide-react';
import { getCategoryMeta } from '@/utils/constants';
import { formatCurrency, formatDateShort } from '@/utils/formatters';
import { useSettings } from '@/context/SettingsContext';
import { Link } from 'react-router-dom';

export default function RecentTransactionsCard({ transactions, delay = 0 }) {
  const { currencySymbol } = useSettings();

  return (
    <Card delay={delay} className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-primary">Recent Transactions</h3>
        <Link to="/transactions" className="text-xs accent font-medium hover:underline">
          View all
        </Link>
      </div>

      {transactions.length === 0 ? (
        <EmptyState
          icon={Receipt}
          title="No transactions yet"
          description="Tap the + button to log your first expense or income."
        />
      ) : (
        <ul className="flex flex-col gap-1">
          {transactions.map((t) => {
            const meta = getCategoryMeta(t.category);
            const Icon = meta.icon;
            const isIncome = t.type === 'income';
            return (
              <li key={t.id} className="flex items-center gap-3 py-2.5 border-b border-[rgb(var(--border-soft)/var(--border-alpha))] last:border-0">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${meta.color}20` }}>
                  <Icon size={16} style={{ color: meta.color }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-primary truncate">{t.note || meta.label}</p>
                  <p className="text-xs text-muted">{formatDateShort(t.date)}</p>
                </div>
                <span className={`font-mono text-sm font-medium ${isIncome ? 'text-[#2dd4a7]' : 'text-primary'}`}>
                  {isIncome ? '+' : '-'}
                  {formatCurrency(t.amount, currencySymbol).replace('-', '')}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}

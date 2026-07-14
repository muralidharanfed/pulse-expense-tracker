import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Card from '@/components/ui/Card';
import { formatCurrency } from '@/utils/formatters';
import { useSettings } from '@/context/SettingsContext';
import { useAppData } from '@/context/AppDataContext';
import { getMonthSummary } from '@/utils/analytics';

export default function MonthComparisonCard({ delay = 0 }) {
  const { transactions } = useAppData();
  const { currencySymbol } = useSettings();

  const now = new Date();
  const prevMonthRef = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const current = getMonthSummary(transactions, now);
  const previous = getMonthSummary(transactions, prevMonthRef);

  const diff = current.totalExpense - previous.totalExpense;
  const pctChange = previous.totalExpense > 0 ? (diff / previous.totalExpense) * 100 : current.totalExpense > 0 ? 100 : 0;

  const Icon = diff > 0 ? TrendingUp : diff < 0 ? TrendingDown : Minus;
  const color = diff > 0 ? '#ff6b6b' : diff < 0 ? '#2dd4a7' : 'var(--text-muted)';

  return (
    <Card delay={delay} className="p-5">
      <h3 className="font-display font-semibold text-primary mb-4">Monthly Comparison</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted mb-1">This Month</p>
          <p className="font-mono text-lg text-primary">{formatCurrency(current.totalExpense, currencySymbol)}</p>
        </div>
        <div>
          <p className="text-xs text-muted mb-1">Last Month</p>
          <p className="font-mono text-lg text-secondary">{formatCurrency(previous.totalExpense, currencySymbol)}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ backgroundColor: `${color}15` }}>
        <Icon size={15} style={{ color }} />
        <span className="text-sm font-medium" style={{ color }}>
          {Math.abs(pctChange).toFixed(0)}% {diff > 0 ? 'more' : diff < 0 ? 'less' : 'change'} than last month
        </span>
      </div>
    </Card>
  );
}

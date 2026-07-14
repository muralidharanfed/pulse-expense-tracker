import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import { formatCurrency } from '@/utils/formatters';
import { useSettings } from '@/context/SettingsContext';
import { Link } from 'react-router-dom';

export default function BudgetProgressCard({ spent, limit, delay = 0 }) {
  const { currencySymbol } = useSettings();
  const pct = limit > 0 ? (spent / limit) * 100 : 0;
  const status = pct >= 100 ? 'danger' : pct >= 80 ? 'warning' : 'safe';
  const statusText = { danger: 'Limit exceeded', warning: 'Approaching limit', safe: 'On track' }[status];
  const statusColor = { danger: 'text-[#ff6b6b]', warning: 'text-[#f5b942]', safe: 'text-[#2dd4a7]' }[status];

  return (
    <Card delay={delay} className="p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-semibold text-primary">Monthly Budget</h3>
        <Link to="/budget" className="text-xs accent font-medium hover:underline">
          Manage
        </Link>
      </div>
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-mono text-lg text-primary">{formatCurrency(spent, currencySymbol)}</span>
        <span className="text-sm text-muted">of {formatCurrency(limit, currencySymbol)}</span>
      </div>
      <ProgressBar percent={pct} status={status} />
      <p className={`text-xs mt-2 font-medium ${statusColor}`}>{statusText} · {Math.min(pct, 999).toFixed(0)}% used</p>
    </Card>
  );
}

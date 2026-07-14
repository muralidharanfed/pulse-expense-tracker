import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import { formatCurrency } from '@/utils/formatters';
import { useSettings } from '@/context/SettingsContext';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

export default function BudgetStatusHero({ spent, limit, delay = 0 }) {
  const { currencySymbol } = useSettings();
  const pct = limit > 0 ? (spent / limit) * 100 : 0;
  const remaining = limit - spent;
  const status = pct >= 100 ? 'danger' : pct >= 80 ? 'warning' : 'safe';

  const config = {
    safe: { label: 'Safe', color: '#2dd4a7', icon: CheckCircle2, message: "You're well within budget this month." },
    warning: { label: 'Warning', color: '#f5b942', icon: AlertTriangle, message: "You're approaching your monthly limit." },
    danger: { label: 'Limit Exceeded', color: '#ff6b6b', icon: XCircle, message: "You've gone over your monthly budget." },
  }[status];

  const Icon = config.icon;

  return (
    <Card delay={delay} className="p-6 sm:p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-xs text-muted uppercase tracking-wide mb-1">Budget Status</p>
          <div className="flex items-center gap-2">
            <Icon size={18} style={{ color: config.color }} />
            <span className="font-display text-lg font-semibold" style={{ color: config.color }}>
              {config.label}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted mb-1">{remaining >= 0 ? 'Remaining' : 'Over by'}</p>
          <p className="font-mono text-xl font-semibold text-primary">
            {formatCurrency(Math.abs(remaining), currencySymbol)}
          </p>
        </div>
      </div>

      <ProgressBar percent={pct} status={status} height={14} />

      <div className="flex items-center justify-between mt-2 text-xs text-muted">
        <span>{formatCurrency(spent, currencySymbol)} spent</span>
        <span>{formatCurrency(limit, currencySymbol)} limit</span>
      </div>

      <p className="text-sm text-secondary mt-5">{config.message}</p>
    </Card>
  );
}

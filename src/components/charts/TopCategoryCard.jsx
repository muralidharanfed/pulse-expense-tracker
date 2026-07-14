import Card from '@/components/ui/Card';
import { formatCurrency } from '@/utils/formatters';
import { useSettings } from '@/context/SettingsContext';
import { Crown } from 'lucide-react';

export default function TopCategoryCard({ category, delay = 0 }) {
  const { currencySymbol } = useSettings();

  if (!category) {
    return (
      <Card delay={delay} className="p-5 flex flex-col items-center justify-center text-center min-h-[140px]">
        <p className="text-sm text-secondary">No spending recorded yet this month.</p>
      </Card>
    );
  }

  const Icon = category.icon;

  return (
    <Card delay={delay} className="p-5 flex items-center gap-4">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 relative" style={{ backgroundColor: `${category.color}20` }}>
        <Crown size={14} className="absolute -top-1.5 -right-1.5 text-[#f5b942]" fill="#f5b942" />
        {Icon && <Icon size={22} style={{ color: category.color }} />}
      </div>
      <div>
        <p className="text-xs text-muted uppercase tracking-wide mb-0.5">Top Spending Category</p>
        <p className="font-display font-semibold text-primary">{category.label}</p>
        <p className="font-mono text-sm text-secondary">{formatCurrency(category.value, currencySymbol)}</p>
      </div>
    </Card>
  );
}

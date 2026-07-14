import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import { formatCurrency } from '@/utils/formatters';
import { useSettings } from '@/context/SettingsContext';

export default function CategoryBudgetList({ categoryTotals, monthlyLimit, delay = 0 }) {
  const { currencySymbol } = useSettings();
  const total = categoryTotals.reduce((acc, c) => acc + c.value, 0) || 1;

  return (
    <Card delay={delay} className="p-5">
      <h3 className="font-display font-semibold text-primary mb-4">Where Your Budget Goes</h3>
      {categoryTotals.length === 0 ? (
        <p className="text-sm text-secondary">No expenses logged yet this month.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {categoryTotals.slice(0, 6).map((c) => {
            const shareOfBudget = monthlyLimit > 0 ? (c.value / monthlyLimit) * 100 : (c.value / total) * 100;
            return (
              <div key={c.category}>
                <div className="flex items-center justify-between mb-1.5 text-sm">
                  <span className="text-secondary">{c.label}</span>
                  <span className="font-mono text-primary">{formatCurrency(c.value, currencySymbol)}</span>
                </div>
                <ProgressBar percent={shareOfBudget} status={shareOfBudget >= 40 ? 'warning' : 'safe'} height={6} />
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

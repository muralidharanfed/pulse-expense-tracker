import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useSettings } from '@/context/SettingsContext';
import { useAppData } from '@/context/AppDataContext';
import { useToast } from '@/context/ToastContext';

export default function BudgetForm({ delay = 0 }) {
  const { budget, updateBudget } = useAppData();
  const { currencySymbol } = useSettings();
  const { showToast } = useToast();
  const [value, setValue] = useState(budget.monthlyLimit || '');

  const save = (e) => {
    e.preventDefault();
    const parsed = parseFloat(value);
    if (!parsed || parsed <= 0) return;
    updateBudget({ monthlyLimit: parsed });
    showToast('Budget updated.', 'success');
  };

  return (
    <Card delay={delay} className="p-5">
      <h3 className="font-display font-semibold text-primary mb-4">Set Monthly Budget</h3>
      <form onSubmit={save} className="flex gap-3">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary font-mono">{currencySymbol}</span>
          <input
            type="number"
            step="0.01"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-black/10 border border-[rgb(var(--border-soft)/var(--border-alpha))] rounded-xl pl-9 pr-4 py-3 font-mono text-lg text-primary outline-none focus:border-accent/50 transition-colors"
            placeholder="2000.00"
          />
        </div>
        <Button type="submit">Save</Button>
      </form>
    </Card>
  );
}

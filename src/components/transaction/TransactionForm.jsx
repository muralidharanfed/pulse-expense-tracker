import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/utils/constants';
import Button from '@/components/ui/Button';

const todayStr = () => new Date().toISOString().slice(0, 10);

export default function TransactionForm({ defaultValues, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: defaultValues || {
      type: 'expense',
      amount: '',
      category: EXPENSE_CATEGORIES[0].id,
      note: '',
      date: todayStr(),
    },
  });

  const type = watch('type');
  const categories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  useEffect(() => {
    // Reset category selection to a valid one whenever type flips
    if (!categories.find((c) => c.id === watch('category'))) {
      setValue('category', categories[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const submit = (data) => {
    onSubmit({ ...data, amount: parseFloat(data.amount) });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-5">
      {/* Type toggle */}
      <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-black/10">
        {['expense', 'income'].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setValue('type', t)}
            className={`relative py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              type === t ? 'text-[#06120f]' : 'text-secondary'
            }`}
          >
            {type === t && (
              <motion.div layoutId="type-pill" className="absolute inset-0 bg-accent rounded-lg" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
            )}
            <span className="relative z-10">{t}</span>
          </button>
        ))}
      </div>

      {/* Amount */}
      <div>
        <label className="text-xs font-medium text-secondary mb-1.5 block">Amount</label>
        <input
          type="number"
          step="0.01"
          placeholder="0.00"
          className="w-full bg-black/10 border border-[rgb(var(--border-soft)/var(--border-alpha))] rounded-xl px-4 py-3 font-mono text-lg text-primary outline-none focus:border-accent/50 transition-colors"
          {...register('amount', { required: true, min: 0.01 })}
        />
        {errors.amount && <p className="text-xs text-[#ff6b6b] mt-1">Enter a valid amount greater than 0.</p>}
      </div>

      {/* Category grid */}
      <div>
        <label className="text-xs font-medium text-secondary mb-1.5 block">Category</label>
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <div className="grid grid-cols-4 gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const active = field.value === cat.id;
                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => field.onChange(cat.id)}
                    className={`flex flex-col items-center gap-1 py-2.5 rounded-xl border transition-colors ${
                      active ? 'border-accent/60 bg-accent/10' : 'border-transparent bg-black/10 hover:bg-black/15'
                    }`}
                  >
                    <Icon size={16} style={{ color: active ? cat.color : undefined }} className={active ? '' : 'text-secondary'} />
                    <span className="text-[9px] leading-tight text-center text-secondary px-0.5">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        />
      </div>

      {/* Date */}
      <div>
        <label className="text-xs font-medium text-secondary mb-1.5 block">Date</label>
        <input
          type="date"
          className="w-full bg-black/10 border border-[rgb(var(--border-soft)/var(--border-alpha))] rounded-xl px-4 py-2.5 text-sm text-primary outline-none focus:border-accent/50 transition-colors"
          {...register('date', { required: true })}
        />
      </div>

      {/* Note */}
      <div>
        <label className="text-xs font-medium text-secondary mb-1.5 block">Note (optional)</label>
        <input
          type="text"
          placeholder="e.g. Groceries at Trader Joe's"
          className="w-full bg-black/10 border border-[rgb(var(--border-soft)/var(--border-alpha))] rounded-xl px-4 py-2.5 text-sm text-primary outline-none focus:border-accent/50 transition-colors"
          {...register('note')}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" className="flex-1" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" className="flex-1">
          {defaultValues ? 'Save Changes' : 'Add Transaction'}
        </Button>
      </div>
    </form>
  );
}

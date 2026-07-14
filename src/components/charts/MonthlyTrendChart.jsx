import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import Card from '@/components/ui/Card';
import { useSettings } from '@/context/SettingsContext';
import { formatCompact } from '@/utils/formatters';

function ChartTooltip({ active, payload, label, currencySymbol }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-solid rounded-xl px-3 py-2 text-xs">
      <p className="text-secondary mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }} className="font-mono">
          {p.name}: {formatCompact(p.value, currencySymbol)}
        </p>
      ))}
    </div>
  );
}

export default function MonthlyTrendChart({ data, delay = 0, title = 'Monthly Overview', height = 260 }) {
  const { currencySymbol } = useSettings();

  return (
    <Card delay={delay} className="p-5">
      <h3 className="font-display font-semibold text-primary mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2dd4a7" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#2dd4a7" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff6b6b" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#ff6b6b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--surface-alt))" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} width={40} tickFormatter={(v) => formatCompact(v, currencySymbol)} />
          <Tooltip content={<ChartTooltip currencySymbol={currencySymbol} />} />
          <Area type="monotone" dataKey="income" name="Income" stroke="#2dd4a7" strokeWidth={2.5} fill="url(#incomeGrad)" />
          <Area type="monotone" dataKey="expense" name="Expense" stroke="#ff6b6b" strokeWidth={2.5} fill="url(#expenseGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}

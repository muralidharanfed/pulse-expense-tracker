import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import Card from '@/components/ui/Card';
import { useSettings } from '@/context/SettingsContext';
import { formatCurrency, formatCompact } from '@/utils/formatters';

function ChartTooltip({ active, payload, label, currencySymbol }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-solid rounded-xl px-3 py-2 text-xs">
      <p className="text-secondary mb-1">{label}</p>
      <p className="font-mono text-[#a685ff]">{formatCurrency(payload[0].value, currencySymbol)}</p>
    </div>
  );
}

export default function WeeklyBarChart({ data, delay = 0, title = 'This Week' }) {
  const { currencySymbol } = useSettings();
  const maxVal = Math.max(...data.map((d) => d.expense), 1);

  return (
    <Card delay={delay} className="p-5">
      <h3 className="font-display font-semibold text-primary mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -18, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--surface-alt))" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} width={40} tickFormatter={(v) => formatCompact(v, currencySymbol)} />
          <Tooltip content={<ChartTooltip currencySymbol={currencySymbol} />} cursor={{ fill: 'rgb(var(--surface-alt))' }} />
          <Bar dataKey="expense" radius={[6, 6, 6, 6]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.expense === maxVal && maxVal > 0 ? '#a685ff' : 'rgb(var(--accent-soft) / 0.5)'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

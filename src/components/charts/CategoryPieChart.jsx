import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import { PieChart as PieIcon } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { formatCurrency } from '@/utils/formatters';

function ChartTooltip({ active, payload, currencySymbol }) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="glass-solid rounded-xl px-3 py-2 text-xs">
      <p className="text-secondary">{item.name}</p>
      <p className="font-mono font-medium" style={{ color: item.payload.color }}>
        {formatCurrency(item.value, currencySymbol)}
      </p>
    </div>
  );
}

export default function CategoryPieChart({ data, delay = 0, title = 'Spending by Category' }) {
  const { currencySymbol } = useSettings();

  return (
    <Card delay={delay} className="p-5">
      <h3 className="font-display font-semibold text-primary mb-2">{title}</h3>
      {data.length === 0 ? (
        <EmptyState icon={PieIcon} title="Nothing to show yet" description="Categorized expenses will appear here as a breakdown." />
      ) : (
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <ResponsiveContainer width="100%" height={220} className="max-w-[220px]">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="label" innerRadius={55} outerRadius={85} paddingAngle={3} strokeWidth={0}>
                {data.map((entry) => (
                  <Cell key={entry.category} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip currencySymbol={currencySymbol} />} />
            </PieChart>
          </ResponsiveContainer>
          <ul className="flex-1 w-full flex flex-col gap-2">
            {data.slice(0, 6).map((entry) => (
              <li key={entry.category} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-secondary">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                  {entry.label}
                </span>
                <span className="font-mono text-primary">{formatCurrency(entry.value, currencySymbol)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}

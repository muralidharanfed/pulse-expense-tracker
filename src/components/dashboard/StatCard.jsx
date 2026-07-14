import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { formatCurrency } from '@/utils/formatters';
import { useSettings } from '@/context/SettingsContext';

export default function StatCard({ label, amount, icon: Icon, tone = 'default', delay = 0, sub }) {
  const { currencySymbol } = useSettings();

  const toneStyles = {
    default: 'accent bg-accent/12',
    positive: 'text-[#2dd4a7] bg-[#2dd4a7]/12',
    negative: 'text-[#ff6b6b] bg-[#ff6b6b]/12',
  };

  return (
    <Card delay={delay} hover className="p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-secondary uppercase tracking-wide">{label}</span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${toneStyles[tone]}`}>
          <Icon size={15} />
        </div>
      </div>
      <motion.p
        className="font-mono text-2xl sm:text-[1.7rem] font-semibold text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.15 }}
      >
        {formatCurrency(amount, currencySymbol)}
      </motion.p>
      {sub && <p className="text-xs text-muted -mt-2">{sub}</p>}
    </Card>
  );
}

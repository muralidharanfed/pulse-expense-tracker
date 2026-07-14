import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function InsightsCard({ insights, delay = 0 }) {
  return (
    <Card delay={delay} className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={16} className="accent" />
        <h3 className="font-display font-semibold text-primary">Smart Insights</h3>
      </div>
      {insights.length === 0 ? (
        <p className="text-sm text-secondary">Add a few transactions to unlock personalized insights.</p>
      ) : (
        <ul className="flex flex-col gap-2.5">
          {insights.map((text, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.1 * i }}
              className="flex items-start gap-2.5 text-sm text-secondary"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
              {text}
            </motion.li>
          ))}
        </ul>
      )}
    </Card>
  );
}

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';

const LABEL_COLORS = {
  Excellent: '#2dd4a7',
  Good: '#4f8cff',
  Average: '#f5b942',
  Poor: '#ff6b6b',
};

export default function HealthScoreOrb({ score, label, delay = 0 }) {
  const color = LABEL_COLORS[label] || '#2dd4a7';
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <Card delay={delay} className="p-6 flex flex-col items-center text-center relative overflow-hidden">
      <div className="absolute top-4 left-5 text-left">
        <p className="text-xs font-medium text-secondary uppercase tracking-wide">Financial Health</p>
      </div>

      <div className="relative w-[180px] h-[180px] mt-8 flex items-center justify-center">
        {/* Ambient pulse rings, echoing the app's heartbeat motif */}
        <span
          className="absolute inset-6 rounded-full pulse-ring"
          style={{ border: `2px solid ${color}` }}
        />
        <span
          className="absolute inset-6 rounded-full pulse-ring"
          style={{ border: `2px solid ${color}`, animationDelay: '1.2s' }}
        />

        <svg width="180" height="180" viewBox="0 0 180 180" className="-rotate-90">
          <circle cx="90" cy="90" r={radius} fill="none" stroke="rgb(var(--surface-alt))" strokeWidth="10" />
          <motion.circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>

        <div className="absolute flex flex-col items-center">
          <motion.span
            className="font-mono text-4xl font-bold text-primary"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.5 }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-muted">/ 100</span>
        </div>
      </div>

      <span
        className="mt-5 px-3 py-1 rounded-full text-xs font-semibold"
        style={{ color, backgroundColor: `${color}1F` }}
      >
        {label}
      </span>

      {/* Heartbeat line flourish */}
      <svg viewBox="0 0 200 40" className="w-full h-8 mt-4 opacity-70">
        <motion.path
          d="M0 20 H60 L70 5 L82 35 L92 20 H140 L150 10 L160 30 L170 20 H200"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: delay + 0.6, ease: 'easeInOut' }}
        />
      </svg>
    </Card>
  );
}

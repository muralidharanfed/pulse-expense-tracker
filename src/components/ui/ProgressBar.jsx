import { motion } from 'framer-motion';
import clsx from 'clsx';

/** status: 'safe' | 'warning' | 'danger' — controls the fill color */
export default function ProgressBar({ percent, status = 'safe', height = 10, className }) {
  const clamped = Math.max(0, Math.min(100, percent));
  const colors = {
    safe: 'bg-[#2dd4a7]',
    warning: 'bg-[#f5b942]',
    danger: 'bg-[#ff6b6b]',
  };

  return (
    <div
      className={clsx('w-full rounded-full overflow-hidden bg-black/10 dark:bg-white/5', className)}
      style={{ height }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={clsx('h-full rounded-full', colors[status])}
      />
    </div>
  );
}

import { motion } from 'framer-motion';
import clsx from 'clsx';

/**
 * Glassmorphic surface used throughout the app.
 * `as="button"` etc. can be passed via `motionProps` for interactive cards.
 */
export default function Card({ children, className, hover = false, delay = 0, ...rest }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={clsx(
        'glass rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]',
        hover && 'cursor-pointer transition-shadow hover:shadow-[0_12px_40px_rgb(0,0,0,0.2)]',
        className
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

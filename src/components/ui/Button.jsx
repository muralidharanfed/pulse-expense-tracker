import { motion } from 'framer-motion';
import clsx from 'clsx';

const VARIANTS = {
  primary: 'bg-accent text-[#06120f] font-semibold shadow-[0_8px_24px_rgb(var(--accent-soft)/0.35)]',
  secondary: 'glass text-primary hover:border-accent/40',
  ghost: 'bg-transparent text-secondary hover:text-primary',
  danger: 'bg-[#ff6b6b]/15 text-[#ff6b6b] hover:bg-[#ff6b6b]/25 border border-[#ff6b6b]/30',
};

const SIZES = {
  sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
  md: 'text-sm px-4 py-2.5 rounded-xl gap-2',
  lg: 'text-base px-6 py-3.5 rounded-2xl gap-2.5',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  icon: Icon,
  type = 'button',
  ...rest
}) {
  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.15 }}
      className={clsx(
        'inline-flex items-center justify-center font-medium transition-colors duration-200',
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...rest}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : 16} />}
      {children}
    </motion.button>
  );
}

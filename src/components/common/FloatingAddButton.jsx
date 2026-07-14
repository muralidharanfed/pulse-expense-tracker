import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export default function FloatingAddButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      aria-label="Add expense"
      className="fixed z-40 bottom-20 lg:bottom-8 right-5 sm:right-8 w-14 h-14 rounded-full bg-accent text-[#06120f] shadow-[0_10px_30px_rgb(var(--accent-soft)/0.5)] flex items-center justify-center"
    >
      <Plus size={26} strokeWidth={2.5} />
    </motion.button>
  );
}

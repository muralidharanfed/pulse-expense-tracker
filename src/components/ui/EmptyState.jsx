import { motion } from 'framer-motion';

export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center py-14 px-6"
    >
      {Icon && (
        <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center mb-4 animate-float">
          <Icon size={24} className="accent" />
        </div>
      )}
      <h4 className="font-display font-semibold text-primary mb-1">{title}</h4>
      <p className="text-sm text-secondary max-w-xs mb-4">{description}</p>
      {action}
    </motion.div>
  );
}

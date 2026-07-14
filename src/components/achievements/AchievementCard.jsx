import { motion } from 'framer-motion';
import { Trophy, Lock } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function AchievementCard({ achievement, unlocked, delay = 0 }) {
  return (
    <Card delay={delay} hover className="p-5 flex flex-col items-center text-center relative overflow-hidden">
      {unlocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent pointer-events-none"
        />
      )}
      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 relative z-10 ${
          unlocked ? 'bg-accent/15' : 'bg-black/10'
        }`}
      >
        {unlocked ? <Trophy size={26} className="accent" /> : <Lock size={20} className="text-muted" />}
      </div>
      <h4 className={`font-display font-semibold mb-1 relative z-10 ${unlocked ? 'text-primary' : 'text-secondary'}`}>
        {achievement.title}
      </h4>
      <p className="text-xs text-muted relative z-10">{achievement.description}</p>
      {unlocked && (
        <span className="mt-3 text-[10px] font-semibold accent uppercase tracking-wider relative z-10">Unlocked</span>
      )}
    </Card>
  );
}

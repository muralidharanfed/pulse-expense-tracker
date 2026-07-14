import PageTransition from '@/components/layout/PageTransition';
import AchievementCard from '@/components/achievements/AchievementCard';
import Card from '@/components/ui/Card';
import { ACHIEVEMENT_DEFS } from '@/utils/constants';
import { useAppData } from '@/context/AppDataContext';

export default function Achievements() {
  const { unlockedAchievements } = useAppData();
  const unlockedCount = unlockedAchievements.length;

  return (
    <PageTransition>
      <div className="flex flex-col gap-5 pb-10">
        <Card className="p-5 flex items-center justify-between">
          <div>
            <h3 className="font-display font-semibold text-primary">Your Progress</h3>
            <p className="text-sm text-secondary">
              {unlockedCount} of {ACHIEVEMENT_DEFS.length} achievements unlocked
            </p>
          </div>
          <div className="font-mono text-2xl font-bold accent">
            {Math.round((unlockedCount / ACHIEVEMENT_DEFS.length) * 100)}%
          </div>
        </Card>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {ACHIEVEMENT_DEFS.map((a, i) => (
            <AchievementCard
              key={a.id}
              achievement={a}
              unlocked={unlockedAchievements.includes(a.id)}
              delay={0.05 * i}
            />
          ))}
        </div>
      </div>
    </PageTransition>
  );
}

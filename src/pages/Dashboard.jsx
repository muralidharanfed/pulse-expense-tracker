import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/layout/PageTransition';
import StatCard from '@/components/dashboard/StatCard';
import HealthScoreOrb from '@/components/dashboard/HealthScoreOrb';
import RecentTransactionsCard from '@/components/dashboard/RecentTransactionsCard';
import BudgetProgressCard from '@/components/dashboard/BudgetProgressCard';
import InsightsCard from '@/components/dashboard/InsightsCard';
import MonthlyTrendChart from '@/components/charts/MonthlyTrendChart';
import CategoryPieChart from '@/components/charts/CategoryPieChart';
import FloatingCoin from '@/components/common/FloatingCoin';
import Tilt3D from '@/components/ui/Tilt3D';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useAppData } from '@/context/AppDataContext';

export default function Dashboard() {
  const { budget } = useAppData();
  const {
    balance,
    totalIncome,
    totalExpense,
    savings,
    categoryTotals,
    monthlyTrend,
    health,
    insights,
    recentTransactions,
  } = useAnalytics();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <PageTransition>
      <div className="flex flex-col gap-6 pb-10">
        {/* Welcome hero */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-6 sm:p-8 flex items-center justify-between overflow-hidden relative"
        >
          <div className="relative z-10">
            <p className="text-secondary text-sm mb-1">{greeting} 👋</p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-primary">
              Here's your financial pulse
            </h2>
            <p className="text-sm text-muted mt-2 max-w-md">
              Track spending, hit your budget, and grow your savings — all in one clean view.
            </p>
          </div>
          <Tilt3D className="hidden sm:block shrink-0">
            <FloatingCoin size={110} />
          </Tilt3D>
        </motion.div>

        {/* Stat grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Balance" amount={balance} icon={Wallet} tone="default" delay={0.05} />
          <StatCard label="Income" amount={totalIncome} icon={TrendingUp} tone="positive" delay={0.1} sub="This month" />
          <StatCard label="Expense" amount={totalExpense} icon={TrendingDown} tone="negative" delay={0.15} sub="This month" />
          <StatCard label="Savings" amount={savings} icon={PiggyBank} tone="default" delay={0.2} sub="This month" />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 flex flex-col gap-5">
            <MonthlyTrendChart data={monthlyTrend} delay={0.1} />
            <RecentTransactionsCard transactions={recentTransactions} delay={0.15} />
          </div>
          <div className="flex flex-col gap-5">
            <HealthScoreOrb score={health.score} label={health.label} delay={0.1} />
            <BudgetProgressCard spent={totalExpense} limit={budget.monthlyLimit} delay={0.15} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <CategoryPieChart data={categoryTotals} delay={0.2} />
          <InsightsCard insights={insights} delay={0.25} />
        </div>
      </div>
    </PageTransition>
  );
}

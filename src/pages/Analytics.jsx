import PageTransition from '@/components/layout/PageTransition';
import MonthlyTrendChart from '@/components/charts/MonthlyTrendChart';
import WeeklyBarChart from '@/components/charts/WeeklyBarChart';
import CategoryPieChart from '@/components/charts/CategoryPieChart';
import MonthComparisonCard from '@/components/charts/MonthComparisonCard';
import TopCategoryCard from '@/components/charts/TopCategoryCard';
import { useAnalytics } from '@/hooks/useAnalytics';
import { getCategoryMeta } from '@/utils/constants';

export default function Analytics() {
  const { monthlyTrend, weeklyTrend, categoryTotals, topCategory } = useAnalytics();

  const topCategoryWithIcon = topCategory
    ? { ...topCategory, icon: getCategoryMeta(topCategory.category).icon }
    : null;

  return (
    <PageTransition>
      <div className="flex flex-col gap-5 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <TopCategoryCard category={topCategoryWithIcon} delay={0.05} />
          <MonthComparisonCard delay={0.1} />
        </div>

        <MonthlyTrendChart data={monthlyTrend} delay={0.1} title="6-Month Trend" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <WeeklyBarChart data={weeklyTrend} delay={0.15} />
          <CategoryPieChart data={categoryTotals} delay={0.2} title="Category Analysis" />
        </div>
      </div>
    </PageTransition>
  );
}

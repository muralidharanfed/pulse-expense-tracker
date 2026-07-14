import PageTransition from '@/components/layout/PageTransition';
import BudgetStatusHero from '@/components/budget/BudgetStatusHero';
import BudgetForm from '@/components/budget/BudgetForm';
import CategoryBudgetList from '@/components/budget/CategoryBudgetList';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useAppData } from '@/context/AppDataContext';

export default function Budget() {
  const { budget } = useAppData();
  const { totalExpense, categoryTotals } = useAnalytics();

  return (
    <PageTransition>
      <div className="flex flex-col gap-5 pb-10 max-w-3xl">
        <BudgetStatusHero spent={totalExpense} limit={budget.monthlyLimit} delay={0.05} />
        <BudgetForm delay={0.1} />
        <CategoryBudgetList categoryTotals={categoryTotals} monthlyLimit={budget.monthlyLimit} delay={0.15} />
      </div>
    </PageTransition>
  );
}

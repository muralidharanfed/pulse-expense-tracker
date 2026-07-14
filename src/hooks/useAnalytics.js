import { useMemo } from 'react';
import { useAppData } from '@/context/AppDataContext';
import { useSettings } from '@/context/SettingsContext';
import {
  getMonthSummary,
  getAllTimeBalance,
  getCategoryTotals,
  getMonthlyTrend,
  getWeeklyTrend,
  getTrackingStreak,
  getFinancialHealthScore,
  generateInsights,
} from '@/utils/analytics';

export function useAnalytics() {
  const { transactions, budget } = useAppData();
  const { currencySymbol } = useSettings();

  return useMemo(() => {
    const { totalIncome, totalExpense, savings, savingsRate, monthTx } = getMonthSummary(transactions);
    const balance = getAllTimeBalance(transactions);
    const categoryTotals = getCategoryTotals(monthTx, 'expense');
    const monthlyTrend = getMonthlyTrend(transactions, 6);
    const weeklyTrend = getWeeklyTrend(transactions);
    const streak = getTrackingStreak(transactions);

    const budgetUsagePct = budget.monthlyLimit > 0 ? (totalExpense / budget.monthlyLimit) * 100 : 0;
    const health = getFinancialHealthScore({ savingsRate, totalIncome, totalExpense, budgetUsagePct });
    const insights = generateInsights(transactions, budget, currencySymbol);

    const topCategory = categoryTotals[0] || null;

    return {
      balance,
      totalIncome,
      totalExpense,
      savings,
      savingsRate,
      categoryTotals,
      monthlyTrend,
      weeklyTrend,
      streak,
      budgetUsagePct,
      health,
      insights,
      topCategory,
      recentTransactions: transactions.slice(0, 6),
    };
  }, [transactions, budget, currencySymbol]);
}

import { isThisMonth, monthKey, weekdayIsWeekend } from './formatters';
import { getCategoryMeta } from './constants';

/** Split transactions into income / expense arrays */
export function splitByType(transactions) {
  const income = transactions.filter((t) => t.type === 'income');
  const expense = transactions.filter((t) => t.type === 'expense');
  return { income, expense };
}

export function sumAmount(list) {
  return list.reduce((acc, t) => acc + Number(t.amount || 0), 0);
}

/** Headline totals for the current month */
export function getMonthSummary(transactions, ref = new Date()) {
  const monthTx = transactions.filter((t) => isThisMonth(t.date, ref));
  const { income, expense } = splitByType(monthTx);
  const totalIncome = sumAmount(income);
  const totalExpense = sumAmount(expense);
  const savings = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? (savings / totalIncome) * 100 : 0;
  return { totalIncome, totalExpense, savings, savingsRate, monthTx };
}

/** All-time balance across every transaction */
export function getAllTimeBalance(transactions) {
  const { income, expense } = splitByType(transactions);
  return sumAmount(income) - sumAmount(expense);
}

/** Totals grouped by category, for pie/bar charts */
export function getCategoryTotals(transactions, type = 'expense') {
  const filtered = transactions.filter((t) => t.type === type);
  const map = {};
  filtered.forEach((t) => {
    map[t.category] = (map[t.category] || 0) + Number(t.amount || 0);
  });
  return Object.entries(map)
    .map(([category, value]) => {
      const meta = getCategoryMeta(category);
      return { category, label: meta.label, color: meta.color, value };
    })
    .sort((a, b) => b.value - a.value);
}

/** Expense totals for the last N months, oldest first */
export function getMonthlyTrend(transactions, months = 6) {
  const now = new Date();
  const buckets = [];
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.push({
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
      label: d.toLocaleDateString(undefined, { month: 'short' }),
      income: 0,
      expense: 0,
    });
  }
  const byKey = Object.fromEntries(buckets.map((b) => [b.key, b]));
  transactions.forEach((t) => {
    const key = monthKey(t.date);
    if (byKey[key]) {
      if (t.type === 'income') byKey[key].income += Number(t.amount || 0);
      else byKey[key].expense += Number(t.amount || 0);
    }
  });
  return buckets;
}

/** Expense totals for the last 7 days, oldest first */
export function getWeeklyTrend(transactions) {
  const days = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    days.push({
      key: d.toDateString(),
      label: d.toLocaleDateString(undefined, { weekday: 'short' }),
      expense: 0,
    });
  }
  const byKey = Object.fromEntries(days.map((d) => [d.key, d]));
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      const key = new Date(t.date).toDateString();
      if (byKey[key]) byKey[key].expense += Number(t.amount || 0);
    });
  return days;
}

/** Consecutive-day tracking streak, counting backward from today */
export function getTrackingStreak(transactions) {
  if (transactions.length === 0) return 0;
  const daySet = new Set(transactions.map((t) => new Date(t.date).toDateString()));
  let streak = 0;
  const cursor = new Date();
  while (daySet.has(cursor.toDateString())) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/**
 * Financial Health Score (0-100), derived from three weighted signals:
 * savings rate, expense-to-income ratio, and budget usage.
 */
export function getFinancialHealthScore({ savingsRate, totalIncome, totalExpense, budgetUsagePct }) {
  const savingsScore = Math.max(0, Math.min(100, savingsRate * 2)); // 50% savings -> 100
  const expenseRatio = totalIncome > 0 ? totalExpense / totalIncome : 1;
  const expenseScore = Math.max(0, Math.min(100, (1 - expenseRatio) * 100 + 20));
  const budgetScore = Math.max(0, Math.min(100, 100 - Math.max(0, budgetUsagePct - 100) * 2 - Math.max(0, budgetUsagePct - 80) * 0.5));

  const score = Math.round(savingsScore * 0.4 + expenseScore * 0.35 + budgetScore * 0.25);
  const clamped = Math.max(0, Math.min(100, score));

  let label = 'Poor';
  if (clamped >= 80) label = 'Excellent';
  else if (clamped >= 60) label = 'Good';
  else if (clamped >= 40) label = 'Average';

  return { score: clamped, label };
}

/** Rule-based (non-AI) natural-language insights generated from real data */
export function generateInsights(transactions, budget, currencySymbol) {
  const insights = [];
  const { totalIncome, totalExpense, savings, savingsRate, monthTx } = getMonthSummary(transactions);
  const expenseTx = monthTx.filter((t) => t.type === 'expense');

  // Top category
  const categoryTotals = getCategoryTotals(monthTx, 'expense');
  if (categoryTotals.length > 0) {
    const top = categoryTotals[0];
    insights.push(`You spent the most on ${top.label} this month.`);
  }

  // Weekend vs weekday spending
  if (expenseTx.length > 0) {
    const weekend = expenseTx.filter((t) => weekdayIsWeekend(t.date));
    const weekday = expenseTx.filter((t) => !weekdayIsWeekend(t.date));
    const weekendAvg = weekend.length ? sumAmount(weekend) / weekend.length : 0;
    const weekdayAvg = weekday.length ? sumAmount(weekday) / weekday.length : 0;
    if (weekendAvg > weekdayAvg && weekend.length > 0) {
      insights.push('Your weekend spending is higher than weekdays.');
    } else if (weekday.length > 0 && weekendAvg <= weekdayAvg) {
      insights.push('You spend more on weekdays than weekends.');
    }
  }

  // Budget status
  if (budget?.monthlyLimit > 0) {
    if (totalExpense <= budget.monthlyLimit) {
      insights.push('You stayed within your budget this month. Nice work.');
    } else {
      const over = totalExpense - budget.monthlyLimit;
      insights.push(`You went over budget by ${currencySymbol}${over.toFixed(0)} this month.`);
    }
  }

  // Savings rate
  if (totalIncome > 0) {
    if (savings >= 0) {
      insights.push(`You saved ${savingsRate.toFixed(0)}% of your income this month.`);
    } else {
      insights.push('You spent more than you earned this month.');
    }
  }

  // Transaction frequency
  if (expenseTx.length >= 15) {
    insights.push(`You logged ${expenseTx.length} expenses this month — great consistency.`);
  }

  return insights.slice(0, 5);
}

/** Aggregated stats used to unlock achievements */
export function getAchievementStats(transactions, budget) {
  const { totalIncome, totalExpense, savingsRate } = getMonthSummary(transactions);
  const streak = getTrackingStreak(transactions);
  const budgetAchieved = budget?.monthlyLimit > 0 && totalExpense <= budget.monthlyLimit && totalIncome > 0;

  return {
    totalTransactions: transactions.length,
    streak,
    budgetAchieved,
    savingsRate,
  };
}

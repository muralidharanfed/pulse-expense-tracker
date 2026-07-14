import {
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Home,
  HeartPulse,
  Film,
  GraduationCap,
  Plane,
  Receipt,
  PiggyBank,
  Briefcase,
  Gift,
  MoreHorizontal,
} from 'lucide-react';

export const EXPENSE_CATEGORIES = [
  { id: 'food', label: 'Food & Dining', icon: UtensilsCrossed, color: '#ff6b6b' },
  { id: 'transport', label: 'Transport', icon: Car, color: '#22c1e0' },
  { id: 'shopping', label: 'Shopping', icon: ShoppingBag, color: '#a685ff' },
  { id: 'housing', label: 'Housing', icon: Home, color: '#f5b942' },
  { id: 'health', label: 'Health', icon: HeartPulse, color: '#ff8fab' },
  { id: 'entertainment', label: 'Entertainment', icon: Film, color: '#6fce6a' },
  { id: 'education', label: 'Education', icon: GraduationCap, color: '#4f8cff' },
  { id: 'travel', label: 'Travel', icon: Plane, color: '#2dd4a7' },
  { id: 'bills', label: 'Bills & Utilities', icon: Receipt, color: '#e0a530' },
  { id: 'other', label: 'Other', icon: MoreHorizontal, color: '#8a93b3' },
];

export const INCOME_CATEGORIES = [
  { id: 'salary', label: 'Salary', icon: Briefcase, color: '#2dd4a7' },
  { id: 'savings', label: 'Savings', icon: PiggyBank, color: '#4f8cff' },
  { id: 'gift', label: 'Gift', icon: Gift, color: '#a685ff' },
  { id: 'other-income', label: 'Other', icon: MoreHorizontal, color: '#8a93b3' },
];

export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

export function getCategoryMeta(id) {
  return ALL_CATEGORIES.find((c) => c.id === id) || EXPENSE_CATEGORIES[EXPENSE_CATEGORIES.length - 1];
}

export const THEMES = [
  { id: 'dark', label: 'Midnight' },
  { id: 'light', label: 'Daylight' },
  { id: 'ocean', label: 'Ocean' },
  { id: 'forest', label: 'Forest' },
  { id: 'purple', label: 'Nebula' },
];

export const CURRENCIES = [
  { code: 'USD', symbol: '$', label: 'US Dollar' },
  { code: 'EUR', symbol: '€', label: 'Euro' },
  { code: 'GBP', symbol: '£', label: 'British Pound' },
  { code: 'INR', symbol: '₹', label: 'Indian Rupee' },
  { code: 'JPY', symbol: '¥', label: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', label: 'Australian Dollar' },
];

export const ACHIEVEMENT_DEFS = [
  {
    id: 'first-expense',
    title: 'First Step',
    description: 'Logged your first transaction.',
    check: (stats) => stats.totalTransactions >= 1,
  },
  {
    id: 'streak-7',
    title: '7-Day Streak',
    description: 'Tracked spending for 7 days in a row.',
    check: (stats) => stats.streak >= 7,
  },
  {
    id: 'fifty-transactions',
    title: 'Power Tracker',
    description: 'Added 50 transactions.',
    check: (stats) => stats.totalTransactions >= 50,
  },
  {
    id: 'budget-achieved',
    title: 'Budget Master',
    description: 'Stayed within budget for a full month.',
    check: (stats) => stats.budgetAchieved,
  },
  {
    id: 'savings-goal',
    title: 'Savings Champion',
    description: 'Saved more than 20% of your income.',
    check: (stats) => stats.savingsRate >= 20,
  },
];

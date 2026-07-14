import { generateId } from '@/utils/id';

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

/** Realistic sample transactions used to seed a first-time visit. */
export const SEED_TRANSACTIONS = [
  { type: 'income', category: 'salary', amount: 4200, note: 'Monthly salary', date: daysAgo(12) },
  { type: 'expense', category: 'housing', amount: 1200, note: 'Rent', date: daysAgo(11) },
  { type: 'expense', category: 'food', amount: 68.5, note: 'Groceries', date: daysAgo(9) },
  { type: 'expense', category: 'transport', amount: 34.2, note: 'Gas', date: daysAgo(8) },
  { type: 'expense', category: 'entertainment', amount: 42, note: 'Movie night', date: daysAgo(7) },
  { type: 'expense', category: 'food', amount: 24.75, note: 'Coffee & lunch', date: daysAgo(6) },
  { type: 'expense', category: 'shopping', amount: 89.99, note: 'New headphones', date: daysAgo(5) },
  { type: 'expense', category: 'bills', amount: 76.4, note: 'Electricity bill', date: daysAgo(4) },
  { type: 'expense', category: 'food', amount: 31.2, note: 'Weekend dinner', date: daysAgo(3) },
  { type: 'expense', category: 'health', amount: 55, note: 'Pharmacy', date: daysAgo(2) },
  { type: 'expense', category: 'transport', amount: 18.6, note: 'Rideshare', date: daysAgo(1) },
  { type: 'income', category: 'gift', amount: 150, note: 'Birthday gift', date: daysAgo(1) },
].map((t) => ({ ...t, id: generateId(), createdAt: new Date().toISOString() }));

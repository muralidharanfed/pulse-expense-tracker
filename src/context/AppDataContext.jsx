import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { storageService } from '@/services/storageService';
import { generateId } from '@/utils/id';
import { ACHIEVEMENT_DEFS } from '@/utils/constants';
import { getAchievementStats } from '@/utils/analytics';
import { SEED_TRANSACTIONS } from '@/data/seedData';

const AppDataContext = createContext(null);

function getInitialTransactions() {
  const isFirstVisit = localStorage.getItem(storageService.KEYS.TRANSACTIONS) === null;
  if (isFirstVisit) return SEED_TRANSACTIONS;
  return storageService.getTransactions();
}

export function AppDataProvider({ children }) {
  const [transactions, setTransactions] = useState(getInitialTransactions);
  const [budget, setBudget] = useState(() => storageService.getBudget());
  const [unlockedAchievements, setUnlockedAchievements] = useState(() => storageService.getAchievements());

  useEffect(() => {
    storageService.setTransactions(transactions);
  }, [transactions]);

  useEffect(() => {
    storageService.setBudget(budget);
  }, [budget]);

  useEffect(() => {
    storageService.setAchievements(unlockedAchievements);
  }, [unlockedAchievements]);

  // Re-evaluate achievements whenever transactions/budget change
  useEffect(() => {
    const stats = getAchievementStats(transactions, budget);
    const newlyUnlocked = ACHIEVEMENT_DEFS.filter(
      (a) => a.check(stats) && !unlockedAchievements.includes(a.id)
    ).map((a) => a.id);
    if (newlyUnlocked.length > 0) {
      setUnlockedAchievements((prev) => [...prev, ...newlyUnlocked]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions, budget]);

  const addTransaction = useCallback((tx) => {
    setTransactions((prev) => [{ ...tx, id: generateId(), createdAt: new Date().toISOString() }, ...prev]);
  }, []);

  const updateTransaction = useCallback((id, updates) => {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateBudget = useCallback((updates) => {
    setBudget((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetAllData = useCallback(() => {
    storageService.resetAll();
    setTransactions([]);
    setBudget(storageService.getBudget());
    setUnlockedAchievements([]);
  }, []);

  const value = useMemo(
    () => ({
      transactions,
      budget,
      unlockedAchievements,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      updateBudget,
      resetAllData,
    }),
    [transactions, budget, unlockedAchievements, addTransaction, updateTransaction, deleteTransaction, updateBudget, resetAllData]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider');
  return ctx;
}

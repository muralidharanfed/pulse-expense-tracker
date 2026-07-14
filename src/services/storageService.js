const KEYS = {
  TRANSACTIONS: 'pulse.transactions',
  BUDGET: 'pulse.budget',
  SETTINGS: 'pulse.settings',
  ACHIEVEMENTS: 'pulse.achievements',
};

function safeGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`storageService: failed to read ${key}`, err);
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`storageService: failed to write ${key}`, err);
  }
}

export const storageService = {
  KEYS,
  getTransactions: () => safeGet(KEYS.TRANSACTIONS, []),
  setTransactions: (data) => safeSet(KEYS.TRANSACTIONS, data),

  getBudget: () =>
    safeGet(KEYS.BUDGET, {
      monthlyLimit: 2000,
      categoryLimits: {},
    }),
  setBudget: (data) => safeSet(KEYS.BUDGET, data),

  getSettings: () =>
    safeGet(KEYS.SETTINGS, {
      theme: 'dark',
      currency: 'USD',
    }),
  setSettings: (data) => safeSet(KEYS.SETTINGS, data),

  getAchievements: () => safeGet(KEYS.ACHIEVEMENTS, []),
  setAchievements: (data) => safeSet(KEYS.ACHIEVEMENTS, data),

  resetAll: () => {
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
  },
};

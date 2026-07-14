import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { storageService } from '@/services/storageService';
import { CURRENCIES } from '@/utils/constants';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => storageService.getSettings());

  useEffect(() => {
    storageService.setSettings(settings);
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings]);

  const currencySymbol = useMemo(() => {
    const found = CURRENCIES.find((c) => c.code === settings.currency);
    return found ? found.symbol : '$';
  }, [settings.currency]);

  const setTheme = (theme) => setSettings((prev) => ({ ...prev, theme }));
  const setCurrency = (currency) => setSettings((prev) => ({ ...prev, currency }));

  const resetSettings = () => {
    storageService.resetAll();
    setSettings(storageService.getSettings());
  };

  const value = {
    theme: settings.theme,
    currency: settings.currency,
    currencySymbol,
    setTheme,
    setCurrency,
    resetSettings,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}

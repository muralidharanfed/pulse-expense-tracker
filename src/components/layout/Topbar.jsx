import { useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { NAV_ITEMS } from '@/utils/navigation';
import { useSettings } from '@/context/SettingsContext';

export default function Topbar() {
  const location = useLocation();
  const { theme, setTheme } = useSettings();
  const current = NAV_ITEMS.find((n) => (n.to === '/' ? location.pathname === '/' : location.pathname.startsWith(n.to)));

  const toggleQuickTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <header className="flex items-center justify-between px-5 sm:px-8 pt-6 pb-2">
      <div>
        <p className="text-xs text-muted uppercase tracking-widest mb-0.5">Pulse</p>
        <h1 className="font-display text-xl sm:text-2xl font-semibold text-primary">
          {current?.label || 'Dashboard'}
        </h1>
      </div>
      <button
        onClick={toggleQuickTheme}
        aria-label="Toggle light and dark theme"
        className="w-10 h-10 rounded-xl glass flex items-center justify-center text-secondary hover:text-primary transition-colors"
      >
        {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
      </button>
    </header>
  );
}

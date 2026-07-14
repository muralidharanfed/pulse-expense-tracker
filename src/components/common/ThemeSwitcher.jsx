import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { THEMES } from '@/utils/constants';
import { useSettings } from '@/context/SettingsContext';

const PREVIEW_COLORS = {
  dark: { bg: '#080b14', accent: '#2dd4a7' },
  light: { bg: '#f3f5fa', accent: '#14b892' },
  ocean: { bg: '#061826', accent: '#22c1e0' },
  forest: { bg: '#0a140d', accent: '#6fce6a' },
  purple: { bg: '#120a22', accent: '#a685ff' },
};

export default function ThemeSwitcher() {
  const { theme, setTheme } = useSettings();

  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
      {THEMES.map((t) => {
        const colors = PREVIEW_COLORS[t.id];
        const active = theme === t.id;
        return (
          <motion.button
            key={t.id}
            onClick={() => setTheme(t.id)}
            whileTap={{ scale: 0.95 }}
            className={`relative rounded-2xl p-3 flex flex-col items-center gap-2 border-2 transition-colors ${
              active ? 'border-accent' : 'border-transparent'
            }`}
            style={{ backgroundColor: `${colors.bg}` }}
          >
            {active && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                <Check size={10} className="text-[#06120f]" />
              </span>
            )}
            <span className="w-8 h-8 rounded-full" style={{ backgroundColor: colors.accent }} />
            <span className="text-[11px] font-medium text-white/80">{t.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

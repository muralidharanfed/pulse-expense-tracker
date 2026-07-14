import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { NAV_ITEMS } from '@/utils/navigation';

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 px-5 py-7 border-r border-[rgb(var(--border-soft)/var(--border-alpha))]">
      <div className="flex items-center gap-2.5 px-2 mb-10">
        <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center">
          <Activity size={18} className="accent" />
        </div>
        <span className="font-display text-lg font-semibold text-primary tracking-tight">Pulse</span>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'}>
            {({ isActive }) => (
              <div className="relative px-3 py-2.5 rounded-xl flex items-center gap-3 group">
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-accent/12 border border-accent/20 rounded-xl"
                    transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                  />
                )}
                <item.icon
                  size={18}
                  className={`relative z-10 shrink-0 transition-colors ${isActive ? 'accent' : 'text-secondary group-hover:text-primary'}`}
                />
                <span
                  className={`relative z-10 text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-secondary group-hover:text-primary'}`}
                >
                  {item.label}
                </span>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-3 pt-6 border-t border-[rgb(var(--border-soft)/var(--border-alpha))]">
        <p className="text-xs text-muted leading-relaxed">
          Your data stays on this device — stored locally, never uploaded.
        </p>
      </div>
    </aside>
  );
}

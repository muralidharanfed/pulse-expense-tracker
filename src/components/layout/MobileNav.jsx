import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NAV_ITEMS } from '@/utils/navigation';

export default function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 glass-solid border-t border-[rgb(var(--border-soft)/var(--border-alpha))] pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-stretch justify-between px-1">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'} className="flex-1">
            {({ isActive }) => (
              <div className="relative flex flex-col items-center gap-1 py-2.5">
                {isActive && (
                  <motion.div
                    layoutId="mobile-active"
                    className="absolute top-1 w-1.5 h-1.5 rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <item.icon size={19} className={isActive ? 'accent' : 'text-muted'} />
                <span className={`text-[10px] font-medium ${isActive ? 'text-primary' : 'text-muted'}`}>
                  {item.label}
                </span>
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

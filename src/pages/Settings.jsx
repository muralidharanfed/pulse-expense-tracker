import { useState } from 'react';
import { Activity, Trash2, Info } from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ThemeSwitcher from '@/components/common/ThemeSwitcher';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { CURRENCIES } from '@/utils/constants';
import { useSettings } from '@/context/SettingsContext';
import { useAppData } from '@/context/AppDataContext';
import { useToast } from '@/context/ToastContext';

export default function Settings() {
  const { currency, setCurrency } = useSettings();
  const { resetAllData } = useAppData();
  const { showToast } = useToast();
  const [confirmReset, setConfirmReset] = useState(false);

  const handleReset = () => {
    resetAllData();
    showToast('All data has been reset.', 'info');
    setConfirmReset(false);
  };

  return (
    <PageTransition>
      <div className="flex flex-col gap-5 pb-10 max-w-2xl">
        <Card className="p-5">
          <h3 className="font-display font-semibold text-primary mb-4">Appearance</h3>
          <ThemeSwitcher />
        </Card>

        <Card delay={0.05} className="p-5">
          <h3 className="font-display font-semibold text-primary mb-4">Currency</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {CURRENCIES.map((c) => (
              <button
                key={c.code}
                onClick={() => setCurrency(c.code)}
                className={`px-3 py-2.5 rounded-xl text-sm flex items-center gap-2 border transition-colors ${
                  currency === c.code ? 'border-accent/60 bg-accent/10 text-primary' : 'border-transparent bg-black/10 text-secondary hover:bg-black/15'
                }`}
              >
                <span className="font-mono font-semibold">{c.symbol}</span>
                {c.label}
              </button>
            ))}
          </div>
        </Card>

        <Card delay={0.1} className="p-5">
          <h3 className="font-display font-semibold text-primary mb-2">Reset Data</h3>
          <p className="text-sm text-secondary mb-4">
            Permanently erase all transactions, budgets, and achievements stored on this device.
          </p>
          <Button variant="danger" icon={Trash2} onClick={() => setConfirmReset(true)}>
            Reset All Data
          </Button>
        </Card>

        <Card delay={0.15} className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Info size={16} className="accent" />
            <h3 className="font-display font-semibold text-primary">About Pulse</h3>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Activity size={16} className="accent" />
            <span className="font-mono text-sm text-primary">Pulse v1.0.0</span>
          </div>
          <p className="text-sm text-secondary leading-relaxed">
            Pulse is a frontend-only expense tracker. All data is stored locally in your browser via
            Local Storage — nothing is sent to a server, and no account is required.
          </p>
        </Card>
      </div>

      <ConfirmDialog
        open={confirmReset}
        title="Reset all data?"
        description="This will permanently delete every transaction, your budget, and achievement progress. This can't be undone."
        onConfirm={handleReset}
        onCancel={() => setConfirmReset(false)}
      />
    </PageTransition>
  );
}

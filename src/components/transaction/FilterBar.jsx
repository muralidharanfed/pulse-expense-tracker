import { Search, ArrowUpDown } from 'lucide-react';
import { ALL_CATEGORIES } from '@/utils/constants';

export default function FilterBar({ filters, setFilters }) {
  const update = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => update('search', e.target.value)}
          placeholder="Search transactions..."
          className="w-full glass rounded-xl pl-10 pr-4 py-2.5 text-sm text-primary outline-none focus:border-accent/50 transition-colors"
        />
      </div>

      <select
        value={filters.category}
        onChange={(e) => update('category', e.target.value)}
        className="glass rounded-xl px-3.5 py-2.5 text-sm text-primary outline-none focus:border-accent/50 transition-colors"
      >
        <option value="all">All categories</option>
        {ALL_CATEGORIES.map((c) => (
          <option key={c.id} value={c.id}>
            {c.label}
          </option>
        ))}
      </select>

      <select
        value={filters.type}
        onChange={(e) => update('type', e.target.value)}
        className="glass rounded-xl px-3.5 py-2.5 text-sm text-primary outline-none focus:border-accent/50 transition-colors"
      >
        <option value="all">All types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <button
        onClick={() => update('sort', filters.sort === 'desc' ? 'asc' : 'desc')}
        className="glass rounded-xl px-3.5 py-2.5 text-sm text-secondary hover:text-primary flex items-center gap-1.5 transition-colors"
      >
        <ArrowUpDown size={14} />
        {filters.sort === 'desc' ? 'Newest' : 'Oldest'}
      </button>
    </div>
  );
}

# Pulse — Modern Expense Tracker

A frontend-only, production-quality expense tracker built with **React + Vite + Tailwind CSS v4**.
All data is persisted to **Local Storage** — no backend, no auth, nothing leaves the browser.

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- React Router DOM (routing)
- Context API (global state — no Redux needed)
- React Hook Form (transaction form validation)
- Recharts (area / bar / pie charts)
- Framer Motion (page transitions, micro-interactions, animated pulse-ring)
- Lucide React (icons)

## Getting Started

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Folder Structure

```text
src/
├── assets/              # static images/icons
├── components/
│   ├── ui/              # generic building blocks (Card, Button, Modal, ProgressBar, Tilt3D...)
│   ├── layout/          # Sidebar, MobileNav, Topbar, PageTransition
│   ├── common/          # shared widgets (FloatingCoin, FloatingAddButton, ThemeSwitcher, ConfirmDialog)
│   ├── dashboard/       # StatCard, HealthScoreOrb, RecentTransactionsCard, InsightsCard...
│   ├── charts/          # MonthlyTrendChart, CategoryPieChart, WeeklyBarChart...
│   ├── transaction/     # TransactionForm, TransactionCard, FilterBar
│   ├── budget/          # BudgetForm, BudgetStatusHero, CategoryBudgetList
│   └── achievements/    # AchievementCard
├── pages/               # one file per route (Dashboard, Transactions, Analytics, Budget, Achievements, Settings)
├── layouts/             # AppLayout (sidebar + topbar + outlet shell)
├── context/             # AppDataContext, SettingsContext, ToastContext, TransactionModalContext
├── hooks/               # useAnalytics, useMediaQuery
├── services/            # storageService (single source of truth for Local Storage I/O)
├── utils/               # analytics engine, formatters, constants, id generator, nav config
├── data/                # seedData (sample data shown on first visit)
├── routes/              # AppRoutes (react-router route table)
└── styles/              # global Tailwind + design-token stylesheet
```

## Features

- **Dashboard** — balance, income, expense, savings, recent activity, budget progress, Financial
  Health Score (animated pulse-ring), smart insights, monthly trend + category breakdown charts.
- **Transactions** — add / edit / delete, search, filter by category & type, sort by date.
- **Analytics** — 6-month trend, weekly bar chart, category analysis, top category, month-over-month comparison.
- **Budget Planner** — set a monthly limit, animated progress bar, safe/warning/exceeded status.
- **Achievements** — 5 gamified badges unlocked automatically from real usage data.
- **Settings** — 5 themes (Midnight, Daylight, Ocean, Forest, Nebula), 6 currencies, reset data, about.
- **Smart Insights & Financial Health Score** are computed entirely from local rules/statistics —
  no AI API calls are made.

## Data Persistence

Everything lives in `localStorage` under the `pulse.*` namespace (see `src/services/storageService.js`):
transactions, budget, theme/currency settings, and unlocked achievements — all restored automatically on refresh.

---
name: Expense Tracker Architecture & Conventions
description: Core architecture decisions, data shape, and coding conventions observed across all source files
type: project
---

React expense tracker app (no routing, no state management lib, no backend). Stack: React 19, Vite 7, Recharts 3.

**Component responsibilities:**
- `App.jsx` — owns `transactions` state array; handles `handleAdd` and `handleDelete`; passes down via props
- `Summary.jsx` — pure display component; computes income/expense/balance inline on every render (no memoization)
- `TransactionForm.jsx` — owns its own form state; calls `onAdd(transaction)` on submit; resets form after add
- `TransactionList.jsx` — owns filter state (`filterType`, `filterCategory`); receives `transactions` + `onDelete`
- `SpendingChart.jsx` — receives `transactions`; filters to expenses and aggregates by category inline

**Transaction object shape:**
```js
{ id: number, description: string, amount: number, type: "income"|"expense", category: string, date: "YYYY-MM-DD" }
```
- IDs for seed data are sequential integers (1-8); new transactions use `Date.now()` as ID
- Amounts stored as numbers; `TransactionForm` uses `parseFloat` on submit

**Shared constants (duplicated — not extracted):**
- `categories` array is defined identically in both `TransactionForm.jsx` and `TransactionList.jsx`

**Known intentional data issue:**
- Transaction #4 ("Freelance Work") is `type: "expense"` but `category: "salary"` — do NOT flag as a bug

**CSS architecture:**
- `index.css` — CSS custom properties (design tokens), reset, global body styles, fadeUp animation
- `App.css` — all component styles (layout, cards, table, form, delete button) in one file

**Why:** First review of this codebase — establishing baseline understanding.
**How to apply:** Use as reference for future reviews; do not re-derive from scratch.

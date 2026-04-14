---
name: Expense Tracker Architecture & Conventions
description: Core architecture decisions, data shape, and coding conventions observed across all source files
type: project
---

React expense tracker app (no routing, no state management lib, no backend). Stack: React 19, Vite 7, Recharts 3.

**Component responsibilities:**
- `App.jsx` — owns `transactions` state array; handles `handleAdd` and `handleDelete` with functional updates (`prev =>`); uses `window.confirm` for delete confirmation; `nextId` via `useRef(9)` seeded after highest seed ID
- `Summary.jsx` — pure display component; computes income/expense/balance inline on every render (no memoization); negative balance gets `.balance-amount--negative` class
- `TransactionForm.jsx` — owns its own form state; calls `onAdd(transaction)` on submit; resets form after add; inline description + amount validation with error messages and `aria-invalid`/`aria-describedby`; `handleTypeChange` resets category to first of new type's list
- `TransactionList.jsx` — owns filter state (`filterType`, `filterCategory`); receives `transactions` + `onDelete`; renders empty-state message when filters match nothing; imports `CATEGORIES` from constants for filter dropdown
- `SpendingChart.jsx` — receives `transactions`; filters to expenses and aggregates by category inline; returns null when no data; uses `Cell key={entry.name}` for stable keys; `COLORS` cycles via `% COLORS.length`

**Transaction object shape:**
```js
{ id: number, description: string, amount: number, type: "income"|"expense", category: string, date: "YYYY-MM-DD" }
```
- IDs for seed data are sequential integers (1-8); new transactions use `useRef(9)` counter incremented via `nextId.current++`
- Amounts stored as numbers; `TransactionForm` uses `parseFloat` on submit
- Transaction #4 ("Freelance Work") is `type: "income"`, `category: "salary"` — intentionally fixed; do NOT flag

**Shared constants (src/constants.js):**
- `INCOME_CATEGORIES = ["salary", "freelance", "other"]`
- `EXPENSE_CATEGORIES = ["food", "housing", "utilities", "transport", "entertainment", "other"]`
- `CATEGORIES = [...new Set([...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES])]` — combined, deduplicated
- `TransactionForm` imports `INCOME_CATEGORIES` + `EXPENSE_CATEGORIES`; `TransactionList` imports `CATEGORIES`

**CSS architecture:**
- `index.css` — CSS custom properties (design tokens), reset, global body styles, `sr-only` utility, fadeUp animation
- `App.css` — all component styles in one file; form CSS scoped to `.add-transaction form`; table/th/td selectors are global

**Round 3 state (2026-04-14): remaining issues after two prior fix rounds:**
- `TransactionList` imports `CATEGORIES` but does NOT import `INCOME_CATEGORIES`/`EXPENSE_CATEGORIES`, so category filter can show categories that don't exist in any transaction (e.g., "freelance" can appear even if no income transactions exist)
- Form reset after submit hard-codes `setCategory("food")` — if `EXPENSE_CATEGORIES[0]` ever changes, these two diverge
- `handleTypeChange` correctly resets to `newCategories[0]`, but `handleSubmit` reset hard-codes "food" and "expense" literals
- Category options in the filter dropdown render raw lowercase values (e.g., "food") — CSS `text-transform: capitalize` in App.css handles display, but option values themselves are all-lowercase which is fine
- `window.confirm` for delete is still in use — not accessible (no focus return, no ARIA, blocks main thread) — known; has not been flagged as fixed
- `table`, `th`, `td` CSS selectors are global — would affect any additional table added to the app
- `formatCurrency` fallback is `'$0.00'` for non-number/NaN — a silent substitution that could mask real data bugs; currently safe because all paths produce numbers
- `SpendingChart` COLORS array (7 entries) can cycle for apps with >7 expense categories — documented with a comment now, acceptable

**Why:** Third review pass — documenting what is truly fixed vs. what remains after rounds 1 and 2.
**How to apply:** Focus future reviews on the remaining issues listed above; do not re-flag already-fixed items.

---
name: Expense Tracker Architecture & Conventions
description: Core architecture decisions, data shape, and coding conventions observed across all source files
type: project
---

React expense tracker app (no routing, no state management lib, no backend). Stack: React 19, Vite 7, Recharts 3.

**Component responsibilities:**
- `App.jsx` — owns `transactions` state array; handles `handleAdd` and `handleDelete` with functional updates (`prev =>`); uses `window.confirm` for delete confirmation
- `Summary.jsx` — pure display component; computes income/expense/balance inline on every render (no memoization)
- `TransactionForm.jsx` — owns its own form state; calls `onAdd(transaction)` on submit; resets form after add; inline description validation with error message
- `TransactionList.jsx` — owns filter state (`filterType`, `filterCategory`); receives `transactions` + `onDelete`; renders emoji trash icon delete button
- `SpendingChart.jsx` — receives `transactions`; filters to expenses and aggregates by category inline; returns null when no data

**Transaction object shape:**
```js
{ id: number, description: string, amount: number, type: "income"|"expense", category: string, date: "YYYY-MM-DD" }
```
- IDs for seed data are sequential integers (1-8); new transactions use `Date.now()` as ID (collision risk noted)
- Amounts stored as numbers; `TransactionForm` uses `parseFloat` on submit
- Transaction #4 ("Freelance Work") is `type: "income"`, `category: "salary"` — fixed in round 2; do NOT flag

**Shared constants (extracted — FIXED in round 1):**
- `CATEGORIES` array is now defined once in `src/constants.js` and imported by both `TransactionForm` and `TransactionList`

**Known intentional data issue (resolved):**
- Transaction #4 ("Freelance Work") was `type: "expense"` but `category: "salary"` — fixed to `type: "income"` in round 2

**Round 2 fixes applied (confirmed in code):**
1. `formatCurrency` helper via `toLocaleString` — in use everywhere
2. `isNaN` / `<= 0` guard + `min="0.01" step="0.01"` on amount input
3. `CATEGORIES` extracted to `constants.js`
4. Functional state updates (`prev =>`) in `handleAdd` / `handleDelete`
5. Accessible labels: `<label htmlFor>` on all form inputs, `aria-label` on delete button, `.sr-only` class in `index.css`
6. Description blank validation with inline error message + `aria-invalid` / `aria-describedby`
7. Transaction #4 type corrected to "income"

**Remaining issues found in round 2 review (2026-04-14):**
- `formatCurrency` crashes on non-number input (no guard); `Summary` and `SpendingChart` pass computed numbers safely, but `TransactionList` passes `t.amount` directly — safe only as long as seed data and `parseFloat` guard hold
- `Date.now()` as ID has millisecond-collision risk when adding transactions rapidly
- `SpendingChart` tooltip/YAxis use raw `$${value}` string formatting instead of `formatCurrency` — inconsistent locale formatting
- `Cell key={index}` in SpendingChart uses array index, not a stable key
- `window.confirm` blocks the main thread and is not accessible (no keyboard trap, no ARIA, no focus return)
- Amount input has no silent failure feedback when value is invalid (guard returns silently)
- Filter dropdowns in `TransactionList` have no accessible labels
- Empty table state renders empty `<tbody>` with no message
- `balance-amount` color is always `--text-primary` regardless of sign (negative balance not visually indicated)
- `form` CSS selector is global — would affect any future form added to the app
- `COLORS` array in `SpendingChart` is hardcoded and shorter than CATEGORIES list — wraps via `%` which is fine, but undocumented

**CSS architecture:**
- `index.css` — CSS custom properties (design tokens), reset, global body styles, `sr-only` utility, fadeUp animation
- `App.css` — all component styles (layout, cards, table, form, delete button) in one file; `form` selector is global

**Why:** Second review pass after first round of fixes — establishing what was fixed and what remains.
**How to apply:** Use as reference for future reviews; focus on remaining issues listed above rather than re-checking fixed items.

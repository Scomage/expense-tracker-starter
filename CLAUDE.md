# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Node.js is at `C:\Program Files\nodejs\`. Always prefix commands with:
```bash
export PATH="/c/Program Files/nodejs:$PATH"
```

Then use the full path to npm:
```bash
"/c/Program Files/nodejs/npm.cmd" run dev
"/c/Program Files/nodejs/npm.cmd" install
"/c/Program Files/nodejs/npm.cmd" run build
"/c/Program Files/nodejs/npm.cmd" run lint
```

App runs at `http://localhost:5173`.

## Architecture

React app with no routing, no state management library, and no backend. Components:

- `App.jsx` — holds `transactions` state and wires components together
- `Summary.jsx` — receives `transactions`, computes and displays totals (income, expenses, balance)
- `TransactionForm.jsx` — owns its own form state; calls `onAdd(transaction)` prop on submit
- `TransactionList.jsx` — owns filter state; receives `transactions` and renders the filtered table

All amounts are stored as numbers. `TransactionForm` uses `parseFloat` when building the new transaction object.

**Known data issue (intentional for the course):**
- Transaction #4 ("Freelance Work") is typed as `"expense"` but categorized as `"salary"` — a data inconsistency.

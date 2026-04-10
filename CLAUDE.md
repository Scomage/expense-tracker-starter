# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Node.js is not on the system PATH. Use the Visual Studio-bundled node at:
`C:\Program Files\Microsoft Visual Studio\2022\Community\MSBuild\Microsoft\VisualStudio\NodeJs\`

Always prefix commands with:
```bash
export PATH="/c/Program Files/Microsoft Visual Studio/2022/Community/MSBuild/Microsoft/VisualStudio/NodeJs:$PATH"
```

Then use the full path to npm:
```bash
"/c/Program Files/Microsoft Visual Studio/2022/Community/MSBuild/Microsoft/VisualStudio/NodeJs/npm.cmd" run dev
"/c/Program Files/Microsoft Visual Studio/2022/Community/MSBuild/Microsoft/VisualStudio/NodeJs/npm.cmd" install
"/c/Program Files/Microsoft Visual Studio/2022/Community/MSBuild/Microsoft/VisualStudio/NodeJs/npm.cmd" run build
"/c/Program Files/Microsoft Visual Studio/2022/Community/MSBuild/Microsoft/VisualStudio/NodeJs/npm.cmd" run lint
```

App runs at `http://localhost:5173`.

## Architecture

This is a single-file React app — all logic lives in `src/App.jsx`. There are no components split into separate files, no routing, no state management library, and no backend.

**Known bugs in the starter code (intentional for the course):**
- `amount` is stored as a string in state; `reduce` does string concatenation instead of numeric addition, so Income/Expenses/Balance totals are wrong. Fix: `parseFloat(t.amount)` in the reduce calls.
- Transaction #4 ("Freelance Work") is typed as `"expense"` but categorized as `"salary"` — a data inconsistency.

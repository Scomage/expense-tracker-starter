Run the full deployment pipeline for this project:

1. **Run tests** — execute the test suite and stop if any tests fail. Report which tests failed.
2. **Build the production bundle** — run `npm run build`. Stop and report if the build fails.
3. **Push to staging** — push the current branch to the `staging` remote (or origin's `staging` branch if no dedicated staging remote exists).

After each step, report its result before moving on. If any step fails, stop immediately and do not proceed to the next step.

Use the npm path from CLAUDE.md:
```
export PATH="/c/Program Files/nodejs:$PATH"
"/c/Program Files/nodejs/npm.cmd" ...
```

export const INCOME_CATEGORIES = ["salary", "freelance", "other"];
export const EXPENSE_CATEGORIES = ["food", "housing", "utilities", "transport", "entertainment", "other"];

// Union preserves insertion order; INCOME_CATEGORIES listed first.
// "other" appears once because Set deduplicates by value.
export const CATEGORIES = [...new Set([...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES])];
